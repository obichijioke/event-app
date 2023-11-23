import { z } from "zod";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Define a schema for location
const locationSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string().optional(),
  country: z.string(),
  postalCode: z.string(),
});

// Define a schema for event data validation
const eventSchema = z.object({
  organizerId: z.string(),
  name: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  location: locationSchema,
  category: z.string(),
  eventType: z.enum(["ONLINE_EVENT", "VENUE_EVENT", "NOT_DECIDED"]),
});

export async function POST(resquest: Request) {
  // Validate the request body against the event schema
  const eventData = eventSchema.parse(resquest.body);

  // Create a new event using Prisma Client
  const newEvent = await prisma.event.create({
    data: {
      organizerId: eventData.organizerId,
      name: eventData.name!,
      description: eventData.description!,
      startDate: new Date(eventData.startDate),
      endDate: new Date(eventData.endDate),
      location: eventData.location, // Now an object
      category: eventData.category!,
      eventType: eventData.eventType,
    },
  });
}
