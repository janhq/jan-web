import { AdvancedTextArea } from ".";
import { FieldValues, UseFormRegister } from "react-hook-form";

export default {
  title: "AdvancedTextArea",
  component: AdvancedTextArea,
};

type Props = {
  register: UseFormRegister<FieldValues>;
};

export const AdvancedTextAreaStory: React.FC<Props> = ({ register }) => {
  return (
    <AdvancedTextArea
      height={10}
      register={register}
      title=""
      formId=""
      placeholder=""
    />
  );
};
