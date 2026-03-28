import Head from "next/head";
import Link from "next/link";
import { Archivo_Black, Manrope } from "next/font/google";
import styles from "@/styles/Home.module.css";

const headingFont = Archivo_Black({
  weight: "400",
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const stats = [
  { value: "10 min", label: "Average time to post a shift" },
  { value: "24/7", label: "Live notifications for new gigs" },
  { value: "2-sided", label: "Built for both posters and seekers" },
];

const posterPoints = [
  "Post one event and hire by role, quantity, and pay in minutes.",
  "Review applicants quickly and message workers in-app.",
  "Keep all staffing details organized by gig and date.",
];

const seekerPoints = [
  "Get notified when a new gig matches your city.",
  "Apply fast with your profile and chat directly with posters.",
  "Track accepted work in one place and stay on schedule.",
];

const steps = [
  {
    title: "Post or Browse",
    description:
      "Posters publish upcoming events. Seekers browse active gigs filtered by city and time.",
  },
  {
    title: "Match and Chat",
    description:
      "Applicants connect with posters through private and group chats to lock details fast.",
  },
  {
    title: "Fill the Team",
    description:
      "Build your full crew with real-time updates and push alerts even when users are out of app.",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Gigs | Event Staffing That Moves Fast</title>
        <meta
          name="description"
          content="Gigs helps posters and workers fill event shifts fast with instant notifications and in-app chat."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.page} ${headingFont.variable} ${bodyFont.variable}`}>
        <header className={styles.navbar}>
          <div className={styles.brand}>Gigs</div>
          <nav className={styles.navlinks}>
            <a href="#poster">For Posters</a>
            <a href="#seeker">For Seekers</a>
            <a href="#how-it-works">How It Works</a>
            <Link href="/privacy-policy">Privacy</Link>
          </nav>
        </header>

        <main className={styles.main}>
          <section className={styles.hero}>
            <p className={styles.kicker}>EVENT STAFFING, REBUILT FOR SPEED</p>
            <h1>Fill event shifts before your competitors even start calling.</h1>
            <p className={styles.heroText}>
              Gigs connects venues, event teams, and workers in real time. Post
              openings, send alerts instantly, and hire confidently from one platform.
            </p>
            <div className={styles.ctas}>
              <a className={styles.primary} href="mailto:joeapter@icloud.com">
                Book a Demo
              </a>
              <Link className={styles.secondary} href="/poster/1">
                View Sample Profile
              </Link>
            </div>
            <div className={styles.badges}>
              <span>Push Alerts</span>
              <span>In-App Chat</span>
              <span>Role-Based Hiring</span>
            </div>
          </section>

          <section className={styles.stats} aria-label="Key metrics">
            {stats.map((item) => (
              <article key={item.label} className={styles.statCard}>
                <h2>{item.value}</h2>
                <p>{item.label}</p>
              </article>
            ))}
          </section>

          <section className={styles.audienceGrid}>
            <article className={styles.audienceCard} id="poster">
              <p className={styles.cardLabel}>For Posters</p>
              <h3>Staff your events without the chaos.</h3>
              <ul>
                {posterPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>

            <article className={styles.audienceCard} id="seeker">
              <p className={styles.cardLabel}>For Seekers</p>
              <h3>Find better gigs and respond first.</h3>
              <ul>
                {seekerPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className={styles.process} id="how-it-works">
            <h2>How Gigs Works</h2>
            <div className={styles.steps}>
              {steps.map((step, idx) => (
                <article key={step.title} className={styles.stepCard}>
                  <p className={styles.stepNumber}>0{idx + 1}</p>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.banner}>
            <p>
              "We posted a last-minute event and had qualified applicants within the
              hour. Gigs made staffing simple."
            </p>
          </section>

          <section className={styles.finalCta}>
            <h2>Ready to move faster on your next event?</h2>
            <p>
              Launch with Gigs and keep your team fully staffed without endless calls
              and spreadsheets.
            </p>
            <div className={styles.ctas}>
              <a className={styles.primary} href="mailto:joeapter@icloud.com">
                Contact Sales
              </a>
              <Link className={styles.secondary} href="/privacy-policy">
                Read Privacy Policy
              </Link>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Gigs. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <a href="mailto:joeapter@icloud.com">joeapter@icloud.com</a>
          </div>
        </footer>
      </div>
    </>
  );
}
