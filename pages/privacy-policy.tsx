import Head from "next/head";
import Link from "next/link";
import { Geist } from "next/font/google";
import styles from "@/styles/Legal.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Gigs</title>
        <meta
          name="description"
          content="Privacy Policy for the Gigs mobile application and website."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${styles.page} ${geistSans.variable}`}>
        <main className={styles.main}>
          <h1>Privacy Policy</h1>
          <p className={styles.meta}>Effective date: March 27, 2026</p>
          <p>
            This Privacy Policy explains how Gigs ("we", "our", or "us") collects,
            uses, and shares information when you use our mobile app and website.
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li>
              Account Information: name, email, phone number, and login details.
            </li>
            <li>
              Profile Information: role, city, country, profile photo, and work
              preferences.
            </li>
            <li>
              Gig and Application Data: gigs posted, applications submitted, chat
              messages, and related activity.
            </li>
            <li>
              Device Information: app version, operating system, and identifiers
              needed for app functionality.
            </li>
            <li>
              Notification Tokens: push notification tokens to send alerts about
              gig activity.
            </li>
            <li>
              Location Data: approximate or precise location only if you grant
              permission.
            </li>
          </ul>

          <h2>How We Use Information</h2>
          <ul>
            <li>Provide and operate the Gigs platform.</li>
            <li>Match workers and posters for available gigs.</li>
            <li>Send service notifications, including gig updates.</li>
            <li>Improve app performance, reliability, and safety.</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h2>How We Share Information</h2>
          <p>We may share information with:</p>
          <ul>
            <li>Other users, where needed for gig matching and communication.</li>
            <li>
              Service providers that help us operate the app (for example hosting,
              databases, analytics, and notifications).
            </li>
            <li>Authorities when required by law or to protect rights and safety.</li>
          </ul>
          <p>We do not sell your personal information.</p>

          <h2>Data Retention</h2>
          <p>
            We retain data for as long as needed to provide the service and meet
            legal, accounting, or security requirements.
          </p>

          <h2>Security</h2>
          <p>
            We use reasonable technical and organizational safeguards to protect
            personal information. No system can be guaranteed 100% secure.
          </p>

          <h2>Your Choices</h2>
          <ul>
            <li>You can update profile information in the app.</li>
            <li>You can disable push notifications in device settings.</li>
            <li>
              You can request deletion of your account and associated data by
              contacting us.
            </li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            Gigs is not intended for children under 13, and we do not knowingly
            collect personal information from children under 13.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will post the
            updated version on this page and revise the effective date.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy questions or requests, contact:{" "}
            <a href="mailto:joeapter@icloud.com">joeapter@icloud.com</a>
          </p>

          <p className={styles.backLink}>
            <Link href="/">Back to home</Link>
          </p>
        </main>
      </div>
    </>
  );
}
