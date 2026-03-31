import {
  ACQUAINTANCE,
  FRIEND,
  COWORKER,
  FAMILY,
  NOTO_SANS,
  PRETENDARD,
  NANUM_MYEONGJO,
  NANUM_HANDLETTER,
} from "constants";

export const MEMBER_CLASS_NAME = {
  [ACQUAINTANCE]: "지인",
  [FRIEND]: "친구",
  [COWORKER]: "동료",
  [FAMILY]: "가족",
};

export const FONT_CLASS_NAME = {
  [NOTO_SANS]: "Noto Sans",
  [PRETENDARD]: "Pretendard",
  [NANUM_MYEONGJO]: "나눔명조",
  [NANUM_HANDLETTER]: "나눔손글씨 손편지체",
};

export const DEFAULT_PROFILE =
  "https://cdn.icon-icons.com/icons2/317/PNG/512/profile-icon_34378.png";

export const PROFILES = [
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-3-avatar-2754579_120516.png",
    filename: "avatar1.png",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-4-avatar-2754580_120522.png",
    filename: "avatar2.png",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png",
    filename: "avatar3.png",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-11-avatar-2754576_120520.png",
    filename: "avatar4.png",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-8-avatar-2754583_120515.png",
    filename: "avatar5.png",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-10-avatar-2754575_120521.png",
    filename: "avatar6.png",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-1-avatar-2754574_120513.png",
    filename: "avatar7.png",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-9-avatar-2754584_120518.png",
    filename: "avatar8.png",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-2-avatar-2754578_120514.png",
    filename: "avatar9.png",
  },
  {
    src: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-12-avatar-2754577_120517.png",
    filename: "avatar10.png",
  },
];

export const TOOLBAR_OPTION = [
  ["link"],
  [{ header: [3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
];
export const FORMATS = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "indent",
  "background",
  "color",
  "link",
  "width",
];
export const MODULES = {
  toolbar: {
    container: TOOLBAR_OPTION,
  },
};

export const EDITOR_STYLES = {
  height: "210px",
};
