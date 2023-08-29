import { Instance } from "mobx-state-tree";
import { AiModel, AiModelType } from "@/_models/AiModel";
import JanWelcomeTitle from "../JanWelcomeTitle";
import { useQuery } from "@apollo/client";
import { GetProductPromptsDocument, GetProductPromptsQuery } from "@/graphql";
import { useStore } from "@/_models/RootStore";
import { ModifyImages } from "../ModifyImages";

type Props = {
  model: Instance<typeof AiModel>;
  onPromptSelected: (prompt: string) => void;
};

const SampleLlmContainer: React.FC<Props> = ({ model, onPromptSelected }) => {
  const { historyStore } = useStore();
  const { loading, error, data } = useQuery<GetProductPromptsQuery>(
    GetProductPromptsDocument,
    {
      variables: { productSlug: model.modelId },
    }
  );
  const shouldShowAdvancedPrompt =
    historyStore.getActiveConversation()?.aiModel?.aiModelType ===
      AiModelType.ControlNet ?? false;

  return (
    <div className="flex flex-col max-w-sm flex-shrink-0 gap-9 items-center pt-6 mx-auto">
      <JanWelcomeTitle
        title={model.name}
        description={model.description ?? ""}
      />
      <div className="flex flex-col">
        <h2 className="font-semibold text-xl leading-6 tracking-[-0.4px] mb-5">
          Try now
        </h2>
        {shouldShowAdvancedPrompt ? (
          <ModifyImages />
        ) : (
          <div className="flex flex-col">
            <h2 className="font-semibold text-xl leading-6 tracking-[-0.4px] mb-5">
              Try now
            </h2>
            <div className="flex flex-col">
              {data?.prompts.map((item) => (
                <button
                  onClick={() => onPromptSelected(item.content || "")}
                  key={item.slug}
                  className="rounded p-2 hover:bg-[#0000000F] text-xs leading-[18px] text-gray-500 text-left"
                >
                  <span className="line-clamp-3">{item.content}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SampleLlmContainer;
