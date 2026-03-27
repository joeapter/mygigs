import Head from "next/head";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Gigs</title>
        <meta
          name="description"
          content="Gigs helps venues and workers connect for local shifts and events."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <div className={styles.intro}>
            <h1>Gigs</h1>
            <p>
              Find and post local event gigs. Built for workers, venues, and teams
              that need reliable staffing fast.
            </p>
          </div>
          <div className={styles.ctas}>
            <Link className={styles.primary} href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className={styles.secondary} href="/poster/1">
              View Sample Profile
            </Link>
          </div>
          <footer className={styles.footer}>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </footer>
        </main>
      </div>
    </>
  );
}
