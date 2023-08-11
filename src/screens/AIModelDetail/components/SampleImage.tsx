interface ISampleImageProps {
  image?: string;
}
export const SampleImage: React.FC<ISampleImageProps> = (props) => {
  return (
    <div className="flex gap-[18px] w-full">
      <img src={props.image} alt="" className="max-w-[512px] rounded-lg overflow-hidden w-full aspect-square" />
    </div>
  );
};
