import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { formatDateWithDot } from "utils/rollingPaperPage";
import { FONT_CLASS_NAME } from "constants/rollingPaperPage";
import CardModal from "./CardModal";
import SenderInfo from "./SenderInfo";
import PlusIcon from "assets/icons/plus_white.svg";
import styles from "./Card.module.scss";
import DOMPurify from "dompurify";

function Card({ message, isEdit, onCheck, isChecked }) {
  const {
    content,
    createdAt,
    profileImageURL,
    relationship,
    sender,
    font,
    id,
  } = message;
  const [isOpenModal, setIsOpenModal] = useState(false);

  // NOTE - 모달창 띄우는 함수
  const handleCardClick = useCallback(() => {
    // NOTE - /edit 에서는 클릭하지 못하도록 처리
    if (!isEdit) {
      setIsOpenModal(true);
    }
  }, [isEdit]);

  // NOTE - 모달창 닫는 함수
  const handleCloseClick = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  // NOTE -
  const handleCheckId = useCallback(
    (e) => {
      onCheck(e.target.id, e.target.checked);
    },
    [onCheck]
  );

  return (
    <>
      <article
        className={`${styles.card} ${isEdit ? styles.cursor : ""} ${
          isChecked ? styles["checked-card"] : ""
        }`}
        onClick={handleCardClick}
      >
        <header className={styles.header}>
          <SenderInfo
            profileImageURL={profileImageURL}
            relationship={relationship}
            sender={sender}
          />
          {/* // NOTE - checkbox */}
          {isEdit && (
            <div>
              <input
                id={id}
                className={styles.checkbox}
                type="checkbox"
                onChange={handleCheckId}
                checked={isChecked}
              />
              <label htmlFor={id} className={styles["checkbox-label"]}></label>
            </div>
          )}
        </header>
        <div className={styles.divider}></div>
        <main
          className={`font-18-18-15 ${FONT_CLASS_NAME[font]}`}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        ></main>
        <footer className="font-12-12-12">
          {formatDateWithDot(createdAt)}
        </footer>
      </article>
      {isOpenModal && (
        <CardModal
          message={message}
          isOpen={isOpenModal}
          onModalClose={handleCloseClick}
        />
      )}
    </>
  );
}

export function FirstCard() {
  return (
    <Link to="message">
      <div className={`${styles.card} ${styles["card-first"]}`}>
        <div className={styles["add-button"]}>
          <img src={PlusIcon} alt="메세지 추가" />
        </div>
      </div>
    </Link>
  );
}

export default Card;
