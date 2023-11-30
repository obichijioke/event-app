import { z } from "zod";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { eventSchemaServer } from "@/lib/zodSchemas";

export async function POST(request: Request) {
  const data = await request.json();
  const validation = eventSchemaServer.safeParse(data);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  return NextResponse.json(data);
}
