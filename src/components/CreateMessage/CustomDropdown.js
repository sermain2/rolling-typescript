import React, { useState } from "react";
import ArrowIcon from "assets/icons/arrow_down.svg";
import styles from "pages/PostMessagePage.module.scss";


export default function CustomDropdown({ props, onSelect }) {
  const [selected, setSelected] = useState(
    props && props.length ? props[0] : "No items available"
  );
  const [active, setActive] = useState(false);

  if (!props || props.length === 0) {
    return <p>{selected}</p>;
  }

  const handleChange = (e) => {
    const { innerText } = e.target;
    setSelected(innerText);
    onSelect(innerText === "" ? null : innerText);
  };

  const handleToggle = () => {
    setActive((prevActive) => !prevActive);
  };

  return (
    <div className={styles["message-form-inputs"]} onClick={handleToggle}>
      {selected}
      <img
        className={styles["message-form-arrow-icon"]}
        alt="아래 방향 화살표 아이콘"
        src={ArrowIcon}
      />
      <div
        className={`${styles["message-form-drop-down-menu-box"]} ${
          active ? styles["message-form-drop-down-menu-box-active"] : ""
        }`}
        onClick={handleChange}
      >
        {props.map((item, index) => {
          return (
            <div className={styles["message-form-drop-down-menu"]} key={index}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
