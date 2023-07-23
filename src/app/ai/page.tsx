import { AiSearch, Slider } from "@/components";
import AiTypeList from "@/components/AiTypeList";
import ConversationalList from "@/components/ConversationalList";
import GenerateImageList from "@/components/GenerateImageList";
import Footer from "@/components/Footer";

const AiPage: React.FC = () => {
  return (
    <main className="container m-auto">
      <div className="flex items-center justify-between">
        <h2 className="font-bold leading-[52px] text-[40px] text-gray-400">
          AIs
        </h2>
        <AiSearch />
      </div>
      <div className="flex gap-20">
        <div className="w-[70%]">
          <Slider />
        </div>
        <div className="w-[30%]">
          <AiTypeList />
        </div>
      </div>
      <ConversationalList />
      <GenerateImageList />
      <Footer />
    </main>
  );
};

export default AiPage;
