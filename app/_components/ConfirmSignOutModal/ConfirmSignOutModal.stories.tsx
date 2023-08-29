import ConfirmSignOutModal from ".";

export default {
  title: "ConfirmSignOutModal",
  component: ConfirmSignOutModal,
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
};

export const ConfirmSignOutModalStory: React.FC<Props> = (props) => (
  <ConfirmSignOutModal {...props} />
);
