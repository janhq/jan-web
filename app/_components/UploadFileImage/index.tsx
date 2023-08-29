import React, { useRef, useState } from "react";
import Image from "next/image";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { PlusIcon } from "@heroicons/react/24/outline";

type Props = {
  register: UseFormRegister<FieldValues>;
};

export const UploadFileImage: React.FC<Props> = ({ register }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>("No selected file");

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (!file || file.type.split("/")[0] !== "image") return;

    setImage(URL.createObjectURL(file));
    setFileName(file.name);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onSelectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type.split("/")[0] !== "image") return;

    setImage(URL.createObjectURL(file));
    setFileName(file.name);
  };

  const handleDelete = () => {
    setImage(null);
    setFileName("No file selected");
  };

  return (
    <div
      className={`flex flex-col gap-[10px] py-3`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => ref.current?.click()}
    >
      <div className="relative flex flex-col justify-center items-center py-5 px-2 gap-2 round-[2px] border border-dashed border-[#C8D0E0] rounded-sm">
        <PlusIcon width={14} height={14}/>
        <span className="text-gray-700 font-normal text-sm">
          Drag an image here, or click to select
        </span>
        <input
          className="opacity-0 absolute w-full h-full top-0 left-0"
          {...register("fileInput", { required: true })}
          type="file"
          onChange={onSelectedFile}
          accept="image/*"
        />
        {image && (
          <div className="absolute w-full h-full">
            <div className="relative group">
              <Image
                style={{ width: "100%", height: "107px", objectFit: "cover" }}
                src={image}
                width={246}
                height={104}
                alt={fileName}
              />
              <div className="hidden justify-center items-center absolute top-0 left-0 w-full h-full group-hover:flex group-hover:bg-[rgba(255, 255, 255, 0.2)]">
                <button onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => setChecked(!checked)}
      >
        <input
          checked={checked}
          className="rounded"
          type="checkbox"
          onChange={() => setChecked(!checked)}
        />
        <span className="text-sm leading-5 text-[#111928] pointer-events-none">
          Crop center to fit output resolution
        </span>
      </div>
    </div>
  );
};
