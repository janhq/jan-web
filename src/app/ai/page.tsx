import { Slider } from "@/components";
import AiTypeList from "@/components/AiTypeList";
import ConversationalList from "@/components/ConversationalList";
import GenerateImageList from "@/components/GenerateImageList";
import Footer from "@/components/Footer";
import { api } from "@/services/api";
import { Product, Section } from "@/models/Product";

const AiPage: React.FC = async () => {
  const discover = await api.getConfigurations("discover");
  const categoryProducts: Product[] = discover.kind === "ok"
      ? discover.configuration?.sections?.find(
          (section: Section) => section.name === "all_categories"
        )?.products
      : [];

  const featured: Product[] = discover.kind === "ok"
      ? discover.configuration?.sections?.find(
          (section: Section) => section.name === "featured"
        )?.products
      : [];

  const conversationals: Product[] =
    categoryProducts
      ?.filter((e) => e.name === "conversational")
      .flatMap((e) => e.action.params.products)
      .filter((e): e is Product => !!e) || [];

  const generateImages: Product[] =
    categoryProducts
      ?.filter((e) => e.name === "text_to_image")
      .flatMap((e) => e.action.params.products)
      .filter((e): e is Product => !!e) || [];

  return (
    <main className="container m-auto flex flex-col space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-bold mt-3 mb-4 leading-[52px] text-[40px] text-gray-400">
            AIs
          </h2>
        </div>
        <div className="flex gap-20 w-full flex-1">
          <div className="lg:w-[70%] w-full">
            <Slider product={featured[0]} />
          </div>
          <div className="lg:block hidden w-[30%]">
            <AiTypeList
              conversationals={conversationals}
              generativeArts={generateImages}
            />
          </div>
        </div>
      </div>
      <ConversationalList products={conversationals} />
      <GenerateImageList products={generateImages} />
      <Footer />
    </main>
  );
};

export default AiPage;
