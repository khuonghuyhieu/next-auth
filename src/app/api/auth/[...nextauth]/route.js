// Read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = await getToken({ req });
  return NextResponse.json(token);
}
