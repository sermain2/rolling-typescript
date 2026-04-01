import React, { useEffect, useState } from "react";
import { getList } from "apis/recipients";
import Carousel from "../components/ListPage/Carousel";
import "./ListPage.module.scss";
import styles from "./ListPage.module.scss";
import "styles/global.css";
import "styles/button.scss";
import CardList from "components/ListPage/CardList";
import { Link } from "react-router-dom";

function ListPage() {
  const [bestItems, setBestItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let responseRecent;
      let responseAll;
      try {
        setIsLoading(true);
        responseRecent = await getList();
        const count = responseRecent?.count;
        responseAll =
          count <= 12
            ? responseRecent
            : await getList(0, responseRecent?.count);
      } catch (error) {
        console.error("Error fetching slide items:", error);
      }

      const sortedBest = responseAll.results
        .slice()
        .sort((a, b) => b.messageCount - a.messageCount);
      const sortedRecent = responseRecent.results
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBestItems(sortedBest);
      setRecentItems(sortedRecent);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <div className={styles.top}>
          <h1 className={`font-28-bold ${styles["title"]}`}>
            인기 롤링 페이퍼🔥
          </h1>
          <Link
            to="/allpost"
            className={`button width-92 font-16-16-16 ${styles["all-post-button"]}`}
          >
            전체 보기
          </Link>
        </div>
        <div className={styles.carousel}>
          <Carousel slideItems={bestItems} isLoading={isLoading} />
        </div>
        <div className={styles.empty}></div>
        <div className={`${styles["vertical-scroll"]} ${styles["item-1"]}`}>
          {bestItems?.map((item) => (
            <CardList key={item.id} slideItems={item} />
          ))}
        </div>
        <h1 className={`font-28-bold ${styles["title"]}`}>
          최근에 만든 롤링 페이퍼⭐
        </h1>
        <div className={styles.carousel}>
          <Carousel slideItems={recentItems} isLoading={isLoading} />
        </div>
        <div className={styles.empty}></div>
        <div className={`${styles["vertical-scroll"]} ${styles["item-2"]}`}>
          {recentItems?.map((item) => (
            <CardList key={item.id} slideItems={item} />
          ))}
        </div>
      </div>
      <div className={`styles.["btn-box"]`}>
        <Link
          to="/post"
          className={`button width-280 align-center font-18 ${styles["list-button"]}`}
        >
          나도 만들어 보기
        </Link>
      </div>
    </div>
  );
}

export default ListPage;
