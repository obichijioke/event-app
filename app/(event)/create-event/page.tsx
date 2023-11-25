"use client";
import { Separator } from "@/components/ui/separator";
import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

import { Check, ChevronsDown, Calendar as CalendarIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

interface ImageResponse {
  key: string;
  name: string;
  serverData: {
    uploadedBy: string;
  };
  size: number;
  url: string;
}

const CreateEventPage = () => {
  const { register, handleSubmit, control } = useForm();
  const [open, setOpen] = useState<boolean>(false);
  const [countryOpen, countrySetOpen] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [date, setDate] = useState<Date>();
  const [images, setImages] = useState<ImageResponse[]>([]);
  return (
    <div className="w-full px-5 lg:w-[700px] mx-auto border border-gray-200 my-10 rounded-lg">
      <h2 className="py-5 font-semibold">Details</h2>
      <Separator />
      <form
        className="py-4"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <div className="py-6">
          <Label className="font-semibold text-gray-600" htmlFor="name">
            Give your event a name.*
          </Label>
          <p className="text-xs text-gray-500 my-3">
            See how your name appears on the event page and a list of all places
            where your event name will be used. Learn more
          </p>
          <Input
            {...register("name")}
            name="name"
            placeholder="Enter event name here"
          />
        </div>
        <Separator />
        <div className="py-5">
          <Label className="font-semibold text-gray-600" htmlFor="name">
            Choose a category for your event.*
          </Label>
          <p className="text-xs text-gray-500 my-3">
            Choosing relevant categories helps to improve the discoverability of
            your event. Learn more
          </p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between py-6"
              >
                {value
                  ? frameworks.find((framework) => framework.value === value)
                      ?.label
                  : "Select a category"}
                <ChevronsDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="lg:w-[600px] p-0">
              <Command className="w-full">
                <CommandInput placeholder="Search Category..." />
                <CommandEmpty>No Category found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      className="w-full"
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === framework.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Separator />
        <div className="py-6">
          <Label className="font-semibold text-gray-600" htmlFor="name">
            When is your event?*
          </Label>
          <p className="text-xs text-gray-500 my-3">
            Tell your attendees when your event starts so they can get ready to
            attend.
          </p>
          <div className="flex gap-1">
            <div className="w-1/2">
              <Label className="font-medium text-gray-600" htmlFor="name">
                Event Date.*
              </Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-1/2 flex gap-1">
              <div className="w-1/2">
                <Label className="font-medium text-gray-600" htmlFor="name">
                  Time
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/2">
                <Label className="font-medium text-gray-600" htmlFor="name">
                  Duration
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Hour" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="py-5">
          <Label className="font-semibold text-gray-600" htmlFor="name">
            Add a few images to your event banner.
          </Label>
          <p className="text-xs text-gray-500 my-3">
            Upload colorful and vibrant images as the banner for your event! See
            how beautiful images help your event details page. Learn more
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
          <Label className="font-semibold text-gray-600" htmlFor="name">
            Please describe your event.
          </Label>
          <p className="text-xs text-gray-500 my-3">
            Write a few words below to describe your event and provide any extra
            information such as schedules, itinerary or any special instructions
            required to attend your event.
          </p>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Event description" {...field} />
            )}
          />
        </div>
        <div className="py-6">
          <Label className="font-semibold text-gray-600" htmlFor="name">
            Where is your event taking place? *
          </Label>
          <p className="text-xs text-gray-500 my-3">
            Add a venue to your event to tell your attendees where to join the
            event.
          </p>
          <div className="py-3">
            <Label className="font-medium text-gray-600 pt-4" htmlFor="name">
              Venue*
            </Label>
            <Input
              {...register("venue")}
              name="venue"
              placeholder="Enter event venue"
            />
          </div>

          <div className="py-3">
            <div className="w-full">
              <Label className="font-medium text-gray-600" htmlFor="name">
                Address.*
              </Label>
              <Input
                {...register("address")}
                name="address"
                placeholder="Enter event Address"
              />
            </div>
          </div>
          <div className="flex gap-1 py-3">
            <div className="w-1/2">
              <Label className="font-medium text-gray-600" htmlFor="name">
                Country*
              </Label>
              <Popover open={countryOpen} onOpenChange={countrySetOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {value
                      ? frameworks.find(
                          (framework) => framework.value === value
                        )?.label
                      : "Select a category"}
                    <ChevronsDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="lg:w-[250px] p-0">
                  <Command className="w-full">
                    <CommandInput placeholder="Search Category..." />
                    <CommandEmpty>No Category found.</CommandEmpty>
                    <CommandGroup>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          className="w-full"
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-1/2">
              <Label className="font-medium text-gray-600" htmlFor="name">
                State.*
              </Label>
              <Input
                {...register("state")}
                name="state"
                placeholder="Enter event state"
              />
            </div>
          </div>
          <div className="flex gap-1 py-3">
            <div className="w-1/2">
              <Label className="font-medium text-gray-600" htmlFor="name">
                City.*
              </Label>
              <Input
                {...register("city")}
                name="city"
                placeholder="Enter event city"
              />
            </div>
            <div className="w-1/2">
              <Label className="font-medium text-gray-600" htmlFor="name">
                Zip/Postcode.*
              </Label>
              <Input
                {...register("postalCode")}
                name="postalCode"
                placeholder="Enter postcode"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="px-6">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventPage;
