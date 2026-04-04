import { Link } from "react-router-dom";
import styles from "./LinkButton.module.scss";

export default function LinkButton({ text, url }) {
  return (
    <Link to={url} className={`${styles.button} font-18`}>
      {text}
    </Link>
  );
}