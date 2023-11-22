import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Define a schema for location
const locationSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
});

// Define a schema for event data validation
const eventSchema = z.object({
  organizerId: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  location: locationSchema,
  category: z.string().optional(),
  eventType: z.enum(["ONLINE_EVENT", "VENUE_EVENT", "NOT_DECIDED"]),
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Validate the request body against the event schema
      const eventData = eventSchema.parse(req.body);

      // Create a new event using Prisma Client
      const newEvent = await prisma.event.create({
        data: {
          organizerId: eventData.organizerId,
          name: eventData.name,
          description: eventData.description,
          startDate: new Date(eventData.startDate),
          endDate: new Date(eventData.endDate),
          location: eventData.location, // Now an object
          category: eventData.category,
          eventType: eventData.eventType,
        },
      });

      // Send the created event as a response
      res.status(200).json(newEvent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Return a 400 Bad Request error if validation fails
        return res.status(400).json({ error: error.errors });
      }

      // Handle other errors
      res.status(500).json({ error: "Error creating event: " + error.message });
    }
  } else {
    // Handle non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
