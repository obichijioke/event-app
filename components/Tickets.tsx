import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import TicketCard from "@/components/TicketCard";
import CreateTicketForm from "./CreateTicketForm";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Tickets = () => {
  return (
    <div className="w-full space-y-5 pb-5">
      <h2 className="pt-5 font-semibold">Tickets</h2>
      <Separator />
      <div>
        <h3 className=" text-base font-semibold">Let&apos;s create tickets!</h3>
        <p className="text-sm my-2">
          Create tickets for your event by clicking on the &apos;Add
          Tickets&apos; button below.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">Tickets (3)</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="p-3">Add Tickets</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create Ticket</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Separator />
            <CreateTicketForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4 w-full">
        <TicketCard />
      </div>
    </div>
  );
};

export default Tickets;
