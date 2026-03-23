import { BACKGROUND_IMAGE } from "constants/createRollingPaperPage";
import selected from "assets/icons/selected.svg";
import styles from "./Background.module.scss";

export default function Background({
  backgrounds,
  name,
  onBackgroundSelect,
  checkedValue,
}) {
  return (
    <>
      {backgrounds.map((background) => (
        <>
          <input
            type="radio"
            name={name}
            id={background}
            value={name === "color" ? background : BACKGROUND_IMAGE[background]}
            className={styles["select-bg-input"]}
            onChange={onBackgroundSelect}
            key={background}
          />
          <label
            htmlFor={background}
            className={`${styles[background]} ${styles["select-bg-label"]}`}
          >
            <div
              className={`${styles["checked-container"]} ${
                checkedValue ===
                (name === "color" ? background : BACKGROUND_IMAGE[background])
                  ? styles["checked-background-opacity"]
                  : ""
              }`}
            >
              <img
                src={selected}
                alt="선택 아이콘"
                className={`${
                  checkedValue ===
                  (name === "color" ? background : BACKGROUND_IMAGE[background])
                    ? ""
                    : styles["none-checked-background"]
                }`}
              />
            </div>
          </label>
        </>
      ))}
    </>
  );
}
