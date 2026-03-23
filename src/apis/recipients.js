import { TEAM_BASE_URL } from "constants";
import { POST_INFO_TYPE, MESSAGE, REACTION } from "constants/rollingPaperPage";

const postURL = (postId) => `${TEAM_BASE_URL}recipients/${postId}/`;
const messageUrl = (postId) => `${TEAM_BASE_URL}recipients/${postId}/messages/`;

/* GET */
// NOTE - 포스트 목록 받기
export async function getList(offset = 0, limit = 12) {
  const query = `?offset=${offset}&limit=${limit}`;
  try {
    const response = await fetch(`${TEAM_BASE_URL}recipients/${query}`);
    if (!response.ok) {
      throw new Error("데이터를 불러오는데 실패했습니다");
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("데이터 로딩에 실패하였습니다.", error);
    throw error;
  }
}

// NOTE - 포스트 기본정보 받기
export async function getPost(postId) {
  const response = await fetch(`${postURL(postId)}`);
  if (!response.ok) {
    throw new Error("롤링 페이퍼를 불러오는 데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

async function getPostInfo(postId, type, offset = 0, limit = 12) {
  const query = `?offset=${offset}&limit=${limit}`;
  const base_url = `${postURL(postId)}${type}/`;
  const response = await fetch(`${base_url}${query}`);
  if (!response.ok) {
    throw new Error(`${POST_INFO_TYPE[type]} 불러오는 데 실패했습니다.`);
  }
  const body = await response.json();
  return body;
}

// NOTE - 메시지 더받기
export async function getMessage(postId, offset = 0, limit = 12) {
  return await getPostInfo(postId, MESSAGE, offset, limit);
}

// NOTE - 반응 더받기
export async function getReaction(postId, offset = 0, limit = 8) {
  return await getPostInfo(postId, REACTION, offset, limit);
}

/* POST */
// NOTE - 롤링페이퍼 생성
export async function postPaper(data) {
  const response = await fetch(`${TEAM_BASE_URL}recipients/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("롤링페이퍼를 생성하는 데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

// NOTE - 롤링 페이퍼 메세지 보내기
export async function postMessage(postId, data) {
  console.log("createUrl", messageUrl(postId));
  const response = await fetch(messageUrl(postId), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const body = await response.json();
  return body;
}

// NOTE - 반응 업데이트
export async function postReaction(postId, data) {
  await fetch(`${postURL(postId)}reactions/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

/* DELETE */
// NOTE - 롤링페이퍼 삭제
export async function delPaper(postId) {
  const response = await fetch(`${postURL(postId)}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("롤링페이퍼를 삭제하는 데 실패했습니다");
  }
}
