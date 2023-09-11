import {
  addNewMessageAtom,
  currentChatMessagesAtom,
  currentConversationAtom,
  currentPromptAtom,
  updateConversationWaitingForResponseAtom,
  userConversationsAtom,
} from "@/_helpers/JotaiWrapper";
import {
  ChatMessage,
  MessageSenderType,
  MessageStatus,
  MessageType,
} from "@/_models/ChatMessage";
import { Conversation } from "@/_models/Conversation";
import { ProductType } from "@/_models/Product";
import {
  CreateMessageDocument,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  GenerateImageDocument,
  GenerateImageMutation,
  GenerateImageMutationVariables,
} from "@/graphql";
import { useMutation } from "@apollo/client";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useSignIn from "./useSignIn";
import useGetCurrentUser from "./useGetCurrentUser";
import { Role } from "@/_models/User";

export default function useSendChatMessage() {
  const { user } = useGetCurrentUser();
  const { signInWithKeyCloak } = useSignIn();
  const [currentPrompt, setCurrentPrompt] = useAtom(currentPromptAtom);
  const [userConversations, setUserConversations] = useAtom(
    userConversationsAtom
  );
  const addNewMessage = useSetAtom(addNewMessageAtom);
  const activeConversation = useAtomValue(currentConversationAtom);
  const currentMessages = useAtomValue(currentChatMessagesAtom);
  const [createMessageMutation] = useMutation<CreateMessageMutation>(
    CreateMessageDocument
  );
  const [imageGenerationMutation] = useMutation<GenerateImageMutation>(
    GenerateImageDocument
  );
  const updateConvoWaitingState = useSetAtom(
    updateConversationWaitingForResponseAtom
  );

  const sendTextToTextMessage = async (
    conversation: Conversation,
    latestUserMessage: ChatMessage
  ) => {
    // TODO: handle case timeout using higher order function
    const messageToSend = [
      latestUserMessage,
      ...currentMessages.slice(0, 4),
    ].reverse();
    const latestMessages = messageToSend.map((e) => ({
      role:
        e.messageSenderType === MessageSenderType.User
          ? Role.User
          : Role.Assistant,
      content: e.text,
    }));

    const variables: CreateMessageMutationVariables = {
      data: {
        conversation_id: conversation.id,
        sender: MessageSenderType.Ai,
        message_sender_type: MessageSenderType.Ai,
        message_type: MessageType.Text,
        sender_avatar_url: conversation.product.avatarUrl,
        sender_name: conversation.product.name,
        prompt_cache: latestMessages,
        status: MessageStatus.Pending,
      },
    };
    const result = await createMessageMutation({
      variables,
    });

    if (!result.data?.insert_messages_one?.id) {
      console.error(
        "Error creating user message",
        JSON.stringify(result.errors)
      );
      updateConvoWaitingState(conversation.id, false);
      return;
    }

    const aiResponseMessage: ChatMessage = {
      id: result.data.insert_messages_one.id,
      conversationId: conversation.id,
      messageType: MessageType.Text,
      messageSenderType: MessageSenderType.Ai,
      senderUid: conversation.product.slug,
      senderName: conversation.product.name,
      senderAvatarUrl: conversation.product.avatarUrl ?? "/icons/app_icon.svg",
      text: "",
      status: MessageStatus.Pending,
      createdAt: Date.now(),
    };

    addNewMessage(aiResponseMessage);
  };

  const sendTextToImageMessage = async (conversation: Conversation) => {
    // TODO: handle case timeout using higher order function
    const variables: GenerateImageMutationVariables = {
      model: conversation.product.slug,
      prompt: currentPrompt,
      neg_prompt: "",
      seed: Math.floor(Math.random() * 429496729),
      steps: 30,
      width: 512,
      height: 512,
    };

    const data = await imageGenerationMutation({
      variables,
    });

    if (!data.data?.imageGeneration?.url) {
      // TODO: display error
      console.error("Error creating user message", JSON.stringify(data.errors));
      updateConvoWaitingState(conversation.id, false);
      return;
    }

    const imageUrl: string = data.data.imageGeneration.url;

    const createMessageVariables: CreateMessageMutationVariables = {
      data: {
        conversation_id: conversation.id,
        content: currentPrompt,
        sender: MessageSenderType.Ai,
        message_sender_type: MessageSenderType.Ai,
        message_type: MessageType.Image,
        sender_avatar_url: conversation.product.avatarUrl,
        sender_name: conversation.product.name,
        status: MessageStatus.Ready,
        message_medias: {
          data: [
            {
              media_url: imageUrl,
              mime_type: "image/jpeg",
            },
          ],
        },
      },
    };
    const result = await createMessageMutation({
      variables: createMessageVariables,
    });

    if (!result.data?.insert_messages_one?.id) {
      // TODO: display error
      console.error(
        "Error creating user message",
        JSON.stringify(result.errors)
      );
      updateConvoWaitingState(conversation.id, false);
      return;
    }

    const imageResponseMessage: ChatMessage = {
      id: result.data.insert_messages_one.id,
      conversationId: conversation.id,
      messageType: MessageType.Image,
      messageSenderType: MessageSenderType.Ai,
      senderUid: conversation.product.slug,
      senderName: conversation.product.name,
      senderAvatarUrl: conversation.product.avatarUrl,
      text: currentPrompt,
      imageUrls: [imageUrl],
      createdAt: Date.now(),
      status: MessageStatus.Ready,
    };

    addNewMessage(imageResponseMessage);
    // conversation.setProp("updatedAt", Date.now());
    // conversation.setProp("lastImageUrl", imageUrl);
    updateConvoWaitingState(conversation.id, false);
  };

  const sendChatMessage = async () => {
    if (!user) {
      signInWithKeyCloak();
      return;
    }
    if (currentPrompt.trim().length === 0) return;

    if (!activeConversation) {
      console.error("No active conversation");
      return;
    }

    updateConvoWaitingState(activeConversation.id, true);
    const variables: CreateMessageMutationVariables = {
      data: {
        conversation_id: activeConversation.id,
        content: currentPrompt,
        sender: user.id,
        message_sender_type: MessageSenderType.User,
        message_type: MessageType.Text,
        sender_avatar_url: user.avatarUrl,
        sender_name: user.displayName,
      },
    };
    const result = await createMessageMutation({ variables });

    if (!result.data?.insert_messages_one?.id) {
      // TODO: display error
      console.error(
        "Error creating user message",
        JSON.stringify(result.errors)
      );
      updateConvoWaitingState(activeConversation.id, false);
      return;
    }

    const userMesssage: ChatMessage = {
      id: result.data.insert_messages_one.id,
      conversationId: activeConversation.id,
      messageType: MessageType.Text,
      messageSenderType: MessageSenderType.User,
      senderUid: user.id,
      senderName: user.displayName,
      senderAvatarUrl: user.avatarUrl ?? "/icons/app_icon.svg",
      text: currentPrompt,
      createdAt: Date.now(),
      status: MessageStatus.Ready,
    };

    addNewMessage(userMesssage);
    const newUserConversations = userConversations.map((e) => {
      if (e.id === activeConversation.id) {
        e.lastTextMessage = userMesssage.text;
      }
      return e;
    });

    setUserConversations(newUserConversations);

    if (activeConversation.product.type === ProductType.LLM) {
      await sendTextToTextMessage(activeConversation, userMesssage);
      setCurrentPrompt("");
    } else if (activeConversation.product.type === ProductType.GenerativeArt) {
      await sendTextToImageMessage(activeConversation);
      setCurrentPrompt("");
    } else {
      console.error(
        "We do not support this model type yet:",
        activeConversation.product.type
      );
    }
  };

  return {
    sendChatMessage,
  };
}
