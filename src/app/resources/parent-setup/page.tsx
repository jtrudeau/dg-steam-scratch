import Link from "next/link";

const basePath = process.env.BASE_PATH ?? "/dg-steam-scratch";

export const metadata = {
  title: "Parent Guide: Scratch Account Setup · DG-STEAM",
};

export default function ParentSetupPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-3">
        <span className="tag">Parent / Guardian Guide</span>
        <h1 className="font-display text-4xl font-black text-[var(--ink)]">
          Setting Up Your Child&apos;s Scratch Account
        </h1>
        <p className="max-w-3xl text-lg font-semibold text-[var(--ink)]">
          Because your child is under 16, Scratch requires a parent or guardian
          to confirm their account by email. This guide walks you through the
          full process using your child&apos;s EMSB school email.
        </p>
      </div>

      {/* What you need */}
      <div className="mb-10 rounded-lg border-2 border-[var(--ink)] bg-white p-6">
        <h2 className="mb-3 font-display text-xl font-black text-[var(--ink)]">
          What You Need
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm font-semibold text-[var(--ink)]">
          <li>Your child&apos;s EMSB email address (e.g. <code>firstname.lastname@emsb.qc.ca</code>)</li>
          <li>Your child&apos;s EMSB password (used to log into ePortal)</li>
          <li>A computer with internet access</li>
          <li>About 10 minutes</li>
        </ul>
      </div>

      {/* Part A */}
      <div className="mb-10">
        <h2 className="mb-6 font-display text-2xl font-black text-[var(--ink)]">
          Part A — Create the Scratch Account
        </h2>

        <ol className="space-y-6">
          <Step
            n={1}
            title="Go to scratch.mit.edu"
            image="/images/parent-setup/01-scratch-join.png"
            alt="Scratch homepage with the Join button highlighted"
          >
            Open{" "}
            <a
              href="https://scratch.mit.edu"
              target="_blank"
              className="text-[var(--scratch-blue)] underline"
            >
              scratch.mit.edu
            </a>{" "}
            in your browser and click the <strong>Join Scratch</strong> button in
            the top-right corner.
          </Step>

          <Step
            n={2}
            title="Choose a username and password"
            image="/images/parent-setup/02-username.png"
            alt="Scratch username and password dialogs"
          >
            <strong>Do not use your child&apos;s real name.</strong> Pick a
            school-safe username such as <code>dg-rocket-17</code> or{" "}
            <code>dg-star-42</code>. Then choose a
            password your child can remember. Type it twice to confirm and click{" "}
            <strong>Next</strong>.
          </Step>

          <Step
            n={3}
            title="Select country and birthday"
            image="/images/parent-setup/04-birthday.png"
            alt="Scratch birthday and country selection"
          >
            Select <strong>Canada</strong> and your child&apos;s birth month and
            year. Click <strong>Next</strong>. You can skip the newsletter.
          </Step>

          <Step
            n={4}
            title="Enter your child's EMSB email"
            image="/images/parent-setup/05-email.png"
            alt="Scratch email dialog with EMSB email entered"
          >
            Type your child&apos;s full EMSB email address (e.g.{" "}
            <code>firstname.lastname@emsb.qc.ca</code>). This is where Scratch
            will send the confirmation email. Click <strong>Create Your Account</strong>.
          </Step>

          <Step
            n={5}
            title="Record the account information"
            image={null}
            alt=""
          >
            <strong>Write down the username and password somewhere secure</strong>{" "}
            (notebook, password manager, or a note kept at home). Your child will
            need these every time they log in to Scratch at school.
          </Step>
        </ol>
      </div>

      {/* Part B */}
      <div className="mb-10">
        <h2 className="mb-6 font-display text-2xl font-black text-[var(--ink)]">
          Part B — Confirm the Account via EMSB Email
        </h2>
        <p className="mb-6 text-sm font-semibold text-[var(--ink)]">
          Scratch sends a confirmation email to the address you entered. For
          under-16 accounts, a parent or guardian must click the link in that
          email. Since the email goes to the EMSB address, you&apos;ll access it
          through the EMSB ePortal.
        </p>

        <ol className="space-y-6" start={6}>
          <Step
            n={6}
            title="Go to emsb.qc.ca"
            image="/images/parent-setup/07-emsb-homepage.png"
            alt="EMSB homepage showing ePortal link in the top navigation"
          >
            Open{" "}
            <a
              href="https://emsb.qc.ca"
              target="_blank"
              className="text-[var(--scratch-blue)] underline"
            >
              emsb.qc.ca
            </a>{" "}
            and click <strong>ePortal</strong> in the top-right area of the page.
          </Step>

          <Step
            n={7}
            title="Sign in to ePortal"
            image="/images/parent-setup/08-eportal-signin.png"
            alt="ePortal sign-in screen"
          >
            Enter your child&apos;s <strong>EMSB email address</strong> and{" "}
            <strong>EMSB password</strong>, then sign in.
          </Step>

          <Step
            n={8}
            title="Open My WebMail"
            image="/images/parent-setup/09-my-webmail.png"
            alt="ePortal dashboard showing the My WebMail button"
          >
            Once logged in, find and click the <strong>My WebMail</strong> button
            (Outlook icon). This opens the school email inbox.
          </Step>

          <Step
            n={9}
            title="Find the Scratch confirmation email"
            image="/images/parent-setup/10-scratch-email.png"
            alt="Scratch confirmation email in the inbox"
          >
            Look for an email from <strong>Scratch</strong> with a subject like
            &quot;Confirm your email&quot; or &quot;Please verify your email address.&quot;
            <br />
            <br />
            <strong>Check the Junk / Spam folder</strong> if you don&apos;t see
            it in the inbox — it often ends up there.
          </Step>

          <Step
            n={10}
            title="Click the confirmation link"
            image="/images/parent-setup/11-confirm-link.png"
            alt="Scratch email with the confirm button highlighted"
          >
            Open the email and click the <strong>Confirm my email address</strong>{" "}
            button or link. This completes the account setup.
          </Step>
        </ol>

        {/* Expiry warning */}
        <div className="mt-6 rounded-lg border-2 border-[var(--scratch-orange)] bg-[#fff8f0] p-5">
          <p className="text-sm font-bold text-[var(--ink)]">
            Confirmation emails expire!
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--ink)]">
            If the link no longer works, don&apos;t worry. Just go to{" "}
            <a
              href="https://scratch.mit.edu/login"
              target="_blank"
              className="text-[var(--scratch-blue)] underline"
            >
              scratch.mit.edu
            </a>
            , sign in with the username and password you created, and Scratch
            will give you the option to <strong>resend the confirmation email</strong>.
            Then check EMSB WebMail again.
          </p>
        </div>
      </div>

      {/* Done */}
      <div className="mb-10 rounded-lg border-2 border-[var(--ink)] bg-white p-6">
        <h2 className="mb-3 font-display text-xl font-black text-[var(--ink)]">
          All Done!
        </h2>
        <p className="text-sm font-semibold text-[var(--ink)]">
          Your child&apos;s Scratch account is now fully set up and confirmed.
          They can sign in at{" "}
          <a
            href="https://scratch.mit.edu"
            target="_blank"
            className="text-[var(--scratch-blue)] underline"
          >
            scratch.mit.edu
          </a>{" "}
          using the username and password you recorded. Make sure they bring
          their login info to class!
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/resources/setup" className="btn btn-primary">
          Full Setup Walkthrough
        </Link>
        <Link href="/sessions/session-01" className="btn btn-secondary">
          Back to Session 01
        </Link>
      </div>
    </section>
  );
}

/* ── Step component ─────────────────────────────────────────────── */

function Step({
  n,
  title,
  image,
  alt,
  children,
}: {
  n: number;
  title: string;
  image: string | null;
  alt: string;
  children: React.ReactNode;
}) {
  return (
    <li className="panel overflow-hidden p-6">
      <p className="text-xs font-black uppercase tracking-[0.25em] text-[var(--ink)]">
        Step {n}
      </p>
      <h3 className="mt-1 text-lg font-black text-[var(--ink)]">{title}</h3>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--ink)]">
        {children}
      </p>
      {image && (
        <div className="mt-4 overflow-hidden rounded-lg border-2 border-[var(--ink)] bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${basePath}${image}`} alt={alt} className="h-auto w-full" />
        </div>
      )}
    </li>
  );
}
