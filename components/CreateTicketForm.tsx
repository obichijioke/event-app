"use client";
import React from "react";
import { ticketSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const CreateTicketForm = () => {
  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
  });

  function onSubmit(data: z.infer<typeof ticketSchema>) {
    console.log(data);
  }
  return (
    <div className="w-full py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Name</FormLabel>
                <FormControl>
                  <Input placeholder="Event Ticket Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="p-4 border border-gray-200 rounded-lg">
            <p className="font-semibold my-2 text-gray-700 py-2">
              Ticket Restrictions
            </p>
            <div className="flex justify-between">
              <p className="">Total number of tickets available</p>
              <div className="flex gap-3 items-center">
                <Switch id="ticket-available" />
                <Label htmlFor="ticket-available">Unlimited</Label>
              </div>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between">
              <p>Maximum number of tickets for each customer</p>
              <div className="flex gap-3 items-center">
                <Switch id="max-per-customer" />
                <Label htmlFor="max-per-customer">Unlimited</Label>
              </div>
            </div>
          </div>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="10" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your ticket in a few sentences."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateTicketForm;
