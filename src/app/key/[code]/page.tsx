import { getProjects } from "@/lib/project";

import { ProjectConsole } from "@/components/ProjectConsole";
import { Project } from "@/types";
import { getPortName } from "@/lib/portName";

export default async function Access({ params }: { params: { code: string } }) {
  try {
    const projects = await getProjects(params.code);
    const name = await getPortName()
    const ts: Project[] = projects
    .map((project) => {
      if (project) {
        return {
          name: project.name,
          date: project.date,
          description: project.description,
          location: project.location,
          contentHtml: project.contentHtml,
          media: project.media,
        };
      }
      return null; // explicitly return null for projects that are undefined
    })
    .filter(Boolean) as Project[]; // filter out null values
  
    return <ProjectConsole projects={ts} name={name}/>;
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error here, e.g., display an error message to the user.
    return (
      <div className="h-full w-full font-light p-5">
        An error occured accessing the portfolio. Please return and try again.
      </div>
    );
  }
}
