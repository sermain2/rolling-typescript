import { TEAM_BASE_URL } from "constants/index";
import { POST_INFO_TYPE, MESSAGE, REACTION } from "constants/rollingPaperPage";

interface ListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RecipientItem[];
}

interface RecipientItem {
  id: number;
  name: string;
  backgroundColor: string;
  backgroundImageURL: string | null;
  createdAt: string;
  messageCount: number;
  recentMessages: MessageItem[];
  topReactions: ReactionItem[];
}

interface MessageItem {
  id: number;
  recipientId: number;
  sender: string;
  profileImageURL: string;
  relationship: string;
  content: string;
  font: string;
  createdAt: string;
}

interface ReactionItem {
  id: number;
  emoji: string;
  count: number;
}

interface PaperData {
  name: string;
  backgroundColor?: string;
  backgroundImageURL?: string | null;
}

interface MessageData {
  team: string;
  recipientId: string | undefined;
  sender: string;
  relationship: string;
  content: string;
  font: string;
  profileImageURL: string;
}

interface ReactionData {
  emoji: string;
  type: string;
}

const postURL = (postId: string): string =>
  `${TEAM_BASE_URL}recipients/${postId}/`;
const messageUrl = (postId: string): string =>
  `${TEAM_BASE_URL}recipients/${postId}/messages/`;

/* GET */
export async function getList(
  offset = 0,
  limit = 12
): Promise<ListResponse> {
  const query = `?offset=${offset}&limit=${limit}`;
  try {
    const response = await fetch(`${TEAM_BASE_URL}recipients/${query}`);
    if (!response.ok) throw new Error("데이터를 불러오는데 실패했습니다");
    return await response.json();
  } catch (error) {
    console.error("데이터 로딩에 실패하였습니다.", error);
    throw error;
  }
}

export async function getPost(postId: string): Promise<RecipientItem> {
  const response = await fetch(postURL(postId));
  if (!response.ok)
    throw new Error("롤링 페이퍼를 불러오는 데 실패했습니다.");
  return await response.json();
}

async function getPostInfo(
  postId: string,
  type: keyof typeof POST_INFO_TYPE,
  offset = 0,
  limit = 12
) {
  const query = `?offset=${offset}&limit=${limit}`;
  const base_url = `${postURL(postId)}${type}/`;
  const response = await fetch(`${base_url}${query}`);
  if (!response.ok)
    throw new Error(`${POST_INFO_TYPE[type]} 불러오는 데 실패했습니다.`);
  return await response.json();
}

export async function getMessage(postId: string, offset = 0, limit = 12) {
  return await getPostInfo(postId, MESSAGE, offset, limit);
}

export async function getReaction(postId: string, offset = 0, limit = 8) {
  return await getPostInfo(postId, REACTION, offset, limit);
}

/* POST */
export async function postPaper(data: PaperData) {
  const response = await fetch(`${TEAM_BASE_URL}recipients/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok)
    throw new Error("롤링페이퍼를 생성하는 데 실패했습니다.");
  return await response.json();
}

export async function postMessage(
  postId: string | undefined,
  data: MessageData
) {
  if (!postId) throw new Error("postId가 없습니다.");
  const response = await fetch(messageUrl(postId), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

export async function postReaction(postId: string, data: ReactionData) {
  await fetch(`${postURL(postId)}reactions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

/* DELETE */
export async function delPaper(postId: string) {
  const response = await fetch(postURL(postId), {
    method: "DELETE",
  });
  if (!response.ok)
    throw new Error("롤링페이퍼를 삭제하는 데 실패했습니다");
}