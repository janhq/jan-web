import { TitleBlankState } from "../TitleBlankState";
import { CardBlankState } from "../CardBlankState";
import avatar from "@/assets/Thumbnail02.png";
import { ImageBlankState } from "../ImageBlankState";
import image from "@/assets/image 1.jpg";

export const ChatBlankState: React.FC = () => {
  const data = [
    {
      name: "Guanaco",
      description: "Conversation AI with a quirky personality",
      avatar: avatar.src,
    },
    {
      name: "Guanaco",
      description:
        "Powered by GPT-3.5 Turbo. The OG AI and Large Language Model built by OpenAI.",
      avatar: avatar.src,
    },
  ];

  const dataImage = [
    {
      title: "Dreamshaper",
      image: image.src,
    },
    {
      title: "Dreamshaper",
      image: image.src,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#D9D9D9]">
      <div className="flex flex-col gap-6 w-[400px]">
        <div className="flex gap-2 flex-col">
          <TitleBlankState title="Get instant answers, find creative inspiration, and learn something new" />
          <div className="gap-[2px] flex flex-col">
            {data.map((item, index) => (
              <CardBlankState key={index} {...item} />
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <TitleBlankState title="Generate artworks" />
          <div className="flex gap-2">
            {dataImage.map((item, index) => (
              <ImageBlankState key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
