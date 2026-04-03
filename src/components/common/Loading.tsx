import spinner from "assets/images/spinner.gif";
import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.container}>
      <img className={styles.spinner} src={spinner} alt="로딩 이미지" />
    </div>
  );
}
