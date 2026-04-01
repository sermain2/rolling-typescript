import {
  NOTO_SANS,
  PRETENDARD,
  NANUM_MYEONGJO,
  NANUM_HANDLETTER,
} from "constants";
import { ACQUAINTANCE, FRIEND, COWORKER, FAMILY } from "constants";

export const PC_REACTION_NUM = 4;
export const NON_PC_REACTION_NUM = 3;

export const MESSAGE_NUM_DEFAULT = 12;

export const MESSAGE = "messages";
export const REACTION = "reactions";

export const POST_INFO_TYPE = {
  [MESSAGE]: "메세지를",
  [REACTION]: "반응을",
};

export const RELATIONSHIPS = {
  [ACQUAINTANCE]: "acquaintance",
  [FRIEND]: "friend",
  [COWORKER]: "coworker",
  [FAMILY]: "family",
};

export const FONT_CLASS_NAME = {
  [NOTO_SANS]: "font-noto-sans",
  [PRETENDARD]: "font-pretendard",
  [NANUM_MYEONGJO]: "font-nanum-myeongjo",
  [NANUM_HANDLETTER]: "font-nanum-handletter",
};

export const TOAST_DEFAULT_SETTING = {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
