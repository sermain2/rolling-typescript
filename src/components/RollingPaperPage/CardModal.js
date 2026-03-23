import Modal from "react-modal";
import { formatDateWithDot } from "utils/rollingPaperPage";
import { FONT_CLASS_NAME } from "constants/rollingPaperPage";
import SenderInfo from "./SenderInfo";
import styles from "./CardModal.module.scss";
import DOMPurify from "dompurify";

export default function CardModal({ isOpen, message, onModalClose }) {
  const { content, createdAt, profileImageURL, relationship, sender, font } =
    message;

  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      width: "100%",
      position: "fixed",
      top: "0",
      left: "0",
      zIndex: "10",
    },
    content: {
      height: "476px",
      width: "600px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "16px",
      padding: "40px",
    },
  };
  if (window.matchMedia("(max-width: 768px)").matches) {
    modalStyle.content.width = "320px";
    modalStyle.content.height = "230px";
    modalStyle.content.padding = "30px";
  }

  return (
    <Modal isOpen={isOpen} style={modalStyle} onRequestClose={onModalClose}>
      <header className={styles["profile-container"]}>
        <SenderInfo
          profileImageURL={profileImageURL}
          relationship={relationship}
          sender={sender}
        />
        <p className={`${styles.createdAt} font-14-14-14`}>
          {formatDateWithDot(createdAt)}
        </p>
      </header>
      <main className={styles["content-wrapper"]}>
        <p
          className={`${styles.content} font-18-18-18 ${FONT_CLASS_NAME[font]}`}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        ></p>
      </main>
      <footer className={styles["button-wrapper"]}>
        <button
          onClick={onModalClose}
          className={`${styles["close-button"]} button width-120 font-16-16-16`}
        >
          확인
        </button>
      </footer>
    </Modal>
  );
}
