import { FC } from "react";
import Slide from "../Slide";
import { Product } from "@/models/Product";

interface ISliderProps {
  product: Product;
}

const Slider: FC<ISliderProps> = (props) => {
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
      <Slide
        title={props.product?.decoration.title}
        description={
          props.product.decoration.subTitle ||
          props.product.decoration.description
        }
        image={props.product.decoration.images[0]}
      />
    </div>
  );
};
export default Slider;
