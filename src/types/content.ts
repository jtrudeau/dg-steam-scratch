export type SessionFlow = {
  title: string;
  duration?: string;
  description: string;
};

export type Session = {
  id: string;
  title: string;
  phase: string;
  meetingNumber: number;
  studentObjective: string;
  teacherGoal: string;
  scratchFocus: string[];
  artifacts: string[];
  flow: SessionFlow[];
  teacherMoves: string[];
  delivery?: {
    worksheets?: string[];
    resources?: string[];
  };
};

export type ResourceStep = {
  title: string;
  description: string;
};

export type Resource = {
  id: string;
  title: string;
  type: string;
  length: string;
  scratchTags: string[];
  relatedSessions: string[];
  summary: string;
  steps: ResourceStep[];
};

export type ScratchModule = Resource & {
  section: string;
  order: number;
  level?: string;
};

export type ScratchTutorial = {
  id: string;
  title: string;
  projectId: number;
  provider: "scratch";
  authorSummary: string;
  estMinutes?: number;
  tags: string[];
  difficulty?: "basic" | "intermediate";
};

export type ScratchTrainingPlaylist = {
  id: string;
  title: string;
  description: string;
  moduleIds: string[];
  tutorialIds: string[];
};

export type ScratchTrainingCatalog = {
  tutorials: ScratchTutorial[];
  playlists: ScratchTrainingPlaylist[];
};

export type WorksheetBlock =
  | { type: "section"; title: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; title?: string; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export type Worksheet = {
  id: string;
  title: string;
  audience: "student" | "teacher";
  format: string;
  sessionRefs: string[];
  outputs: string[];
  blocks: WorksheetBlock[];
};

export type TeacherNote = {
  id: string;
  title: string;
  audience: "teacher";
  sessionRefs: string[];
  agenda: { block: string; duration: string; notes: string }[];
  misconceptions: string[];
  assessments: string[];
};

export type TeamInfo = {
  teamId: string;
  name: string;
  code?: string;
  scratchStudio: string;
  notes?: string;
};
