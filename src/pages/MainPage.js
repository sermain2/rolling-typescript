import styles from "./MainPage.module.scss";
import rollingExample from "assets/images/rolling_example.webp";
import reactionExample from "assets/images/reaction_example.webp";
import { Link } from "react-router-dom";

function Section({
  imgSrc,
  point,
  title,
  rowReverse,
  controlMargin,
  controlFlex,
  description,
  imgMarginTop,
}) {
  return (
    <section className={`${styles.section}`}>
      <div
        className={`${styles["img-content-container"]} ${
          styles[rowReverse] ? styles[rowReverse] : ""
        } ${styles[controlFlex] ? styles[controlFlex] : ""}`}
      >
        {/* 여기 너비 주기 */}
        <div
          className={`${styles["content-container"]} ${
            styles[controlMargin] ? styles[controlMargin] : ""
          }`}
        >
          <div className={`${styles.emphasis} font-14-14-14-bold`}>{point}</div>
          <h2 className={`${styles.title} font-24-24-18-bold`}>{title}</h2>
          <p className={`${styles.description} font-18-18-15`}>{description}</p>
        </div>
        <img
          src={imgSrc}
          alt="롤링페이퍼 예시"
          className={`${styles.exampleImg} ${
            imgMarginTop ? styles["img-margin-top"] : ""
          }`}
        />
      </div>
    </section>
  );
}

export default function MainPage() {
  return (
    <main className={styles.main}>
      <Section
        imgSrc={rollingExample}
        point={"Point. 01"}
        title={`누구나 손쉽게, 온라인
           롤링 페이퍼를 만들 수 있어요`}
        controlMargin={"marginLeft"}
        description={"로그인 없이 자유롭게 만들어요."}
      />
      <Section
        imgSrc={reactionExample}
        point={"Point. 02"}
        title={`서로에게 이모지로 감정을
           표현해보세요`}
        rowReverse={"rowReverse"}
        controlFlex={"flexEnd"}
        description={"롤링 페이퍼에 이모지를 추가할 수 있어요."}
        imgMarginTop={"img-margin-top"}
      />
      <Link
        to="/list"
        className={`button width-280 align-center font-18 ${styles["list-button"]}`}
      >
        구경해보기
      </Link>
    </main>
  );
}
