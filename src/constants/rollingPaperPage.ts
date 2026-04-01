import {
  NOTO_SANS,
  PRETENDARD,
  NANUM_MYEONGJO,
  NANUM_HANDLETTER,
  ACQUAINTANCE,
  FRIEND,
  COWORKER,
  FAMILY,
} from "constants/index";

// 타입 정의
export type PostInfoKey = "messages" | "reactions";

export interface ToastSetting {
  position: string;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress: undefined;
  theme: string;
}

export const PC_REACTION_NUM: number = 4;
export const NON_PC_REACTION_NUM: number = 3;

export const MESSAGE_NUM_DEFAULT: number = 12;

export const MESSAGE = "messages" as const;
export const REACTION = "reactions" as const;

export const POST_INFO_TYPE: Record<PostInfoKey, string> = {
  [MESSAGE]: "메세지를",
  [REACTION]: "반응을",
};

export const RELATIONSHIPS: Record<string, string> = {
  [ACQUAINTANCE]: "acquaintance",
  [FRIEND]: "friend",
  [COWORKER]: "coworker",
  [FAMILY]: "family",
};

export const FONT_CLASS_NAME: Record<string, string> = {
  [NOTO_SANS]: "font-noto-sans",
  [PRETENDARD]: "font-pretendard",
  [NANUM_MYEONGJO]: "font-nanum-myeongjo",
  [NANUM_HANDLETTER]: "font-nanum-handletter",
};

export const TOAST_DEFAULT_SETTING: ToastSetting = {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};