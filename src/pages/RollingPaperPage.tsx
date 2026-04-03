import { useCallback, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { delPaper, getMessage, getPost, getReaction } from "apis/recipients";
import { delMessage } from "apis/messages";
import {
  TOAST_DEFAULT_SETTING,
  MESSAGE_NUM_DEFAULT,
} from "constants/rollingPaperPage";
import ButtonList from "components/RollingPaperPage/ButtonList";
import Card, { FirstCard } from "components/RollingPaperPage/Card";
import Nav from "components/RollingPaperPage/Nav";
import styles from "./RollingPaperPage.module.scss";
import Loading from "components/common/Loading";

interface PostInfo {
  name: string;
  backgroundColor: string;
  style: { backgroundImage: string } | null;
  messageCount: number;
  messageProfiles: { id: number; imgURL: string }[];
}

interface MessageItem {
  id: number;
  sender: string;
  profileImageURL: string;
  relationship: string;
  content: string;
  font: string;
  createdAt: string;
}

interface MessageInfo {
  messages: MessageItem[];
  ids: number[];
  count: number;
  offset: number;
}

interface ReactionItem {
  id: number;
  emoji: string;
  count: number;
}

interface CardListProps {
  isEdit: boolean;
  messages: MessageItem[];
  onCheck: (id: string, isChecked: boolean) => void;
  deleteMessageIds: number[];
}

function RollingPaperPage() {
  const { postId } = useParams<{ postId: string }>();

  const [postInfo, setPostInfo] = useState<PostInfo>({
    name: "",
    backgroundColor: "",
    style: null,
    messageCount: 0,
    messageProfiles: [],
  });
  const [messageInfo, setMessageInfo] = useState<MessageInfo>({
    messages: [],
    ids: [],
    count: 0,
    offset: 0,
  });
  const [reactions, setReactions] = useState<ReactionItem[]>([]);
  const [loadingError, setLoadingError] = useState<Error | null>(null);
  const [reactionLoadingError, setReactionLoadingError] =
    useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteMessageIds, setDeleteMessageIds] = useState<number[]>([]);
  const [isReactionHidden, setIsReactionHidden] = useState<boolean>(true);
  const [isDropDownHidden, setIsDropDownHidden] = useState<boolean>(true);
  const [isPickerHidden, setIsPickerHidden] = useState<boolean>(true);

  const location = useLocation();
  const isEdit = location.pathname.includes("/edit");
  const navigate = useNavigate();

  const notifyURLCopy = useCallback(
    () => toast.success("URL이 복사 되었습니다.", TOAST_DEFAULT_SETTING),
    []
  );

  const handleCheck = useCallback(
    (id: string, isChecked: boolean) => {
      const numberId = Number(id);
      if (isChecked) {
        setDeleteMessageIds((prev) => [...prev, numberId]);
      } else {
        setDeleteMessageIds(deleteMessageIds.filter((item) => item !== numberId));
      }
    },
    [deleteMessageIds]
  );

  const handleCheckAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setDeleteMessageIds(messageInfo.messages.map((item) => item.id));
      } else {
        setDeleteMessageIds([]);
      }
    },
    [messageInfo.messages]
  );

  const handlePostInfoLoad = useCallback(async () => {
    let postResult;
    try {
      setLoadingError(null);
      postResult = await getPost(postId!);
    } catch (e) {
      setLoadingError(e as Error);
      return;
    }

    const { name, backgroundColor, backgroundImageURL, messageCount, recentMessages } =
      postResult;
    setPostInfo({
      name,
      backgroundColor,
      style: backgroundImageURL
        ? { backgroundImage: `url(${backgroundImageURL})` }
        : null,
      messageCount,
      messageProfiles: recentMessages.map((message: MessageItem) => ({
        id: message.id,
        imgURL: message.profileImageURL,
      })),
    });
  }, [postId]);

  const handleMessageLoad = useCallback(async () => {
    let messageResult;
    try {
      setLoadingError(null);
      messageResult = await getMessage(postId!);
    } catch (e) {
      setLoadingError(e as Error);
      return;
    }

    const { results: newMessages, count } = messageResult;
    setMessageInfo({
      messages: newMessages,
      ids: newMessages.map((message: MessageItem) => message.id),
      count,
      offset: newMessages.length,
    });
  }, [postId]);

  const handleMoreMessageLoad = useCallback(async () => {
    let messageResult;
    try {
      setIsLoading(true);
      setLoadingError(null);
      messageResult = await getMessage(postId!, messageInfo.offset, MESSAGE_NUM_DEFAULT);
    } catch (e) {
      setLoadingError(e as Error);
      return;
    }

    setIsLoading(false);
    const { results: newMessages, count } = messageResult;
    setMessageInfo((prevInfo) => {
      const newIds = newMessages.map((message: MessageItem) => message.id);

      let idx = 0;
      let sameIdIdx = prevInfo.ids.indexOf(newIds[idx]);
      while (sameIdIdx >= 0 && idx++ < newIds.length) {
        sameIdIdx = prevInfo.ids.indexOf(newIds[idx++]);
      }

      if (newIds.length === idx) return prevInfo;

      const updatedMessages = [...prevInfo.messages, ...newMessages.slice(idx)];
      return {
        messages: updatedMessages,
        ids: [...prevInfo.ids, ...newIds.slice(idx)],
        count,
        offset: updatedMessages.length,
      };
    });
  }, [postId, messageInfo.offset]);

  const handleReactionLoad = useCallback(async () => {
    let reactionResult;
    try {
      setReactionLoadingError(null);
      reactionResult = await getReaction(postId!);
    } catch (e) {
      setReactionLoadingError(e as Error);
      return;
    }

    const { results: newReactions } = reactionResult;
    setReactions(newReactions);
  }, [postId]);

  const handleInitialLoad = useCallback(async () => {
    setIsLoading(true);
    Promise.all([handlePostInfoLoad(), handleMessageLoad()]).then(() => {
      setIsLoading(false);
    });
    handleReactionLoad();
  }, [handlePostInfoLoad, handleMessageLoad, handleReactionLoad]);

  const handleDeleteMessage = useCallback(async () => {
    const confirmation = window.confirm(
      `${deleteMessageIds.length}개의 메세지를 삭제하시겠습니까?`
    );
    if (!confirmation) return;

    try {
      setLoadingError(null);
      await Promise.all(
        deleteMessageIds.map(async (messageId) => {
          await delMessage(messageId);
        })
      );
    } catch (e) {
      setLoadingError(e as Error);
      return;
    }

    handlePostInfoLoad();
    handleMessageLoad();
    setDeleteMessageIds([]);
    navigate(`/post/${postId}`);
  }, [deleteMessageIds, handleMessageLoad, handlePostInfoLoad, navigate, postId]);

  const handleDeletePaper = useCallback(async () => {
    const confirmation = window.confirm(
      `${postInfo.name}님의 롤링페이퍼를 삭제하시겠습니까?`
    );
    if (!confirmation) return;

    try {
      setLoadingError(null);
      await delPaper(postId!);
    } catch (e) {
      setLoadingError(e as Error);
      return;
    }

    navigate("/list");
  }, [navigate, postId, postInfo.name]);

  const handleDefaultClick = useCallback(() => {
    setIsReactionHidden(true);
    setIsDropDownHidden(true);
    setIsPickerHidden(true);
  }, []);

  const handleMoreReactionClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPickerHidden(true);
    setIsDropDownHidden(true);
    setIsReactionHidden((prev) => !prev);
  }, []);

  const handleEmojiButtonClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsReactionHidden(true);
    setIsDropDownHidden(true);
    setIsPickerHidden((prev) => !prev);
  }, []);

  const handleDropDownClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsReactionHidden(true);
    setIsPickerHidden(true);
    setIsDropDownHidden((prev) => !prev);
  }, []);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (messageInfo.offset === 0) return;
      if (messageInfo.offset >= messageInfo.count) return;
      if (target.isIntersecting && !isLoading) {
        handleMoreMessageLoad();
      }
    },
    [isLoading, messageInfo.count, messageInfo.offset, handleMoreMessageLoad]
  );

  useEffect(() => {
    handleInitialLoad();
  }, [handleInitialLoad]);

  useEffect(() => {
    return () => {
      setDeleteMessageIds([]);
    };
  }, [location.pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    const observerTarget = document.getElementById("observer");
    if (observerTarget) observer.observe(observerTarget);
    return () => {
      if (observerTarget) observer.unobserve(observerTarget);
    };
  }, [handleObserver]);

  return (
    <main
      className={`${styles[postInfo.backgroundColor]} ${styles["page-main"]}`}
      style={postInfo.style ?? {}}
      onClick={handleDefaultClick}
    >
      <Nav
        postInfo={postInfo}
        reactions={reactions}
        isReactionHidden={isReactionHidden}
        isPickerHidden={isPickerHidden}
        isDropDownHidden={isDropDownHidden}
        reactionLoadingError={reactionLoadingError}
        onMoreReactionClick={handleMoreReactionClick}
        onEmojiClick={() => handleReactionLoad()}
        onEmojiButtonClick={handleEmojiButtonClick}
        onShareButtonClick={handleDropDownClick}
        onKakaoClick={handleDefaultClick}
        onURLClick={notifyURLCopy}
      />
      <div className={styles["card-section"]}>
        <ButtonList
          isEdit={isEdit}
          onDeleteMessages={handleDeleteMessage}
          deleteMessageIds={deleteMessageIds}
          messages={messageInfo.messages}
          onCheckAll={handleCheckAll}
          navigate={navigate}
          onDeletePaper={handleDeletePaper}
          postId={postId}
        />
        <CardList
          isEdit={isEdit}
          messages={messageInfo.messages}
          onCheck={handleCheck}
          deleteMessageIds={deleteMessageIds}
        />
        {isLoading && <Loading />}
        {loadingError?.message ? <p>{loadingError.message}</p> : ""}
        <ToastContainer />
      </div>
    </main>
  );
}

function CardList({ isEdit, messages, onCheck, deleteMessageIds }: CardListProps) {
  return (
    <>
      <ol className={styles["card-list"]}>
        {!isEdit && (
          <li>
            <FirstCard />
          </li>
        )}
        {messages.map((message) => (
          <li key={message.id}>
            <Card
              message={message}
              isEdit={isEdit}
              onCheck={onCheck}
              isChecked={deleteMessageIds.includes(message.id)}
            />
          </li>
        ))}
      </ol>
      <div id="observer" className={styles.observer} />
    </>
  );
}

export default RollingPaperPage;