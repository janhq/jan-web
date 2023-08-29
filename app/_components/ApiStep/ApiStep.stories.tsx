import { ApiStep } from "../ApiStep";

export default {
  title: "ApiStep",
  component: ApiStep,
};

type Props = {
  title: string;
  description: string;
};

export const ApiStepStory: React.FC<Props> = (props) => <ApiStep {...props} />;
