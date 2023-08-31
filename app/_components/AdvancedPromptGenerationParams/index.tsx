import React, { useState } from "react";
import TogglableHeader from "../TogglableHeader";

const AdvancedPromptGenerationParams = () => {
  const [expand, setExpand] = useState(true);
  return (
    <>
      <TogglableHeader
        icon={`${process.env.NEXT_PUBLIC_BASE_PATH}/icons/unicorn_layers-alt.svg`}
        title={"Generation Parameters"}
        expand={expand}
        onTitleClick={() => setExpand(!expand)}
      />
    </>
  );
};

export default AdvancedPromptGenerationParams;
