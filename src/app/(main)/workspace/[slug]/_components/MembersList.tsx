import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

const members = [
  {
    id: "1",
    name: "Jon Fisher",
    imageUrl: "https://avatars.githubusercontent.com/u/142681172?v=4",
    email: "jon.fisher@company.com",
  },
  {
    id: "2",
    name: "Emily Carter",
    imageUrl: "https://avatars.githubusercontent.com/u/142681172?v=4",
    email: "emily.carter@company.com",
  },
  {
    id: "3",
    name: "Raj Mehta",
    imageUrl: "https://avatars.githubusercontent.com/u/142681172?v=4",
    email: "raj.mehta@company.com",
  },
  {
    id: "4",
    name: "Sara Kim",
    imageUrl: "https://avatars.githubusercontent.com/u/142681172?v=4",
    email: "sara.kim@company.com",
  },
  {
    id: "5",
    name: "Lucas Nguyen",
    imageUrl: "https://avatars.githubusercontent.com/u/142681172?v=4",
    email: "lucas.nguyen@company.com",
  },
  {
    id: "6",
    name: "Aisha Patel",
    imageUrl: "https://avatars.githubusercontent.com/u/142681172?v=4",
    email: "aisha.patel@company.com",
  },
  {
    id: "7",
    name: "Michael Chen",
    imageUrl: "https://avatars.githubusercontent.com/u/142681172?v=4",
    email: "michael.chen@company.com",
  },
  {
    id: "8",
    name: "Grace Thompson",
    imageUrl: "https://avatars.githubusercontent.com/u/142681172?v=4",
    email: "grace.thompson@company.com",
  },
  {
    id: "9",
    name: "Daniel Brooks",
    imageUrl: "https://avatars.githubusercontent.com/u/142681172?v=4",
    email: "daniel.brooks@company.com",
  },
  {
    id: "10",
    name: "Nina Lopez",
    imageUrl: "https://avatars.githubusercontent.com/u/142681172?v=4",
    email: "nina.lopez@company.com",
  },
];

function MembersList() {
  return (
    <div className="space-y-0.5 py-1">
      {members.map((member) => {
        return (
          <div
            key={member.id}
            className="flex items-center px-3 py-2 hover:bg-accent cursor-pointer transition-colors space-x-3"
          >
            <div className="relative">
              <Avatar className="size-8 relative">
                <Image
                  src={member.imageUrl}
                  alt="user image"
                  fill
                  className="object-cover"
                />
                <AvatarFallback>
                  {member.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{member.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {member.email}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MembersList;
