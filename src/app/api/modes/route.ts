import { NextResponse } from "next/server";

export async function GET() {
  const modes = [
    { id: 1, name: "Men's Doubles" },
    { id: 2, name: "Women's Doubles" },
    { id: 3, name: "Mixed Doubles" },
  ];
  return NextResponse.json({ data: modes }, { status: 200 });
}
