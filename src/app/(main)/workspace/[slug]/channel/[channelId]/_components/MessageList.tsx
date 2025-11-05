import MessageItem from "@/app/(main)/workspace/[slug]/channel/[channelId]/_components/message/MessageItem";

const messages = [
  {
    id: 1,
    message:
      "Hey everyone, just pushed the new auth flow 🚀. Can someone test it out?",
    date: new Date("2025-11-05T10:12:00"),
    avatar: "https://avatars.githubusercontent.com/u/142681172?v=4",
    userName: "Jan Marshal",
  },
  {
    id: 2,
    message:
      "Nice! Logging in works fine, but the redirect after signup feels a bit slow.",
    date: new Date("2025-11-05T10:14:00"),
    avatar: "https://avatars.githubusercontent.com/u/142681172?v=4",
    userName: "Riya Patel",
  },
  {
    id: 3,
    message:
      "Good catch, Riya. That’s probably because of the `useEffect` dependency issue. I’ll patch it.",
    date: new Date("2025-11-05T10:16:00"),
    avatar: "https://avatars.githubusercontent.com/u/142681172?v=4",
    userName: "Arjun Mehta",
  },
  {
    id: 4,
    message:
      "Also, do we have a plan for dark mode? The dashboard looks kinda bright 🕶️",
    date: new Date("2025-11-05T10:18:00"),
    avatar: "https://avatars.githubusercontent.com/u/142681172?v=4",
    userName: "Riya Patel",
  },
  {
    id: 5,
    message: "Haha true! Let’s add it after finishing the notification module.",
    date: new Date("2025-11-05T10:19:30"),
    avatar: "https://avatars.githubusercontent.com/u/142681172?v=4",
    userName: "Jan Marshal",
  },
  {
    id: 6,
    message:
      "By the way, the new channel creation feature is working perfectly on staging ✅",
    date: new Date("2025-11-05T10:22:00"),
    avatar: "https://avatars.githubusercontent.com/u/142681172?v=4",
    userName: "Arjun Mehta",
  },
  {
    id: 7,
    message: "Awesome! Let’s do a quick team review after lunch?",
    date: new Date("2025-11-05T10:25:00"),
    avatar: "https://avatars.githubusercontent.com/u/142681172?v=4",
    userName: "Jan Marshal",
  },
];

function MessageList() {
  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto px-4">
        {messages.map((msg) => (
          <MessageItem key={msg.id} {...msg} />
        ))}
      </div>
    </div>
  );
}

export default MessageList;
