import { Frame1 } from "@/assets";

export default function Footer() {
  return (
    <div className="flex items-center justify-between container m-auto">
      <div className="flex items-center gap-3">
        <Frame1 />
        <span>Jan</span>
      </div>
      <div className="flex gap-4 my-6">
        <span>Privacy</span>
        <span>&#8226;</span>
        <span>Support</span>
      </div>
    </div>
  );
}
