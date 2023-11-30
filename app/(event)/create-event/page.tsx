"use client"
import { useState } from "react";
import CreateEventForm from "@/components/CreateEventForm";
import Tickets from "@/components/Tickets";
const CreateEventPage = () => {
  const [activeTab, setActiveTab] = useState(2);
  return (
    <div className="w-full px-5 lg:w-[700px] bg-white mx-auto border border-gray-200 my-10 rounded-lg">
      {activeTab == 2 &&<Tickets/>}
      {activeTab == 1 && <CreateEventForm />}
    </div>
  );
};

export default CreateEventPage;
