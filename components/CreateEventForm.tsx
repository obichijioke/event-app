"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Input } from "./ui/input";
import { eventSchema } from "@/lib/zodSchemas";
import { Check, ChevronsUpDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { UploadDropzone } from "@/lib/uploadthing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FormSchema = z.object({
  username: z.string({
    required_error: "A username is required.",
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  email: z.string({
    required_error: "An email is required.",
  }),
});

interface ImageResponse {
  key: string;
  name: string;
  serverData: {
    uploadedBy: string;
  };
  size: number;
  url: string;
}

export default function CreateEventForm() {
  const [images, setImages] = useState<ImageResponse[]>([]);
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
  });

  function onSubmit(data: z.infer<typeof eventSchema>) {
    console.log(data);
  }

  return (
    <div className="w-full">
      <h2 className="py-5 font-semibold">Details</h2>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="py-6">name</div>
          <Separator />
          <div className="py-5">category</div>
          <Separator />
          <div className="py-6">
            <p className="font-semibold text-gray-600">When is your event?*</p>
            <p className="text-xs text-gray-500 my-3">
              Tell your attendees when your event starts so they can get ready
              to attend.
            </p>
            <div className="flex gap-1">
              <div className="w-1/2">date</div>
              <div className="w-1/2 flex gap-1">
                <div className="w-1/2">time</div>
                <div className="w-1/2">duration</div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="py-5">
            <p className="font-semibold text-gray-600">
              Add a few images to your event banner.
            </p>
            <p className="text-xs text-gray-500 my-3">
              Upload colorful and vibrant images as the banner for your event!
              See how beautiful images help your event details page. Learn more
            </p>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log(`onClientUploadComplete`, res);
                setImages((prev) => [...prev, ...res]);
              }}
              onUploadBegin={() => {
                console.log("upload begin");
              }}
              className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
            />
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 overflow-hidden p-2 gap-2">
              {images.length > 0 &&
                images.map((image) => (
                  <img
                    key={image.key}
                    className="w-full rounded-lg my-2 h-[120px] object-cover"
                    src={image.url}
                    alt={image.key}
                  />
                ))}
            </div>
          </div>
          <Separator />
          <div className="py-5">
            <p className="font-semibold text-gray-600">
              Please describe your event.
            </p>
            <p className="text-xs text-gray-500 my-3">
              Write a few words below to describe your event and provide any
              extra information such as schedules, itinerary or any special
              instructions required to attend your event.
            </p>
            <Controller
              name="description"
              control={form.control}
              render={({ field }) => (
                <SimpleMDE placeholder="Event description" {...field} />
              )}
            />
          </div>
          <div className="py-6">
            <p className="font-semibold text-gray-600">
              Where is your event taking place? *
            </p>
            <p className="text-xs text-gray-500 my-3">
              Add a venue to your event to tell your attendees where to join the
              event.
            </p>
            <div className="py-3">venue</div>

            <div className="py-3">
              <div className="w-full">address</div>
            </div>
            <div className="flex gap-1 py-3">
              <div className="w-1/2">country</div>
              <div className="w-1/2">state</div>
            </div>
            <div className="flex gap-1 py-3">
              <div className="w-1/2">city</div>
              <div className="w-1/2">postcode</div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="px-6">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
