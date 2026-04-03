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

interface PaperData {
  team: string;
  name: string;
  backgroundColor: string;
  backgroundImageURL: string | null;
}

export default function CreateRollingPaper() {
  const [selectedBg, setSelectedBg] = useState<string>("color");
  const [isWriteName, setIsWriteName] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const navigate = useNavigate();

  const [backgroundColor, setBackgroundColor] = useState<string>(
    BACKGROUND_COLOR[0]
  );
  const [backgroundImg, setBackgroundImg] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

  const handleBgSelect = (type: string) => {
    setSelectedBg(type);
    if (type === "image") {
      setBackgroundImg(BACKGROUND_IMAGE.first);
    } else {
      setBackgroundColor(BACKGROUND_COLOR[0]);
      setBackgroundImg(null);
    }
  };

  const handleBackgroundSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedBg === "color") {
      setBackgroundColor(e.target.value);
    } else {
      setBackgroundImg(e.target.value);
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("submit 실행됨");
  console.log("TEAM_BASE_URL:", process.env.REACT_APP_TEAM_BASE_URL);
  console.log("name:", name);
  
  let result;
  const data: PaperData = {
    team: "6-1",
    name: name,
    backgroundColor: backgroundColor,
    backgroundImageURL: backgroundImg,
  };
  console.log("전송 데이터:", data);
  try {
    result = await postPaper(data);
    console.log("결과:", result);
  } catch (e) {
    console.error("에러:", e);
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