import Link from "next/link";
import "./NotFound.css";

export default function DefaultNotFound() {
  return (
    <div className="notFoundContainer">
      <h1 className="title">404</h1>
      <p className="message">Oops! This page doesn&#39;t exist.</p>
      <p className="funMessage">Time to get good, scrub!</p>
      <div className="animationContainer">
        <div className="animatedGhost">👻</div>
      </div>
      <Link href="/" className="homeButton">
        Go back to safety
      </Link>
    </div>
  );
}
