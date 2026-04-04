import styles from "./CountMessage.module.scss";

interface MessageProfile {
  id: number;
  imgURL: string;
}

interface CountMessageProps {
  messageProfiles: MessageProfile[];
  messageCount: number;
  page: string;
}

function CountMessage({ messageProfiles, messageCount, page }: CountMessageProps) {
  return (
    <div className={styles[page]}>
      <ol className={styles.profiles}>
        {messageProfiles &&
          messageProfiles.map((profile) => (
            <li key={profile.id} className={styles.profile}>
              <img src={profile.imgURL} alt="프로필 이미지" />
            </li>
          ))}
        {messageCount > 3 && (
          <div className={`${styles["extra-profile"]} font-12-12-12`}>
            {" "}
            +{messageCount - 3}
          </div>
        )}
      </ol>
      <div className={`${styles["message-count"]} font-16-16-14`}>
        {messageCount ? (
          <>
            <span className={styles.bold}>{messageCount}</span>명이 작성했어요!
          </>
        ) : (
          <>첫 메세지를 남겨보세요!</>
        )}
      </div>
    </div>
  );
}

export default CountMessage;