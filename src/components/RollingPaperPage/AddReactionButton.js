import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { postReaction } from "apis/recipients";
import addEmojiIcon from "assets/icons/add_emoji.svg";
import styles from "./AddReactionButton.module.scss";

function AddEmojiButton({ isPickerHidden, onEmojiClick, onAddButtonClick }) {
  const { postId } = useParams();

  const handleEmojiClick = useCallback(
    async ({ native }) => {
      try {
        await postReaction(postId, {
          emoji: native,
          type: "increase",
        });
      } catch (e) {
        window.alert(e.message);
        return;
      }

      onEmojiClick();
    },
    [postId, onEmojiClick]
  );

  useEffect(() => {
    const emojiPicker = document.querySelector("em-emoji-picker");
    emojiPicker.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }, []);

  return (
    <div className={styles["add-emoji-container"]}>
      <button
        type="button"
        className={styles["add-emoji"]}
        onClick={onAddButtonClick}
      >
        <img src={addEmojiIcon} alt="반응 추가" />
        <p>{isPickerHidden ? "추가" : "닫기"}</p>
      </button>
      <div className={isPickerHidden ? styles.hidden : ""}>
        <Picker
          data={data}
          theme="light"
          set="native"
          searchPosition="sticky"
          skinTonePosition="search"
          onEmojiSelect={handleEmojiClick}
        />
      </div>
    </div>
  );
}

export default AddEmojiButton;
