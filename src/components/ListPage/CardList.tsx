import React from "react";
import { Link } from "react-router-dom";
import styles from "./CardList.module.scss";
import CountMessage from "components/common/CountMessage";
import Reactions from "components/common/Reactions";
import { LIST_PAGE } from "constants";

function CardList({ slideItems, page = LIST_PAGE }) {
  const {
    id,
    name,
    backgroundColor,
    backgroundImageURL,
    topReactions,
    messageCount,
    recentMessages,
  } = slideItems;

  const messageProfiles = recentMessages.map((message) => ({
    id: message.id,
    imgURL: message.profileImageURL,
  }));
  const cardStyle = {
    backgroundColor: `var(--rolling-bg-${backgroundColor})`,
    backgroundImage: `url(${backgroundImageURL})`,
  };

  const backgroundClass = backgroundImageURL
    ? "bg-url"
    : `bg-${backgroundColor}`;

  return (
    <div className={`${styles["CardList"]} ${styles[page]}`} style={cardStyle}>
      <div className={`${styles["bg-setting"]} ${styles[backgroundClass]}`}>
        <Link to={`/post/${id}`} className={styles["bg-setting"]}>
          <h3 className={`font-24-bold ${styles["name"]}`}>To. {name}</h3>
          <CountMessage
            messageProfiles={messageProfiles}
            messageCount={messageCount}
            page={[LIST_PAGE]}
          />
          <div className={styles.divider} />
          <Reactions reactions={topReactions} page={LIST_PAGE} />
        </Link>
      </div>
    </div>
  );
}

export default CardList;
