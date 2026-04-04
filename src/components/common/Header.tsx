import logo from "assets/icons/logo.svg";
import styles from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Header() {
  const location = useLocation();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const handleResize = () => {
      if (isMobile && location.pathname.startsWith("/post/") && !location.pathname.includes("message")) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile, location.pathname]);

  return (
    <header
      className={`${styles.header} ${
        isHeaderVisible ? styles.visible : styles.hidden
      }`}
    >
      <div className={styles["logo-button-container"]}>
        <Link to="/" className={styles["logo-container"]}>
          <img src={logo} className={styles.logo} alt="로고" />
          <h1 className={styles["logo-text"]}>Ro1ling</h1>
        </Link>
        {!location.pathname.startsWith("/post") && (
          <Link to="/post" className={`${styles["post-button"]} font-16-16-16`}>
            롤링 페이퍼 만들기
          </Link>
        )}
      </div>
    </header>
  );
}
