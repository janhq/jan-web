import { MenuAdvancedPrompt } from "../MenuAdvancedPrompt";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CreateMessageDocument, CreateMessageMutation } from "@/graphql";
import BasicPromptButton from "../BasicPromptButton";
import PrimaryButton from "../PrimaryButton";

const AdvancedPrompt: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const [createMessageMutation] = useMutation<CreateMessageMutation>(
    CreateMessageDocument
  );

  const onSubmit = (data: any) => {};

  return (
    <form
      className="w-[288px] h-screen flex flex-col border-r border-gray-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <BasicPromptButton />
      <MenuAdvancedPrompt register={register} />
      <div className="py-3 px-2 flex flex-none gap-3 items-center justify-between border-t border-gray-200">
        <PrimaryButton
          fullWidth={true}
          title="Generate"
          onClick={() => handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
};

export default AdvancedPrompt;
