import { observer } from "mobx-react-lite";
import AdvancedPromptText from "../AdvancedPromptText";
import AdvancedPromptImageUpload from "../AdvancedPromptImageUpload";
import AdvancedPromptResolution from "../AdvancedPromptResolution";
import AdvancedPromptGenerationParams from "../AdvancedPromptGenerationParams";

export const MenuAdvancedPrompt: React.FC = observer(() => {
  return (
    <div className="flex flex-col">
      <AdvancedPromptText />
      <hr className="my-5" />
      <AdvancedPromptImageUpload />
      <hr className="my-5" />
      <AdvancedPromptResolution />
      <hr className="my-5" />
      <AdvancedPromptGenerationParams />
    </div>
  );
});
