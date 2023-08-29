import ActionButton from ".";

export default {
  title: "ActionButton",
  component: ActionButton,
};

type Props = {
  title: string;
  icon: string;
  isLoading?: boolean;
  onClick: () => void;
};

export const ActionButtonStory: React.FC<Props> = ({
  icon,
  onClick,
  title,
  isLoading,
}) => (
  <ActionButton
    icon={icon}
    onClick={onClick}
    title={title}
    isLoading={isLoading}
  />
);
