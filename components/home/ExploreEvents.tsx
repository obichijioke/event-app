import React from "react";
import EventCard from "../EventCard";

const ExploreEvents = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-3">
      <div className="grid grid-cols-4 gap-3">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};

export default ExploreEvents;
