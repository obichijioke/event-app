"use client";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Menu, LogOut } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavBar = () => {
  const { status, data: session } = useSession();

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
            {status === "authenticated" && (
              <li>
                <Link href="/create-event">
                  <Button>
                    <CalendarDays className="mr-2" />
                    Create Event
                  </Button>
                </Link>
              </li>
            )}
            {status === "authenticated" && (
              <li>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CO</AvatarFallback>
                </Avatar>
              </li>
            )}
            {status === "unauthenticated" && (
              <li>
                <Link href="#">Sign In</Link>
              </li>
            )}
            {status === "unauthenticated" && (
              <li>
                <Link href="#">Sign Up</Link>
              </li>
            )}
          </ul>
          <div className="flex gap-3">
            {status === "authenticated" && (
              <section className="hidden md:block lg:hidden">
                <Button>
                  <CalendarDays className="mr-2" />
                  Create Event
                </Button>
              </section>
            )}

            <Sheet>
              <SheetTrigger>
                <Menu className="block lg:hidden" />
              </SheetTrigger>
              <SheetContent>
                <div className="p-5">
                  <div className="flex justify-center">
                    {status === "authenticated" && (
                      <div className="my-10 flex flex-col justify-center items-center gap-2">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CO</AvatarFallback>
                        </Avatar>
                        <p className="text-center">{session.user!.name}</p>
                        <Link href="/create-event">
                          <Button>
                            <CalendarDays className="mr-2" />
                            Create Event
                          </Button>
                        </Link>
                      </div>
                    )}
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
                  {status === "authenticated" && (
                    <div className="text-center flex flex-col gap-4 py-4">
                      <Link href="#">My Profile</Link>
                      <Link href="#">My Organisation</Link>
                    </div>
                  )}

                  <ul className="flex justify-center gap-3 my-3 items-center">
                    {status === "unauthenticated" && (
                      <li>
                        <Link href="#">Sign In</Link>
                      </li>
                    )}
                    {status === "unauthenticated" && (
                      <li>
                        <Link href="#">Sign Up</Link>
                      </li>
                    )}

                    {status === "authenticated" && (
                      <li>
                        <Link href="#">
                          <Button>
                            <LogOut className="mr-2" />
                            Logout
                          </Button>
                        </Link>
                      </li>
                    )}
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
