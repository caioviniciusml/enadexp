import { UserRole } from "@/enums/enums";
import { z } from "zod/v4";

export const UserSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  role: z.enum(UserRole),
  createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
