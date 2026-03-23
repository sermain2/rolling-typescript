import styles from "./NotFoundPage.module.scss";
import NotFoundImage from "assets/images/404.webp";

function NotFoundPage() {
  return (
    <section className={styles["not-found"]}>
      <img src={NotFoundImage} alt="404 페이지 오류" />
      <p className="font-20-20-18">잘못된 주소로 접근하셨습니다.</p>
    </section>
  );
}

export default NotFoundPage;
