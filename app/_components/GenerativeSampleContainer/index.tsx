import JanWelcomeTitle from "../JanWelcomeTitle";
import { Product } from "@/_models/AiModel";
import { Instance } from "mobx-state-tree";
import { GetProductPromptsQuery, GetProductPromptsDocument } from "@/graphql";
import { useQuery } from "@apollo/client";

type Props = {
  model: Instance<typeof Product>;
  onPromptSelected: (prompt: string) => void;
};

export const GenerativeSampleContainer: React.FC<Props> = ({
  model,
  onPromptSelected,
}) => {
  const { loading, error, data } = useQuery<GetProductPromptsQuery>(
    GetProductPromptsDocument,
    {
      variables: { productSlug: model.id },
    }
  );

  return (
    <div className="flex flex-col max-w-2xl flex-shrink-0 mx-auto mt-6">
      <JanWelcomeTitle
        title={model.name}
        description={model.modelDescription ?? ""}
      />
      <div className="flex flex-col">
        <h2 className="font-semibold text-xl leading-6 tracking-[-0.4px] mb-5">
          Create now
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {data?.prompts.map((item) => (
            <button
              key={item.slug}
              onClick={() => onPromptSelected(item.content || "")}
              className="w-full h-full"
            >
              <img
                style={{ objectFit: "cover" }}
                className="w-full h-full rounded col-span-1 flex flex-col"
                src={item.image_url ?? ""}
                alt=""
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
