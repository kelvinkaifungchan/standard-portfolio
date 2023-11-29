import { getProjectData } from "@/lib/project";

export async function GET(
  req: Request,
  { params }: { params: { project: string, code: string } }
) {
  const project = await getProjectData(params.code, params.project);

  return new Response(JSON.stringify(project));
}
