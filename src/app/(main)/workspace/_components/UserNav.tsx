"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAvatar } from "@/lib/get-avatar";
import { orpc } from "@/lib/orpc";
import {
  LogoutLink,
  PortalLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CreditCard, LogOut, Settings } from "lucide-react";

function UserNav() {
  const {
    data: { user },
  } = useSuspenseQuery(orpc.workspace.list.queryOptions());

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-12 rounded-2xl hover:rounded-xl transition-all duration-300 hover:bg-accent"
        >
          <Avatar className="size-10 rounded-xl">
            <AvatarImage
              src={getAvatar(user.picture, user.email!)}
              alt={user.given_name ?? "User"}
              className="object-cover"
            />
            <AvatarFallback className="rounded-xl text-sm font-semibold">
              {user.given_name?.slice(0, 2).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 rounded-xl"
        side="right"
        align="end"
        sideOffset={12}
      >
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex items-center gap-3">
            <Avatar className="size-10 rounded-lg">
              <AvatarImage
                src={getAvatar(user.picture, user.email!)}
                alt={user.given_name ?? "User"}
              />
              <AvatarFallback className="rounded-lg text-sm font-semibold">
                {user.given_name?.slice(0, 2).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5 flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user.given_name ?? "User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <div className="p-1">
          <DropdownMenuItem asChild className="cursor-pointer rounded-2xl">
            <PortalLink className="flex items-center gap-2">
              <Settings className="size-4" />
              <span>Account Settings</span>
            </PortalLink>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
            <PortalLink className="flex items-center gap-2">
              <CreditCard className="size-4" />
              <span>Billing</span>
            </PortalLink>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <div className="p-1">
          <DropdownMenuItem
            asChild
            className="cursor-pointer rounded-lg text-destructive focus:text-destructive focus:bg-destructive/10"
          >
            <LogoutLink className="flex items-center gap-2">
              <LogOut className="size-4" />
              <span>Log out</span>
            </LogoutLink>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;
