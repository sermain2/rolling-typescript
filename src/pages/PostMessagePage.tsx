import React, { useState, useRef } from "react";
import styles from "pages/PostMessagePage.module.scss";
import CustomDropdown from "components/CreateMessage/CustomDropdown";
import ProfileSelect from "components/CreateMessage/ProfileSelect";
import "react-quill/dist/quill.snow.css";
import {
  FONT_CLASS_NAME,
  MEMBER_CLASS_NAME,
  DEFAULT_PROFILE,
  FORMATS,
  MODULES,
  EDITOR_STYLES,
} from "constants/postMessagePage";
import { useParams, useNavigate } from "react-router-dom";
import { postMessage } from "apis/recipients";
import ReactQuill from "react-quill";

// 폼 데이터 타입
interface MessageFormData {
  team: string;
  recipientId: string | undefined;
  sender: string;
  relationship: string;
  content: string;
  font: string;
  profileImageURL: string;
}

export default function PostMessageForm() {
  const [senderValue, setSenderValue] = useState<string>("");
  const [senderError, setSenderError] = useState<boolean>(false);
  const [relationship, setRelationship] = useState<string>("지인");
  const [editorError, setEditorError] = useState<boolean>(false);
  const [selectedFont, setSelectedFont] = useState<string>("Noto Sans");
  const [selectedProfile, setSelectedProfile] = useState<string>(DEFAULT_PROFILE);
  const [editorContent, setEditorContent] = useState<string>("");

  const quillRef = useRef<ReactQuill>(null);

  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.trim();
    setSenderValue(name);
    if (name.length > 0) {
      setSenderError(false);
    }
  };

 const handleEditorChange = (content: string, delta: unknown, source: unknown, editor: ReactQuill.UnprivilegedEditor) => {
    const currentContent = editor.getHTML();
    setEditorContent(currentContent);
    const currentContentText = editor.getText().trim();
    if (currentContentText === "") {
      setEditorError(true);
    } else {
      setEditorError(false);
    }
  };

  const handleSenderFocusOut = () => {
    if (senderValue.trim() === "") {
      setSenderError(true);
    }
  };

const handleContentFocusOut = () => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;
    const currentContent = editor.getText().trim();
    if (currentContent === "") {
      setEditorError(true);
    } else {
      setEditorError(false);
    }
  };
const handleProfileSelect = (src: string) => {
    setSelectedProfile(src);
  };

  const isButtonDisabled =
    !editorContent || !senderValue || senderError || editorError;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: MessageFormData = {
      team: "6-1",
      recipientId: postId,
      sender: senderValue,
      relationship: relationship,
      content: editorContent,
      font: selectedFont,
      profileImageURL: selectedProfile,
    };

    try {
      await postMessage(postId, formData);
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`${styles["message-form"]} ${senderError ? "error" : ""}`}
      >
        <div className={styles["message-form-sender"]}>
          <label
            htmlFor="nameInput"
            className={`${styles["message-form-title"]}`}
          >
            From.
          </label>
          <input
            onChange={handleNameChange}
            onBlur={handleSenderFocusOut}
            className={`${styles["message-form-inputs"]} ${
              styles["message-form-name-input"]
            } ${senderError ? styles.error : ""}`}
            id="nameInput"
            placeholder="이름을 입력해 주세요."
          />
          {senderError && (
            <p className={styles["form-error"]}>값을 입력해주세요.</p>
          )}
        </div>

        <ProfileSelect
          onProfileSelect={handleProfileSelect}
          selectedProfile={selectedProfile}
        />

        <div className={styles["message-form-relationship"]}>
          <label htmlFor="select" className={styles["message-form-title"]}>
            상대와의 관계
          </label>
          <CustomDropdown
            props={Object.keys(MEMBER_CLASS_NAME)}
            onSelect={(value: string) => setRelationship(value)}
          />
        </div>

        <div
          className={`${styles["message-form-content"]} ${
            editorError ? styles.error : ""
          }`}
        >
          <label htmlFor="content" className={styles["message-form-title"]}>
            내용을 입력해 주세요
          </label>
          <ReactQuill
            modules={MODULES}
            formats={FORMATS}
            style={EDITOR_STYLES}
            onChange={handleEditorChange}
            onBlur={handleContentFocusOut}
            placeholder="내용을 입력해주세요"
            ref={quillRef}
          />
          {editorError && (
            <p className={styles["form-error"]}>값을 입력해주세요.</p>
          )}
        </div>

        <div className={styles["message-form-font"]}>
          <span className={styles["message-form-title"]}>폰트 선택</span>
          <CustomDropdown
            props={Object.keys(FONT_CLASS_NAME)}
            onSelect={(value: string) => setSelectedFont(value)}
          />
        </div>
        <button
          className={`${styles["message-form-submit"]}`}
          type="submit"
          disabled={isButtonDisabled}
        >
          생성하기
        </button>
      </div>
    </form>
  );
}