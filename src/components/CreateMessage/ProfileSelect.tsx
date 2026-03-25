import React from "react";
import styles from "./ProfileSelect.module.scss";
import { PROFILES } from "constants/postMessagePage";

interface ProfileSelectProps {
  onProfileSelect: (src: string) => void;
  selectedProfile: string;
}

const ProfileSelect = ({ onProfileSelect, selectedProfile }: ProfileSelectProps) => {
  return (
    <div className={styles["message-form-profile"]}>
      <span className={styles["message-form-title"]}>프로필 이미지</span>
      <div className={styles["message-form-profile-container"]}>
        <img
          className={styles["message-form-profile-selected"]}
          src={selectedProfile}
          alt="선택된 프로필 이미지"
        />
        <div className={styles["message-form-profile-options"]}>
          <p className={styles["message-form-profile-options-title"]}>
            프로필 이미지를 선택해주세요!
          </p>
          <div className={styles["message-form-profile-preview-container"]}>
            {PROFILES.map((profile, i) => (
              <img
                key={i}
                className={styles["message-form-profile-preview"]}
                src={profile.src}
                alt={profile.filename}
                onClick={() => onProfileSelect(profile.src)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelect;