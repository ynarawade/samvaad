import Image from "next/image";

interface MessageItemProps {
  id: number;
  message: string;
  date: Date;
  avatar: string;
  userName: string;
}

function MessageItem({
  avatar,
  id,
  userName,
  date,
  message,
}: MessageItemProps) {
  return (
    <div className="flex gap-3 px-4 py-2 hover:bg-accent/50 rounded-2xl transition-colors group cursor-pointer">
      <Image
        src={avatar}
        alt="user avatar"
        width={40}
        height={40}
        className="size-10 rounded-lg object-cover shrink-0"
      />
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-baseline gap-2">
          <p className="font-medium text-sm">{userName}</p>
          <p className="text-xs text-muted-foreground">
            {new Intl.DateTimeFormat("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }).format(date)}
            {" at "}
            {new Intl.DateTimeFormat("en-IN", {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
            }).format(date)}
          </p>
        </div>
        <p className="text-sm wrap-break-word leading-relaxed">{message}</p>
      </div>
    </div>
  );
}

export default MessageItem;
