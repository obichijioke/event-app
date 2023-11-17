import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <div className="w-full py-5 bg-gray-900 text-gray-200">
      <section className="w-full max-w-[1400px] mx-auto py-5 grid grid-cols-2 lg:grid-cols-4 px-5">
        <div>
          <p className="font-semibold">Company</p>
          <ul className="flex flex-col gap-2 py-4 text-sm">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Useful Links</p>
          <ul className="flex flex-col gap-2 py-4 text-sm">
            <li>Create Event</li>
            <li>Sell Tickets Online</li>
            <li>Privacy Policy</li>
            <li>Terms & Condition</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Resources</p>
          <ul className="flex flex-col gap-2 py-4 text-sm">
            <li>Pricing</li>
            <li>Blog</li>
            <li>Refer a Friend</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Follow Us</p>
          <ul className="flex gap-3 py-5">
            <li>
              <Facebook />
            </li>
            <li>
              <Instagram />
            </li>
            <li>
              <Twitter />
            </li>
            <li>
              <Linkedin />
            </li>
            <li>
              <Youtube />
            </li>
          </ul>
          <p className="font-semibold">Download Mobile App</p>
          <ul className="flex gap-3 py-2">
            <li>
              <Image
                src="/images/app-store.png"
                width={150}
                height={50}
                alt="app-store"
              />
            </li>
            <li>
              <Image
                src="/images/google-play.png"
                width={150}
                height={50}
                alt="play-store"
              />
            </li>
          </ul>
        </div>
      </section>
      <Separator className=" w-[90%] mx-auto bg-slate-500" />
      <section className="w-full max-w-[1400px] mx-auto py-5 px-5">
        <p className="text-center text-gray-600">
          © 2021 Eventure. All rights reserved.
        </p>
      </section>
    </div>
  );
};

export default Footer;
