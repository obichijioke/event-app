/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import axios from "axios";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import "easymde/dist/easymde.min.css";
import { timeIntervals, duration, countries } from "@/lib/constants";
import { UploadDropzone } from "@/lib/uploadthing";
import { useSession } from "next-auth/react";
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

const categories = [
  {
    label: "Music",
    value: "Music",
  },
  {
    label: "Theater and Performing Arts",
    value: "Theater and Performing Arts",
  },
  {
    label: "Food and Drink",
    value: "Food and Drink",
  },
  {
    label: "Sports and Fitness",
    value: "Sports and Fitness",
  },
  {
    label: "Business and Professional",
    value: "Business and Professional",
  },
  {
    label: "Health and Wellness",
    value: "Health and Wellness",
  },
  {
    label: "Nightlife",
    value: "Nightlife",
  },
  {
    label: "Family and Kids' Events",
    value: "Family and Kids' Events",
  },
];
const event_types = [
  {
    label: "Online",
    value: "ONLINE_EVENT",
  },
  {
    label: "Venue",
    value: "VENUE_EVENT",
  },
  {
    label: "Not decided",
    value: "NOT_DECIDED",
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

export default function CreateEventForm() {
  const { status, data: session } = useSession();
  const [images, setImages] = useState<ImageResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
  });

  if (status === "loading") return <div>Loading...</div>;

  async function onSubmit(data: z.infer<typeof eventSchema>) {
    // const formData = new FormData();
    // for (var key in data) {
    //   formData.append(key, data[key]);
    // }
    // formData.append("organizerId", session?.user?.id);
    try {
      const res = await axios.post("/api/create-event", {
        ...data,
        organizerId: session?.user?.id,
      });
      console.log(res);
    } catch (error) {}
    //console.log(data);
  }

  return (
    <div className="w-full py-5">
      <h2 className="py-5 font-semibold">Details</h2>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="pt-6">
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose Event Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Event Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {event_types &&
                        event_types.map((eventType) => (
                          <SelectItem
                            key={eventType.value}
                            value={eventType.value}
                          >
                            {eventType.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choosing relevant event type helps to improve the
                    discoverability of your event.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Give you event a name* </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event name" {...field} />
                  </FormControl>
                  <FormDescription>
                    See how your name appears on the event page and a list of
                    all places where your event name will be used.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose a category for your event.*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories &&
                        categories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choosing relevant categories helps to improve the
                    discoverability of your event.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div>
            <p className="font-semibold text-gray-600">When is your event?*</p>
            <p className="text-xs text-gray-500 my-3">
              Tell your attendees when your event starts so they can get ready
              to attend.
            </p>
            <div className="flex gap-1">
              <div className="w-1/2 pt-[10px]">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Event Date.*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "px-2 text-left font-normal mt-2",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2 flex gap-1">
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="text-muted-foreground">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeIntervals &&
                              timeIntervals.map((interval) => (
                                <SelectItem
                                  key={interval.value}
                                  value={interval.value}
                                >
                                  {interval.label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="text-muted-foreground">
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {duration &&
                              duration.map((duration) => (
                                <SelectItem
                                  key={duration.value}
                                  value={duration.value}
                                >
                                  {duration.label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <p className="font-semibold text-gray-600">
              Add a few images to your event banner.
            </p>
            <p className="text-xs text-gray-500 my-3">
              Upload colorful and vibrant images as the banner for your event!
              See how beautiful images help your event details page.
            </p>
            <Controller
              name="images"
              control={form.control}
              render={({ field }) => (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    //console.log(`onClientUploadComplete`, res);
                    form.setValue("images", [...images, ...res]);
                    setImages((prev) => [...prev, ...res]);
                  }}
                  onUploadBegin={() => {
                    console.log("upload begin");
                  }}
                  className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
                />
              )}
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
          <div>
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please describe your event. </FormLabel>
                    <FormDescription>
                      Write a few words below to describe your event and provide
                      any extra information such as schedules, itinerary or any
                      special instructions required to attend your event.
                    </FormDescription>
                    <FormControl>
                      <SimpleMDE placeholder="Event description" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div>
            <p className="font-semibold text-gray-600">
              Where is your event taking place? *
            </p>
            <p className="text-xs text-gray-500 my-3">
              Add a venue to your event to tell your attendees where to join the
              event.
            </p>
            <div className="py-3">
              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event venue" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="py-3">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address line</FormLabel>
                      <FormControl>
                        <Input placeholder="address" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-1 py-3">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-[10px]">
                      <FormLabel>Country</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                " justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? countries.find(
                                    (country) => country.value === field.value
                                  )?.label
                                : "Select country"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandEmpty>No country found.</CommandEmpty>

                            <CommandGroup>
                              <ScrollArea className="h-72 w-full rounded-md border">
                                {countries.map((country) => (
                                  <CommandItem
                                    value={country.label}
                                    key={country.value}
                                    onSelect={() => {
                                      form.setValue("country", country.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        country.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {country.label}
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="state" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-1 py-3">
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="city" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="postcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postcode</FormLabel>
                      <FormControl>
                        <Input placeholder="Postcode" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="px-6" type="submit">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
