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
  organizerId: z.string(),
  name: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  address: z.string(),
  time: z.string(),
  duration: z.string(),
  city: z.string(),
  state: z.string().optional(),
  country: z.string(),
  postalCode: z.string(),
  category: z.string(),
  eventType: z.enum(["ONLINE_EVENT", "VENUE_EVENT", "NOT_DECIDED"]),
});
