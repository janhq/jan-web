import { FC } from "react";
import Slide from "../slide";

const Slider: FC = () => {
  const data = [1, 2, 3];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full flex overflow-auto">
      <Slide />
      {/* <Slide />
      <Slide /> */}
    </div>
  );
};
export default Slider;
