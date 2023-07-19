import avatar from "@/assets/Thumbnail02.png";
import test from "@/assets/test.jpg";
import { SimpleImageMessage } from "@/components/SimpleImageMessage";
import { SimpleTextMessage } from "@/components/SimpleTextMessage";

export const ChatBody: React.FC = () => {
  const datas = [
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "It's a serene mountain lake surrounded by lush green forests. The water is crystal clear, reflecting the towering peaks in the distance. The sky is a brilliant shade of blue, with fluffy white clouds scattered across it. There's a small wooden dock stretching out into the lake, adding a touch of tranquility to the scene.",
    },
    {
      avatarUrl: avatar.src,
      SenderName: "Engerraund Serac",
      time: "11:56",
      text: "Here’s the picture inspired from your prompt:",
      imageUrl: test,
    },
  ];
  return (
    <div className="flex-1 w-full">
      <div className="flex flex-col gap-8">
        {datas.map((item, index) =>
          item.imageUrl ? (
            <SimpleImageMessage key={index} {...item} />
          ) : (
            <SimpleTextMessage key={index} {...item} />
          )
        )}
      </div>
    </div>
  );
};
