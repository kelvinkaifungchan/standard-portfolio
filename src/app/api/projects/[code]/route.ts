import { getProjects } from "@/lib/project";

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
    const project = await getProjects(params.code);

    return new Response(JSON.stringify(project));
}
