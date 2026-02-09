import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  Resource,
  ScratchTrainingCatalog,
  ScratchTrainingPlaylist,
  ScratchTutorial,
  ScratchModule,
  Session,
  TeamInfo,
  TeacherNote,
  Worksheet,
} from "@/types/content";

const contentRoot = path.join(
  process.cwd(),
  "content",
  process.env.CONTENT_PROJECT ?? "dg-steam-scratch"
);
const scratchTrainingCatalogPath = path.join(
  contentRoot,
  "scratch",
  "training-playlists.json",
);

type ParsedContent<T> = {
  id: string;
  ext: string;
  data: T;
  body: string;
};

const supportedExtensions = new Set([".md", ".mdx"]);

const normalizeId = (data: unknown, fallback: string) => {
  const typed = data as { id?: string };
  return typed?.id ?? fallback;
};

function readContentFiles<T>(subDir: string): ParsedContent<T>[] {
  const dirPath = path.join(contentRoot, subDir);
  if (!fs.existsSync(dirPath)) return [];

  const files = fs
    .readdirSync(dirPath)
    .filter((file) => supportedExtensions.has(path.extname(file)));

  const entries = files.map((file) => {
    const filePath = path.join(dirPath, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const ext = path.extname(file).toLowerCase();
    const fallbackId = path.basename(file, ext);
    const id = normalizeId(data, fallbackId);
    return {
      id,
      ext,
      data: data as T,
      body: content.trim(),
    };
  });

  const grouped = new Map<string, { md?: ParsedContent<T>; mdx?: ParsedContent<T> }>();
  entries.forEach((entry) => {
    const slot = grouped.get(entry.id) ?? {};
    if (entry.ext === ".mdx") {
      slot.mdx = entry;
    } else {
      slot.md = entry;
    }
    grouped.set(entry.id, slot);
  });

  return Array.from(grouped.values()).map((entry) => {
    const md = entry.md;
    const mdx = entry.mdx;
    const data = {
      ...(md?.data ?? {}),
      ...(mdx?.data ?? {}),
    } as T;
    const body = mdx?.body?.trim() ? mdx.body : md?.body ?? "";
    const id = mdx?.id ?? md?.id ?? "";
    const ext = mdx ? ".mdx" : md ? ".md" : "";
    return { id, ext, data, body };
  });
}

function readMarkdownContent<T>(subDir: string): T[] {
  return readContentFiles<T>(subDir).map((entry) => entry.data);
}

function readMarkdownContentWithBody<T>(subDir: string): Array<T & { body: string }> {
  return readContentFiles<T>(subDir).map((entry) => ({
    ...entry.data,
    body: entry.body,
  }));
}

export const getSessions = (): Session[] => {
  return readMarkdownContent<Session>("sessions").sort(
    (a, b) => (a.meetingNumber ?? 0) - (b.meetingNumber ?? 0),
  );
};

export type SessionWithBody = Session & { body: string };

export const getSessionById = (id: string): SessionWithBody | undefined =>
  readMarkdownContentWithBody<Session>("sessions").find(
    (session) => session.id === id,
  );

export const getWorksheets = (): Worksheet[] => {
  return readMarkdownContent<Worksheet>("worksheets");
};

export const getResources = (): Resource[] => {
  return readMarkdownContent<Resource>("resources");
};

export type ResourceWithBody = Resource & { body: string };

export const getResourceById = (id: string): ResourceWithBody | undefined =>
  readMarkdownContentWithBody<Resource>("resources").find(
    (resource) => resource.id === id,
  );

export const getScratchModules = (): ScratchModule[] => {
  return readMarkdownContent<ScratchModule>("scratch").sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
};

export type ScratchModuleWithBody = ScratchModule & { body: string };

export const getScratchModuleById = (
  id: string,
): ScratchModuleWithBody | undefined =>
  readMarkdownContentWithBody<ScratchModule>("scratch").find(
    (module) => module.id === id,
  );

const isDifficulty = (
  difficulty: unknown,
): difficulty is ScratchTutorial["difficulty"] =>
  difficulty === "basic" || difficulty === "intermediate";

const toScratchTutorial = (value: unknown): ScratchTutorial | undefined => {
  if (!value || typeof value !== "object") return undefined;
  const candidate = value as Record<string, unknown>;
  if (
    typeof candidate.id !== "string" ||
    typeof candidate.title !== "string" ||
    typeof candidate.projectId !== "number" ||
    !Number.isFinite(candidate.projectId) ||
    candidate.provider !== "scratch" ||
    typeof candidate.authorSummary !== "string" ||
    !Array.isArray(candidate.tags) ||
    !candidate.tags.every((tag) => typeof tag === "string")
  ) {
    return undefined;
  }

  if (
    candidate.estMinutes !== undefined &&
    (typeof candidate.estMinutes !== "number" ||
      !Number.isFinite(candidate.estMinutes))
  ) {
    return undefined;
  }

  if (
    candidate.difficulty !== undefined &&
    !isDifficulty(candidate.difficulty)
  ) {
    return undefined;
  }

  return {
    id: candidate.id,
    title: candidate.title,
    projectId: candidate.projectId,
    provider: "scratch",
    authorSummary: candidate.authorSummary,
    estMinutes: candidate.estMinutes as number | undefined,
    tags: candidate.tags as string[],
    difficulty: candidate.difficulty as ScratchTutorial["difficulty"] | undefined,
  };
};

const toScratchTrainingPlaylist = (
  value: unknown,
): ScratchTrainingPlaylist | undefined => {
  if (!value || typeof value !== "object") return undefined;
  const candidate = value as Record<string, unknown>;
  if (
    typeof candidate.id !== "string" ||
    typeof candidate.title !== "string" ||
    typeof candidate.description !== "string" ||
    !Array.isArray(candidate.moduleIds) ||
    !candidate.moduleIds.every((id) => typeof id === "string") ||
    !Array.isArray(candidate.tutorialIds) ||
    !candidate.tutorialIds.every((id) => typeof id === "string")
  ) {
    return undefined;
  }

  return {
    id: candidate.id,
    title: candidate.title,
    description: candidate.description,
    moduleIds: candidate.moduleIds as string[],
    tutorialIds: candidate.tutorialIds as string[],
  };
};

export const getScratchTrainingCatalog = (): ScratchTrainingCatalog => {
  if (!fs.existsSync(scratchTrainingCatalogPath)) {
    return { tutorials: [], playlists: [] };
  }

  try {
    const raw = fs.readFileSync(scratchTrainingCatalogPath, "utf-8");
    const parsed = JSON.parse(raw) as {
      tutorials?: unknown[];
      playlists?: unknown[];
    };
    const tutorials = Array.isArray(parsed.tutorials)
      ? parsed.tutorials
          .map(toScratchTutorial)
          .filter((tutorial): tutorial is ScratchTutorial => Boolean(tutorial))
      : [];
    const playlists = Array.isArray(parsed.playlists)
      ? parsed.playlists
          .map(toScratchTrainingPlaylist)
          .filter(
            (playlist): playlist is ScratchTrainingPlaylist => Boolean(playlist),
          )
      : [];
    return { tutorials, playlists };
  } catch {
    return { tutorials: [], playlists: [] };
  }
};

export const getScratchTutorialsForModule = (
  moduleId: string,
): ScratchTutorial[] => {
  const catalog = getScratchTrainingCatalog();
  const tutorialById = new Map(
    catalog.tutorials.map((tutorial) => [tutorial.id, tutorial]),
  );
  const seen = new Set<string>();
  const tutorials: ScratchTutorial[] = [];

  catalog.playlists.forEach((playlist) => {
    if (!playlist.moduleIds.includes(moduleId)) return;
    playlist.tutorialIds.forEach((tutorialId) => {
      if (seen.has(tutorialId)) return;
      const tutorial = tutorialById.get(tutorialId);
      if (!tutorial) return;
      seen.add(tutorialId);
      tutorials.push(tutorial);
    });
  });

  return tutorials;
};

export const getTeacherNotes = (): TeacherNote[] => {
  return readMarkdownContent<TeacherNote>("teacher-notes");
};

export const getTeams = (): TeamInfo[] => {
  const filePath = path.join(contentRoot, "teams.json");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as TeamInfo[];
};

export const getTeamById = (teamId: string): TeamInfo | undefined => {
  return getTeams().find((team) => team.teamId === teamId);
};

export type ProgramGlobals = {
  programName: string;
  schoolYear: string;
  sdgFocus: string[];
  meetingCount: number;
  teamCount: number;
};

export const getGlobals = (): ProgramGlobals | undefined => {
  const filePath = path.join(contentRoot, "globals.json");
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as ProgramGlobals;
};
