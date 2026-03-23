import { TEAM_BASE_URL } from "constants";

/* DELETE */
// NOTE - 메세지 삭제
export async function delMessage(messageId) {
  const response = await fetch(`${TEAM_BASE_URL}messages/${messageId}/`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("메세지를 삭제하는 데 실패했습니다");
  }
  // TODO - 리팩토링
}
