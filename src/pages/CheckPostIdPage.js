import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { TEAM_BASE_URL } from "constants";

function CheckPostIdPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkPostId = async () => {
      try {
        await getPost(postId);
      } catch (e) {
        navigate("/404");
      }
    };

    checkPostId();
  }, [navigate, postId]);

  return <Outlet />;
}

async function getPost(postId) {
  const response = await fetch(`${TEAM_BASE_URL}recipients/${postId}/`);
  if (response.status === 404) {
    throw new Error("잘못된 주소에 접근실패했습니다.");
  }
}

export default CheckPostIdPage;
