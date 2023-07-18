import {
  Frame1,
  MessageIcon,
  BrainIcon,
  DiscordIcon,
  AvararIcon,
} from "@/assets";

const Header: React.FC = () => {
  return (
    <div className="flex flex-row justify-between px-6 py-4 border-b-[1px] border-[#e5e7eb]">
      <div className="flex gap-5">
        <div className="flex items-center gap-3">
          <Frame1 />
          <span>jan</span>
        </div>
        <div className="flex items-center gap-3">
          <MessageIcon />
          <span>chat</span>
        </div>
        <div className="flex items-center gap-3">
          <BrainIcon />
          <span>AIs</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-2">
          <DiscordIcon />
        </div>
        <button className="flex items-center gap-4 pl-3">
          <AvararIcon />
          Engerraund Serac
        </button>
      </div>
    </div>
  );
};

export default Header;
