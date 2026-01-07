"use server";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types/user";
import { SessionPayload, SessionPayloadSchema } from "@/types/session-payload";

const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

export async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 week from now")
    .sign(secretKey);
}

export async function decrypt(input: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(input, secretKey, {
      algorithms: ["HS256"],
    });

    const result = SessionPayloadSchema.safeParse(payload);

    if (!result.success) return null;

    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function login(userData: User) {
  const cookieStore = await cookies();
  const session = await encrypt({ userData });

  cookieStore.set("session", session, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.set("session", "", { expires: new Date(0) });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return null;

  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  if (!parsed) return;

  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return res;
}
