import React from "react";
import Image from "next/image";

const EventCard = () => {
  return (
    <div className="w-full rounded-xl overflow-hidden hover:shadow-lg">
      <Image
        className="w-full cursor-pointer"
        src="/images/event.jpg"
        alt="event image"
        height={250}
        width={250}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold cursor-pointer">A new way of life</h3>
        <div className="flex justify-between mt-5">
          <p className="font-semibold">AUD $100.00</p>
          <p className="text-gray-600">7 remaining</p>
        </div>
      </div>
      <div className="bg-gray-100 p-4 flex justify-between w-full font-medium text-gray-600">
        <p>15 Apr | Fri, 3.45 PM</p>
        <p>1h</p>
      </div>
    </div>
  );
};

export default EventCard;
