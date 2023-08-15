import SendButton from "../SendButton";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "@/_models/RootStore";
import { useAuth } from "@/_contexts/authContext";
import { DefaultUser } from "@/_models/User";
import { AiModelType } from "@/_models/AiModel";
import { api } from "@/_services/api";
import ActionButton from "../ActionButton";
import Image from "next/image";
import { observer } from "mobx-react-lite";

type Props = {
  prefillPrompt: string;
};

export const InputToolbar: React.FC<Props> = observer(({ prefillPrompt }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { historyStore } = useStore();
  const [text, setText] = useState(prefillPrompt);
  const [promptGenerating, setPromptGenerating] = useState(false);
  const { currentUser, setShowLogin } = useAuth();

  const shouldShowEnhanceButton =
    historyStore.getActiveConversation()?.aiModel.aiModelType ===
      AiModelType.GenerativeArt ?? false;

  useEffect(() => {
    setText(prefillPrompt);
  }, [prefillPrompt]);

  const handleMessageChange = (event: any) => {
    setText(event.target.value);
  };
  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
      textAreaRef.current.style.maxHeight = "200px";
    }
  };

  useEffect(() => {
    resizeTextArea();
  }, [text]);

  const onEnhanceClick = () => {
    setPromptGenerating(true);
    api
      .magicPrompt(text)
      .then((res) => {
        if (res.kind === "ok")
          setText([text.trim(), res.data.text.trim()].join(" "));
      })
      .finally(() => {
        setPromptGenerating(false);
      });
  };

  const onRandomClick = () => {
    setPromptGenerating(true);
    api
      .magicPrompt("")
      .then((res) => {
        if (res.kind === "ok" && res.data.text.trim() !== "")
          setText(res.data.text.trim());
      })
      .finally(() => {
        setPromptGenerating(false);
      });
  };

  const onSubmitClick = () => {
    if (!currentUser || currentUser.isAnonymous) {
      setShowLogin(true);
      return
    }

    if (text.trim().length === 0) return;
    historyStore.sendMessage(
      text,
      currentUser?.uid ?? DefaultUser.id,
      currentUser?.displayName ?? DefaultUser.displayName,
      currentUser?.photoURL ?? DefaultUser.avatarUrl
    );
    setText("");
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      if (!event.shiftKey) {
        event.preventDefault();
        onSubmitClick();
      }
    }
  };

  let shouldDisableSubmitButton = false;
  if (historyStore.getActiveConversation()?.isWaitingForModelResponse) {
    shouldDisableSubmitButton = true;
  }
  if (text.length === 0) {
    shouldDisableSubmitButton = true;
  }
  const onAdvancedPrompt = useCallback(() => {
    historyStore.toggleAdvancedPrompt();
  }, []);

  return (
    <div
      className={`${
        historyStore.showAdvancedPrompt ? "hidden" : "block"
      } mb-3 flex-none w-full shadow-sm ring-1 ring-inset ring-gray-300 rounded-lg dark:bg-gray-800`}
    >
      <div className="overflow-hidden">
        <label htmlFor="comment" className="sr-only">
          Add your comment
        </label>
        <textarea
          ref={textAreaRef}
          onKeyDown={handleKeyDown}
          value={text}
          onChange={handleMessageChange}
          rows={2}
          name="comment"
          id="comment"
          className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 dark:text-white"
          placeholder="Add your comment..."
        />
      </div>
      <div
        style={{
          backgroundColor: "#F8F8F8",
          borderWidth: 1,
          borderColor: "#D1D5DB",
        }}
        className="flex justify-between py-2 pl-3 pr-2 rounded-b-lg"
      >
        <button
          onClick={onAdvancedPrompt}
          className="flex items-center gap-1 py-[1px]"
        >
          <Image src={"/icons/ic_setting.svg"} width={20} height={20} alt="" />
          <span className="text-sm leading-5 text-gray-600">Advanced</span>
        </button>
        <div className="flex justify-end items-center space-x-1 w-full pr-3">
          {shouldShowEnhanceButton ? (
            <>
              {text !== "" && !promptGenerating && (
                <ActionButton
                  icon={"/icons/ic_enhance.svg"}
                  title={"Enhance"}
                  isLoading={promptGenerating}
                  onClick={onEnhanceClick}
                />
              )}
              <ActionButton
                icon={"/icons/ic_random.svg"}
                title={"Random"}
                isLoading={promptGenerating}
                onClick={onRandomClick}
              />
            </>
          ) : undefined}
        </div>
        <div className="flex-shrink-0">
          <SendButton
            onClick={onSubmitClick}
            disabled={shouldDisableSubmitButton}
          />
        </div>
      </div>
    </div>
  );
});
