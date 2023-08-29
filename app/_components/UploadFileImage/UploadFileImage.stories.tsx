import { UploadFileImage } from ".";

import { FieldValues, UseFormRegister } from "react-hook-form";
export default {
  title: "UploadFileImage",
  component: UploadFileImage,
};

type Props = {
  register: UseFormRegister<FieldValues>;
};

export const UploadFileImageStory: React.FC<Props> = ({ register }) => (
  <UploadFileImage register={register} />
);
