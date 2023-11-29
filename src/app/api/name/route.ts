import { getPortName } from "@/lib/portName";

export async function GET() {
  const name = await getPortName();

  return new Response(JSON.stringify(name));
}
