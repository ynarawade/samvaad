export function getAvatar(userPicture: string | null, userEmial: string) {
  return userPicture ?? `https://avatar.vercel.sh/${userEmial}`;
}
