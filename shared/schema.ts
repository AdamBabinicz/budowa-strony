import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  project: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  project: string;
  message: string;
  createdAt: Date;
}

export type InsertContactSubmission = Omit<ContactSubmission, 'id' | 'createdAt'>;
