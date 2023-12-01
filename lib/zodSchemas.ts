import { z } from "zod";

export const FormDataSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "Zip is required"),
});

export const eventSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.string().optional(),
  venue: z.string(),
  address: z.string(),
  time: z.string(),
  duration: z.string(),
  images: z
    .array(
      z.object({
        key: z.string(),
        name: z.string(),
        serverData: z.object({
          uploadedBy: z.string(),
        }),
        size: z.number(),
        url: z.string(),
      })
    )
    .optional(),

  city: z.string(),
  state: z.string().optional(),
  country: z.string(),
  postcode: z.string(),
  category: z.string(),
  eventType: z.enum(["ONLINE_EVENT", "VENUE_EVENT", "NOT_DECIDED"]),
});

export const eventSchemaServer = z.object({
  name: z.string(),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  venue: z.string(),
  address: z.string(),
  time: z.string(),
  duration: z.string(),
  images: z
    .array(
      z.object({
        key: z.string(),
        name: z.string(),
        serverData: z.object({
          uploadedBy: z.string(),
        }),
        size: z.number(),
        url: z.string(),
      })
    )
    .optional(),

  city: z.string(),
  state: z.string().optional(),
  country: z.string(),
  postcode: z.string(),
  category: z.string(),
  eventType: z.enum(["ONLINE_EVENT", "VENUE_EVENT", "NOT_DECIDED"]),
});

export const ticketSchema = z.object({
  name: z.string(),
  eventId: z.number().optional(),
  price: z.coerce.number(), // Floats are represented as numbers in Zod
  description: z.string(),
  seatNumber: z.string().optional(),
  limitPerUser: z.number().optional(),
  type: z.enum(["SINGLE_TICKET", "GROUP_TICKET"]).optional(),
  availability: z.string().optional(),
});
