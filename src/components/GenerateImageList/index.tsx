import Image from "next/image";
import GenerateImageCard from "../GenerateImageCard";

const GenerateImageList: React.FC = () => {
  const datas = [
    {
      title: "majicMIX realistic",
      img: "/images/user.png",
    },
    {
      title: "majicMIX realistic",
      img: "/images/user.png",
    },
    {
      title: "majicMIX realistic",
      img: "/images/user.png",
    },
    {
      title: "majicMIX realistic",
      img: "/images/user.png",
    },
  ];
  return (
    <div>
      <div className="flex mt-4 justify-between">
        <div className="gap-4 flex items-center">
          <Image src={"icons/ic_image.svg"} width={20} height={20} alt="" />
          <h2 className="text-gray-900 font-bold">Generate Images</h2>
        </div>
        <button className="flex gap-2 px-3 py-2 bg-gray-200 text-[#1F2A37] rounded-md">
          <span>View all</span>
          <span>&#8594;</span>
        </button>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        {datas.map((item, index) => (
          <GenerateImageCard key={index} img={item.img} title={item.title} />
        ))}
      </div>
    </div>
  );
};

export default GenerateImageList;
