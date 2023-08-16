import JanWelcomeTitle from "../JanWelcomeTitle";
import { AiModel } from "@/_models/AiModel";
import { Instance } from "mobx-state-tree";
import Image from "next/image";

type Props = {
  model: Instance<typeof AiModel>;
  onPromptSelected: (prompt: string) => void;
};

export const GenerativeSampleContainer: React.FC<Props> = ({
  model,
  onPromptSelected,
}) => {
  const { defaultPrompts } = model;

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl mx-auto pb-6 mt-6">
      <JanWelcomeTitle
        title={model.name}
        description={model.modelDescription ?? ""}
      />
      <div className="flex gap-2 flex-col">
        <h2 className="text-xl leading-[25px] tracking-[-0.4px] font-semibold mt-3">
          Create now
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {defaultPrompts.map((item) => (
            <button
              key={item.slug}
              onClick={() => {
                onPromptSelected(item.content);
              }}
            >
              <Image
                style={{ objectFit: "cover" }}
                className="rounded col-span-1 flex flex-col"
                width={300}
                height={300}
                src={item.imageUrl ?? ""}
                alt=""
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
