import React, { useState } from "react";
import TogglableHeader from "../TogglableHeader";
import { AdvancedTextArea } from "../AdvancedTextArea";

const AdvancedPromptText: React.FC = () => {
  const [expand, setExpand] = useState(true);

  return (
    <>
      <TogglableHeader
        icon={"/icons/messicon.svg"}
        title={"Prompt"}
        expand={expand}
        onTitleClick={() => setExpand(!expand)}
      />
      <div className={`${expand ? "flex" : "hidden"} flex-col gap-[5px]`}>
        <AdvancedTextArea height={80} placeholder="Prompt" title="Prompt" />
        <AdvancedTextArea
          height={80}
          placeholder="Describe what you don't want in your image"
          title="Negative Prompt"
        />
      </div>
    </>
  );
};

export default AdvancedPromptText;
