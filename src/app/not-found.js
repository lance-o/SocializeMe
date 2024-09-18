import Link from "next/link";
import styles from "./NotFound.module.css"; // Create a CSS module for styles

export default function DefaultNotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Oops! This page doesn&#39;t exist.</p>
      <p className={styles.funMessage}>Time to get good, scrub!</p>
      <div className={styles.animationContainer}>
        <div className={styles.animatedGhost}>👻</div>
      </div>
      <Link href="/" className={styles.homeButton}>
        Go back to safety
      </Link>
    </div>
  );
}
