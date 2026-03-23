import { Link } from "react-router-dom";
import styles from "./ButtonList.module.scss";
import back from "assets/icons/back.svg";
import editDelete from "assets/icons/edit_delete.svg";
import trash from "assets/icons/trash.svg";
import edit from "assets/icons/edit.svg";
import { useMediaQuery } from "react-responsive";

// NOTE
/* - 기본모드: 목록으로 | 페이지 삭제, 수정하기
 * - 수정모드: 취소    | 전체 선택, 삭제하기
 */
function ButtonList({
  isEdit,
  onDeleteMessages,
  deleteMessageIds,
  onCheckAll,
  messages,
  navigate,
  onDeletePaper,
  postId,
}) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  // NOTE - 뒤로가기
  const handleGoBack = () => {
    navigate(isEdit ? `/post/${postId}` : "/list");
  };
  return (
    <div className={styles["button-list-container"]}>
      <button onClick={handleGoBack} className={styles["go-back-button-bg"]}>
        <img
          src={isEdit ? editDelete : back}
          className={styles["go-back-button"]}
          alt={"뒤로가기"}
        />
      </button>
      <div className={styles["checkbox-button-container"]}>
        {isEdit ? (
          <>
            <SelectAll
              onCheckAll={onCheckAll}
              deleteMessageIds={deleteMessageIds}
              messages={messages}
            />
            <button
              className="button width-92 font-16-16-14"
              onClick={onDeleteMessages}
              disabled={!deleteMessageIds.length}
            >
              {isMobile ? <img src={trash} alt="삭제아이콘" /> : "삭제하기"}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onDeletePaper}
              className={`font-16-16-14 ${styles["delete-paper-button"]}`}
            >
              페이지 삭제
            </button>
            <Link to="edit" className="button width-92 font-16-16-14">
              {isMobile ? (
                <img src={edit} className={styles["edit-button"]} />
              ) : (
                "수정하기"
              )}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

function SelectAll({ onCheckAll, deleteMessageIds, messages }) {
  return (
    <div className={styles["select-all-container"]}>
      <input
        type="checkbox"
        id="selectAll"
        onChange={onCheckAll}
        checked={deleteMessageIds.length === messages.length}
      />
      <label className="font-20-20-18" htmlFor="selectAll">
        전체 선택
      </label>
    </div>
  );
}

export default ButtonList;
