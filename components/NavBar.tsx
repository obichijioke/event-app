"use client";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Menu, LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { signOutAccount } from "@/lib/appwrite/api";
import { useAuthContext } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavBar = () => {
  const { user, logout }: any = useAuthContext();
  return (
    <div className="w-full shadow-md bg-white">
      <div className="flex px-5 justify-between items-center py-3 w-full max-w-[1400px] mx-auto">
        <p className="text-black text-xl">Logo</p>
        <ul className="lg:flex gap-4 lg:gap-5 hidden ">
          <li>
            <Link href="#">Home</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
          <li>
            <Link href="#">Services</Link>
          </li>
          <li>
            <Link href="#">Contact</Link>
          </li>
        </ul>
        <div className="flex">
          <ul className="hidden lg:flex justify-end items-center gap-3">
            <li>
              <Link href="/create-event">
                <Button>
                  <CalendarDays className="mr-2" />
                  Create Event
                </Button>
              </Link>
            </li>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex gap-1 items-center">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                    <ChevronDown />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.type == "organizer" && (
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  )}
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {user == null && (
              <div className="flex gap-3 items-center">
                <Link href="/login">Log In</Link>
                <Link href="/signup">Register</Link>
              </div>
            )}
          </ul>
          <div className="flex gap-3">
            <section className="hidden md:block lg:hidden">
              <Button>
                <CalendarDays className="mr-2" />
                Create Event
              </Button>
            </section>

            <Sheet>
              <SheetTrigger>
                <Menu className="block lg:hidden" />
              </SheetTrigger>
              <SheetContent>
                <div className="p-5">
                  <div className="flex justify-center">
                    <div className="my-10 flex flex-col justify-center items-center gap-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CO</AvatarFallback>
                      </Avatar>
                      <p className="text-center">User</p>
                      <Link href="/create-event">
                        <Button>
                          <CalendarDays className="mr-2" />
                          Create Event
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-4 text-center mb-5">
                    <li>
                      <Link href="#">Home</Link>
                    </li>
                    <li>
                      <Link href="#">About</Link>
                    </li>
                    <li>
                      <Link href="#">Services</Link>
                    </li>
                    <li>
                      <Link href="#">Contact</Link>
                    </li>
                  </ul>
                  <Separator />

                  <div className="text-center flex flex-col gap-4 py-4">
                    <Link href="#">My Profile</Link>
                    <Link href="#">My Organisation</Link>
                  </div>

                  <ul className="flex justify-center gap-3 my-3 items-center">
                    <li>
                      <Link href="#">Sign In</Link>
                    </li>

                    <li>
                      <Link href="#">Sign Up</Link>
                    </li>

                    <li>
                      <Link href="#">
                        <Button onClick={() => logout()}>
                          <LogOut className="mr-2" />
                          Logout
                        </Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
