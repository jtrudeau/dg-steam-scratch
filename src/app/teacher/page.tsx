import Link from "next/link";
import { Suspense } from "react";
import {
  getGlobals,
  getSessions,
  getTeacherNotes,
  getWorksheets,
} from "@/lib/content";
import { TeacherGate } from "@/components/TeacherGate";

export const metadata = {
  title: "Teacher Hub · DG-STEAM Scratch",
};

export default function TeacherPage() {
  const globals = getGlobals();
  const sessions = getSessions();
  const worksheets = getWorksheets();
  const teacherNotes = getTeacherNotes();

  return (
    <Suspense fallback={<div className="p-8 text-center font-bold">Loading...</div>}>
      <TeacherGate>
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="tag">Facilitation toolkit</span>
          <h1 className="mt-4 font-display text-4xl font-black text-[var(--ink)]">
            Teacher Hub
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-semibold text-[var(--ink)]">
            Everything you need to steer 11 teams through idea → prototype →
            showcase: agendas, troubleshooting cues, worksheets, and weekly
            updates.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="panel p-6">
              <p className="text-xs font-black uppercase tracking-[0.25em]">
                Program
              </p>
              <p className="mt-2 text-2xl font-black text-[var(--ink)]">
                {globals?.programName}
              </p>
              <p className="text-sm font-semibold">{globals?.schoolYear}</p>
            </div>
            <div className="panel p-6">
              <p className="text-xs font-black uppercase tracking-[0.25em]">
                Sessions
              </p>
              <p className="mt-2 text-2xl font-black text-[var(--ink)]">
                {sessions.length}
              </p>
            </div>
            <div className="panel p-6">
              <p className="text-xs font-black uppercase tracking-[0.25em]">
                Worksheets
              </p>
              <p className="mt-2 text-2xl font-black text-[var(--ink)]">
                {worksheets.length}
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <section className="panel p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-[var(--ink)]">
                    Teacher Notes
                  </h2>
                  <p className="text-sm font-semibold text-[var(--ink)]">
                    Agendas, timing, misconceptions, assessments.
                  </p>
                </div>
                <Link href="/sessions" className="btn btn-secondary">
                  Browse sessions
                </Link>
              </div>
              <ul className="mt-6 space-y-3 text-sm font-semibold text-[var(--ink)]">
                {teacherNotes.map((note) => (
                  <li
                    key={note.id}
                    className="border-2 border-[var(--ink)] px-3 py-2"
                  >
                    <div>
                      <p className="font-black">{note.title}</p>
                      <p className="text-xs font-black uppercase tracking-[0.2em]">
                        {note.sessionRefs.join(", ")}
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-xs">
                        {note.agenda.map((item) => (
                          <li key={`${note.id}-${item.block}`}>
                            <span className="font-black">{item.block}</span>{" "}
                            ({item.duration}) — {item.notes}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <section className="panel p-6">
              <h2 className="text-xl font-black text-[var(--ink)]">
                Worksheets & Checklists
              </h2>
              <p className="text-sm font-semibold text-[var(--ink)]">
                Printable + interactive templates for planning, coding, playtesting.
              </p>
              <ul className="mt-6 space-y-3 text-sm font-semibold text-[var(--ink)]">
                {worksheets.map((sheet) => (
                  <li
                    key={sheet.id}
                    className="flex items-center justify-between border-2 border-[var(--ink)] px-3 py-2"
                  >
                    <div>
                      <p className="font-black">{sheet.title}</p>
                      <p className="text-xs font-black uppercase tracking-[0.2em]">
                        {sheet.sessionRefs.join(", ")}
                      </p>
                    </div>
                    <span className="border-2 border-[var(--ink)] bg-[var(--scratch-green)] px-2 py-1 text-xs font-black uppercase tracking-[0.2em]">
                      {sheet.audience}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>
      </TeacherGate>
    </Suspense>
  );
}
