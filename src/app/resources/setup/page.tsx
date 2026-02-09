import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    title: "Go to scratch.mit.edu and click Join",
    description:
      "Start from the homepage and use the Join button in the top navigation.",
    image: "/images/session-01/01-join.svg",
    alt: "Scratch homepage with the Join button highlighted in the top bar.",
  },
  {
    title: "Choose a username",
    description:
      "Do NOT use real names. Pick a school-safe handle like dg-rocket-### (no personal info).",
    image: "/images/session-01/02-username.svg",
    alt: "Username dialog with a sample handle like dg-rocket-17 entered and the Next button enabled.",
  },
  {
    title: "Set a strong password",
    description:
      "Follow the program pattern (e.g., DG!wordword) and confirm the password.",
    image: "/images/session-01/03-password.svg",
    alt: "Password dialog showing both password fields filled and checkmarks for strength.",
  },
  {
    title: "Enter EMSB email",
    description:
      "Type the EMSB address carefully; this is required to verify the account.",
    image: "/images/session-01/04-email.svg",
    alt: "Email dialog with an EMSB email typed into the field.",
  },
  {
    title: "Birthday and country",
    description:
      "Select the correct month/day/year and country, then continue. Skip the newsletter.",
    image: "/images/session-01/05-birthday.svg",
    alt: "Dropdowns for birth date and country filled in on the signup screen.",
  },
  {
    title: "Verify the email",
    description:
      "Open the EMSB inbox, find the Scratch verification email, and click Confirm.",
    image: "/images/session-01/06-verify-email.svg",
    alt: "Email message open with a Confirm my email address button visible.",
  },
  {
    title: "Confirm you are signed in",
    description:
      "You should see the username in the top bar. Sign out and back in to confirm it works.",
    image: "/images/session-01/07-signed-in.svg",
    alt: "Scratch homepage showing the signed-in username in the top-right corner.",
  },
  {
    title: "Create a new project",
    description:
      "Click Create to open the editor. Point out the green flag and stop buttons.",
    image: "/images/session-01/08-create.svg",
    alt: "Scratch editor open with the green flag and stop buttons highlighted.",
  },
  {
    title: "Add a sprite",
    description:
      "Open the sprite library and choose any sprite to add to the stage.",
    image: "/images/session-01/09-add-sprite.svg",
    alt: "Sprite library open with one sprite selected to add.",
  },
  {
    title: "Add a backdrop",
    description:
      "Pick a backdrop from the library to set the scene for the first animation.",
    image: "/images/session-01/10-add-backdrop.svg",
    alt: "Backdrop library open with a backdrop highlighted for selection.",
  },
  {
    title: "Build the starter stack",
    description:
      "When green flag clicked → say “Hello DG!” → switch costume → move → wait → move back → play a sound.",
    image: "/images/session-01/11-code-stack.svg",
    alt: "Code area with a stack of blocks for the Hello DG animation.",
  },
  {
    title: "Add a key-press effect",
    description:
      "When space key pressed → change color effect by 25 (or trigger another simple behavior).",
    image: "/images/session-01/12-key-press.svg",
    alt: "Key press event blocks with a color-change effect stacked underneath.",
  },
  {
    title: "Save and rename the project",
    description:
      "Rename to “Hello DG” and use File → Save now. Make sure it appears in your profile.",
    image: "/images/session-01/13-save.svg",
    alt: "Project title renamed to Hello DG with Save now menu highlighted.",
  },
];

export const metadata = {
  title: "Scratch Setup Walkthrough · DG-STEAM",
};

export default function ScratchSetupPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <span className="tag">Session 01</span>
        <h1 className="font-display text-4xl font-black text-[var(--ink)]">
          Scratch Setup Walkthrough
        </h1>
        <p className="max-w-3xl text-lg font-semibold text-[var(--ink)]">
          Step-by-step visuals for our Session 1 goal: every student creates a
          Scratch account with an EMSB email, signs in, and ships a first
          animation.
        </p>
        <div className="rounded-lg border-2 border-[var(--ink)] bg-white p-4">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[var(--ink)]">
            Text instructions (handout highlights)
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm font-semibold text-[var(--ink)]">
            <li>
              Go to <a className="text-[var(--scratch-blue)] underline" href="https://emsb.qc.ca/" target="_blank">emsb.qc.ca</a> →
              click <strong>ePortal</strong> → enter your EMSB email + password →
              once inside, click <strong>My WebMail</strong> to confirm you can open email.
            </li>
            <li>
              Open a new tab: <strong>scratch.mit.edu</strong> → Join.
              Choose a username without your real name (e.g., <code>dg-rocket-17</code>);
              set the program password pattern; enter your EMSB email (ending in <code>@edu.emsb.qc.ca</code>);
              set birthdate/country; skip newsletter.
            </li>
            <li>
              Check your EMSB WebMail for the Scratch email → click
              <strong> Confirm my email</strong>. Sign out/in to verify it works.
            </li>
            <li>
              Write your Scratch username + password in your notebook (do not share outside your team).
            </li>
            <li>
              Log out of EMSB webmail when done. Next team member repeats the same flow.
            </li>
          </ol>
        </div>
        <p className="text-sm font-semibold text-[var(--ink)]">
          Tip: Teachers, keep the checklist printable handy and station a helper
          at the “account bar” to work through verification issues.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/worksheets/scratch-setup-checklist" className="btn btn-primary">
            Open checklist
          </Link>
          <Link href="/sessions/session-01" className="btn btn-secondary">
            Back to Session 01
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <article key={step.title} className="panel overflow-hidden">
            <div className="flex flex-col gap-4 p-6 md:flex-row md:items-start">
              <div className="flex-1">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[var(--ink)]">
                  Step {index + 1}
                </p>
                <h2 className="text-xl font-black text-[var(--ink)]">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm font-semibold text-[var(--ink)]">
                  {step.description}
                </p>
              </div>
              <div className="relative w-full max-w-[420px] shrink-0 overflow-hidden rounded-lg border-2 border-[var(--ink)] bg-white">
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={1200}
                  height={675}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
