import { Instance, types } from "mobx-state-tree";
import { AiModel } from "./AiModel";
import { ChatMessage } from "./ChatMessage";
import { User } from "./User";
import { withSetPropAction } from "../helpers/withSetPropAction";

export const Conversation = types
  .model("Conversation", {
    /**
     * Unique identifier for the conversation
     */
    id: types.string,

    /**
     * AI model that the conversation is using
     */
    aiModel: AiModel,

    /**
     * Indicates whether the conversation is still fresh. Fresh
     * means the conversation is created by greeting by the AI.
     */
    isFresh: types.optional(types.boolean, true),

    /**
     * Conversation's messages, should ordered by time (createdAt)
     */
    chatMessages: types.optional(types.array(ChatMessage), []),

    /**
     * User who initiate the chat with the above AI model
     */
    user: User,

    /**
     * Indicates whether the model is still processing the user's input
     */
    isWaitingForModelResponse: types.optional(types.boolean, false), // TODO: move this to volatile

    /**
     * Indicates whether the conversation is created by the user
     */
    createdAt: types.number,

    /**
     * Time the last message is sent
     */
    updatedAt: types.maybe(types.number),

    /**
     * Last image url sent by the model if any
     */
    lastImageUrl: types.maybe(types.string),

    /**
     * Last text sent by the user if any
     */
    lastTextMessage: types.maybe(types.string),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    addMessage(message: Instance<typeof ChatMessage>) {
      self.chatMessages.push(message);
    },

    pushMessages(messages: Instance<typeof ChatMessage>[]) {
      const filteredMessages = messages.filter((m) => {
        return !self.chatMessages.find((cm) => cm.id !== m.id);
      });
      self.chatMessages.push(...filteredMessages);
    },
  }));
