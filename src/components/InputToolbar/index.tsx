import SendButton from "@/components/SendButton";
import { useEffect, useRef, useState } from "react";
import { useStore } from "../../models/RootStore";
import { useAuth } from "@/contexts/auth_context";
import { DefaultUser } from "../../models/User";
import { AiModelType } from "../../models/AiModel";
import { api } from "@/services/api";
import ActionButton from "@/components/ActionButton";

type Props = {
  prefillPrompt: string;
  callback: (value: number) => void;
};

export const InputToolbar: React.FC<Props> = ({ prefillPrompt, callback }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { historyStore } = useStore();
  const { currentUser } = useAuth();
  const [text, setText] = useState(prefillPrompt);
  const [promptGenerating, setPromptGenerating] = useState(false);

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

      callback(textAreaRef.current.offsetHeight);
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
        if (res.kind === "ok") setText([text.trim(),res.data.text.trim()].join(" "));
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

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <div className="relative">
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300">
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
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              placeholder="Add your comment..."
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#F8F8F8",
              borderWidth: 1,
              borderColor: "#D1D5DB",
            }}
            className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2 rounded-b-lg"
          >
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
      </div>
    </div>
  );
};
