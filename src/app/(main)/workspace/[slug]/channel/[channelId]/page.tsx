import ChannelHeader from "@/app/(main)/workspace/[slug]/channel/[channelId]/_components/ChannelHeader";
import MessageInput from "@/app/(main)/workspace/[slug]/channel/[channelId]/_components/message/MessageInput";
import MessageList from "@/app/(main)/workspace/[slug]/channel/[channelId]/_components/MessageList";

function ChannelsPage() {
  return (
    <div className="flex w-full h-screen">
      {/* Mian channel area  */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* fixed header */}
        <ChannelHeader />
        {/* Scrollable Msg Area */}
        <div className="flex-1 overflow-hidden mb-4">
          <MessageList />
        </div>
        {/* Fixed message Input  */}
        <div className="border-t bg-background p-4">
          <MessageInput />
        </div>
      </div>
    </div>
  );
}

export default ChannelsPage;
