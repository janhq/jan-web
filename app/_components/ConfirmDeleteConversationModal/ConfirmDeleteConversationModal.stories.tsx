import ConfirmDeleteConversationModal from ".";

export default {
  title: "ConfirmDeleteConversationModal",
  component: ConfirmDeleteConversationModal,
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirmDelete: () => void;
};

export const ConfirmDeleteConversationModalStory: React.FC<Props> = (props) => (
  <ConfirmDeleteConversationModal {...props} />
);
