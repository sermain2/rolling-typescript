import AddEmojiButton from "./AddReactionButton";
import CountMessage from "components/common/CountMessage";
import Reactions from "components/common/Reactions";
import ShareDropDown from "./ShareDropDown";
import { POST_PAGE, PC_MIN_WIDTH } from "constants";
import {
  PC_REACTION_NUM,
  NON_PC_REACTION_NUM,
} from "constants/rollingPaperPage";
import arrowDownIcon from "assets/icons/arrow_down.svg";
import styles from "./Nav.module.scss";

function Nav({
  postInfo,
  reactions,
  isReactionHidden,
  isPickerHidden,
  isDropDownHidden,
  reactionLoadingError,
  onMoreReactionClick,
  onEmojiClick,
  onEmojiButtonClick,
  onShareButtonClick,
  onKakaoClick,
  onURLClick,
}) {
  const { name, messageCount, messageProfiles } = postInfo;

  return (
    <nav className={styles.nav}>
      <div className={styles.contents}>
        <div className={`${styles.name} font-28-28-18-bold`}>To. {name}</div>
        <div className={styles["post-info"]}>
          <div className={styles["PC-only"]}>
            <CountMessage
              messageCount={messageCount}
              messageProfiles={messageProfiles}
              page={POST_PAGE}
            />
          </div>
          <div className={`${styles.divider} ${styles["PC-only"]}`}></div>
          <div className={styles.tools}>
            <Emojis
              reactions={reactions}
              loadingError={reactionLoadingError}
              isReactionHidden={isReactionHidden}
              onMoreReactionClick={onMoreReactionClick}
            />
            <Buttons
              name={name}
              isPickerHidden={isPickerHidden}
              isDropDownHidden={isDropDownHidden}
              onEmojiClick={onEmojiClick}
              onEmojiButtonClick={onEmojiButtonClick}
              onShareButtonClick={onShareButtonClick}
              onKakaoClick={onKakaoClick}
              onURLClick={onURLClick}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

function Emojis({
  reactions,
  loadingError,
  isReactionHidden,
  onMoreReactionClick,
}) {
  const topReactions = reactions.length > 3 ? reactions.slice(0, 3) : reactions;
  const NUM_REACTION_IN_ROW =
    window.innerWidth >= PC_MIN_WIDTH ? PC_REACTION_NUM : NON_PC_REACTION_NUM;

  return (
    <div className={`${styles.reactions} font-18-18-15`}>
      <Reactions reactions={topReactions} page={POST_PAGE} />
      <button
        type="button"
        className={styles["more-reaction-button"]}
        onClick={onMoreReactionClick}
      >
        <img src={arrowDownIcon} alt="반응 더보기" />
      </button>
      {!isReactionHidden && (
        <div className={styles["reaction-box"]}>
          {reactions.length <= NUM_REACTION_IN_ROW ? (
            <Reactions reactions={reactions} page={POST_PAGE} />
          ) : (
            <>
              <Reactions
                reactions={reactions.slice(0, NUM_REACTION_IN_ROW)}
                page={POST_PAGE}
              />
              <Reactions
                reactions={reactions.slice(
                  NUM_REACTION_IN_ROW,
                  Math.min(2 * NUM_REACTION_IN_ROW, reactions.length)
                )}
                page={POST_PAGE}
              />
            </>
          )}
          {loadingError?.message && (
            <p className={styles["max-content"]}>{loadingError.message}</p>
          )}
        </div>
      )}
    </div>
  );
}

function Buttons({
  name,
  isPickerHidden,
  isDropDownHidden,
  onEmojiClick,
  onEmojiButtonClick,
  onShareButtonClick,
  onKakaoClick,
  onURLClick,
}) {
  return (
    <div className={styles.buttons}>
      <AddEmojiButton
        isPickerHidden={isPickerHidden}
        onEmojiClick={onEmojiClick}
        onAddButtonClick={onEmojiButtonClick}
      />
      <div className={styles.divider}></div>
      <ShareDropDown
        name={name}
        isDropDownHidden={isDropDownHidden}
        onShareButtonClick={onShareButtonClick}
        onKakaoClick={onKakaoClick}
        onURLClick={onURLClick}
      />
    </div>
  );
}

export default Nav;
