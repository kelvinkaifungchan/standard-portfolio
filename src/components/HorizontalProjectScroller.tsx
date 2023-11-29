import React, { Dispatch, SetStateAction, useRef, useEffect, useState } from "react";
import { Project } from "@/types";
import { ProjectViewer } from "./ProjectViewer";

interface HorizontalProjectScrollerProps {
  projects: Project[];
  currentProject: number;
  setCurrentProject: Dispatch<SetStateAction<number>>;
}

export const HorizontalProjectScroller: React.FC<HorizontalProjectScrollerProps> = ({
  projects,
  setCurrentProject,
  currentProject,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const projectIndex = Number(entry.target.getAttribute("data-index"));
          setCurrentProject(projectIndex);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this threshold as needed
    });

    const projectViewers = document.querySelectorAll(".project-viewer");

    projectViewers.forEach((viewer, index) => {
      observer.observe(viewer);
    });

    return () => {
      observer.disconnect();
    };
  }, [projects]);

  useEffect(() => {
    // Scroll to the current project when it changes
    const projectViewer = document.querySelector(
      `.project-viewer[data-index="${currentProject}"]`
    ) as HTMLElement | null;

    if (projectViewer) {
      projectViewer.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentProject]);

  return (
    <div className="flex overflow-x-auto horizontalScroll" ref={containerRef}>
      {projects?.map((project, index) => {
        if (project) {
          return (
            <div key={index} className="project-viewer" data-index={index}>
              <ProjectViewer data={project} />
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};
