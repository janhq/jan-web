import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  img: string;
};

const GenerateImageCard: React.FC<Props> = ({ img, title }) => {
  return (
    <Link href={`/ai/${title}`}>
      <div className="group relative active:opacity-50">
        <div className="h-56 w-full overflow-hidden rounded-[8px] bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
          <Image
            src={img}
            width={1000}
            height={1000}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute bottom-0 rounded-br-[8px] rounded-bl-[8px] bg-[rgba(0,0,0,0.7)] w-full gap-2 p-5">
          <span className="text-white">{title}</span>
        </div>
      </div>
    </Link>
  );
};

export default GenerateImageCard;
