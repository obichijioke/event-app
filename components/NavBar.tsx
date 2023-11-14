import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavBar = () => {
  return (
    <div className="flex px-5 justify-between items-center py-3">
      <p className="text-black text-xl">Logo</p>
      <ul className="flex gap-3">
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
      </ul>
      <ul className="flex justify-end items-center gap-3">
        <li>
          <Button>Create Event</Button>
        </li>
        <li>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </li>
        <li>Sign In</li>
        <li>Sign Up</li>
      </ul>
    </div>
  );
};

export default NavBar;
