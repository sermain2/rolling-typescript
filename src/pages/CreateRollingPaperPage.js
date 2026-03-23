import { useEffect, useState } from "react";
import styles from "./CreateRollingPaperPage.module.scss";
import {
  BACKGROUND_COLOR,
  BACKGROUND_IMAGE,
  BACKGROUND_IMAGE_NAME,
} from "constants/createRollingPaperPage";
import { postPaper } from "apis/recipients";
import { useNavigate } from "react-router-dom";
import Background from "components/CreateRollingPaperPage/Background";
import BackgroundButton from "components/CreateRollingPaperPage/BackgroundButton";

export default function CreateRollingPaper() {
  const [selectedBg, setSelectedBg] = useState("color");
  const [isWriteName, setIsWriteName] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  // NOTE - 리퀘스트할 데이터
  const [backgroundColor, setBackgroundColor] = useState(BACKGROUND_COLOR[0]);
  const [backgroundImg, setBackgroundImg] = useState(null);
  const [name, setName] = useState("");

  // NOTE - 배경 컬러, 이미지 중 선택하는 함수
  const handleBgSelect = (type) => {
    setSelectedBg(type);
    // NOTE - 컬러나 이미지 클릭 시 값 기본값으로 초기화
    if (type === "image") {
      setBackgroundImg(BACKGROUND_IMAGE.first);
    } else {
      setBackgroundColor(BACKGROUND_COLOR[0]);
      setBackgroundImg(null);
    }
  };

  // NOTE - 배경 선택하는 함수
  const handleBackgroundSelect = (e) => {
    if (selectedBg === "color") {
      setBackgroundColor(e.target.value);
    } else {
      setBackgroundImg(e.target.value);
    }
  };

  // NOTE - name Input
  const handleName = (e) => {
    setName(e.target.value);
    // NOTE - 1글자 이상 입력 중 에러 메세지 사라지도록 처리
    if (e.target.value.trim().length > 0) {
      setIsFocused(false);
    }
  };

  const handleFocusOut = () => {
    if (name.trim() === "") {
      setIsFocused(true);
    }
  };

  useEffect(() => {
    if (name) {
      setIsWriteName(false);
    } else {
      setIsWriteName(true);
    }
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // NOTE - 생성하기 버튼을 누를 때 선택된 값이 color일 경우 배경 이미지 null 해주어야 함
    // if (selectedBg === "color") {
    //   setBackgroundImg(null);
    // }
    let result;
    const data = {
      team: "6-1",
      name: name,
      backgroundColor: backgroundColor,
      backgroundImageURL: backgroundImg,
    };
    try {
      result = await postPaper(data);
    } catch (e) {
      return;
    }
    navigate(`/post/${result.id}`);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <section className={styles["sender-container"]}>
        <label htmlFor="sender" className="font-24-24-24-bold">
          To.
        </label>
        <input
          id="sender"
          name="sender"
          type="text"
          placeholder="받는 사람 이름을 입력해 주세요."
          className={`${styles["sender-input"]} ${
            isFocused ? styles["sender-input-error"] : ""
          }`}
          onChange={handleName}
          onBlur={handleFocusOut}
        />
        {isFocused && (
          <span className={`${styles["sender-input-error-msg"]} font-14-14-14`}>
            이름을 입력해주세요.
          </span>
        )}
      </section>
      <section className={styles["select-bg-section"]}>
        <div className={styles["select-bg-title"]}>
          <p className="font-24-24-24-bold">배경화면을 선택해주세요.</p>
          <span className={`${styles["select-bg-description"]} font-16-16-16`}>
            컬러를 선택하거나, 이미지를 선택할 수 있습니다.
          </span>
        </div>
        <BackgroundButton onBgSelect={handleBgSelect} selectedBg={selectedBg} />
        <div className={styles["select-bg-input-container"]}>
          {selectedBg === "color" ? (
            <Background
              backgrounds={BACKGROUND_COLOR}
              name="color"
              onBackgroundSelect={handleBackgroundSelect}
              checkedValue={backgroundColor}
            />
          ) : (
            <Background
              backgrounds={BACKGROUND_IMAGE_NAME}
              name="image"
              onBackgroundSelect={handleBackgroundSelect}
              checkedValue={backgroundImg}
            />
          )}
        </div>
      </section>
      <button
        className={`button full ${styles["submit-button"]}`}
        type="submit"
        disabled={isWriteName}
      >
        생성하기
      </button>
    </form>
  );
}
