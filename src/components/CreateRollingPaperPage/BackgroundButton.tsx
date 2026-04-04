import styles from "./BackgroundButton.module.scss";

export default function BackgroundButton({ onBgSelect, selectedBg }) {
  return (
    <div className={styles["select-bg-container"]}>
      <input
        type="radio"
        id="bgColor"
        name="select"
        checked={selectedBg === "color"}
        onChange={() => onBgSelect("color")}
      />
      <label htmlFor="bgColor" className={`font-16-16-16`}>
        컬러
      </label>
      <input
        type="radio"
        id="bgImg"
        name="select"
        checked={selectedBg === "image"}
        onChange={() => onBgSelect("image")}
      />
      <label htmlFor="bgImg" className={`font-16-16-16`}>
        이미지
      </label>
    </div>
  );
}
