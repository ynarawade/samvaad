import { ThemeToogle } from "@/components/ui/theme-toggle";

function ChannelHeader() {
  return (
    <div className="flex items-center justify-between h-14 px-4 border-b">
      <h1 className="text-lg font-semibold"># welcome-channel</h1>
      <div className="flex items-center space-x-2">
        <ThemeToogle />
      </div>
    </div>
  );
}

export default ChannelHeader;
