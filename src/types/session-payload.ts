import { UserRole } from "@/enums/enums";
import { z } from "zod/v4";

export const SessionPayloadSchema = z.object({
  userData: z.object({
    id: z.uuid(),
    createdAt: z.string(),
    name: z.string(),
    email: z.email(),
    role: z.enum(UserRole),
  }),
  iat: z.number().optional(),
  exp: z.number().optional(),
});

export type SessionPayload = z.infer<typeof SessionPayloadSchema>;
