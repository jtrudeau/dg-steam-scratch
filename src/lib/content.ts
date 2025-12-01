import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  Resource,
  Session,
  TeamInfo,
  TeacherNote,
  Worksheet,
} from "@/types/content";

const contentRoot = path.join(
  process.cwd(),
  "content",
  "dg-steam-scratch",
);

function readMarkdownContent<T>(subDir: string): T[] {
  const dirPath = path.join(contentRoot, subDir);
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      return data as T;
    });
}

export const getSessions = (): Session[] => {
  return readMarkdownContent<Session>("sessions").sort(
    (a, b) => a.meetingNumber - b.meetingNumber,
  );
};

export const getSessionById = (id: string): Session | undefined =>
  getSessions().find((session) => session.id === id);

export const getWorksheets = (): Worksheet[] => {
  return readMarkdownContent<Worksheet>("worksheets");
};

export const getResources = (): Resource[] => {
  return readMarkdownContent<Resource>("resources");
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

