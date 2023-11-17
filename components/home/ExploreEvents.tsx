import React from "react";
import EventCard from "../EventCard";
import { Button } from "@/components/ui/button";

const ExploreEvents = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-3 py-5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
      <div className="flex justify-center py-5">
        <Button className="mt-5 p-5">See more</Button>
      </div>
    </div>
  );
};

export default ExploreEvents;
