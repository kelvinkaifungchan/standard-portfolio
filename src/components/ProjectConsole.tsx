"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { HorizontalLine } from "@/components/HorizontalLine";
import { Markdown } from "@/components/Markdown";
import { Project } from "@/types";
import { HorizontalProjectScroller } from "./HorizontalProjectScroller";
import { AnimatePresence } from "framer-motion";

interface ProjectConsoleProps {
  projects: Project[];
  name: string | undefined;
  portfolioName: string | undefined;
}

export const ProjectConsole: React.FC<ProjectConsoleProps> = ({
  projects,
  name,
  portfolioName,
}) => {
  const [currentProject, setCurrentProject] = useState(0);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Callback ref to store a reference to each project element
  const setProjectRef = (index: number) => (el: HTMLDivElement | null) => {
    projectRefs.current[index] = el;
  };

  useEffect(() => {
    const targetElement = projectRefs.current[currentProject];
    if (targetElement) {
      // Delay the scroll effect by 500 milliseconds (adjust the duration as needed)
      const timeoutId = setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 1000);

      // Clear the timeout if the component unmounts or the effect runs again
      return () => clearTimeout(timeoutId);
    }
  }, [currentProject]);

  return (
    <>
      <main className="flex h-full w-full font-light overflow-y-hidden overflow-x-hidden">
        <div className="w-full h-full flex flex-col min-w-[30vw] w-[30vw]">
          <div className="text-xl p-5 border-r border-[#FFFFFF55]">
            {name} ({portfolioName})
          </div>
          <HorizontalLine />
          <div className="pr-5 p-5 space-y-3 border-r border-[#FFFFFF55] h-full overflow-x-hidden overflow-y-auto customScroll">
            <div>
              <div className="italic text-xl mb-2">Projects</div>
            </div>
            {projects?.map((project, index) => {
              if (project) {
                return (
                  <>
                    <div
                      key={index}
                      ref={setProjectRef(index)}
                      className={`${
                        index == currentProject
                          ? "opacity-100"
                          : "opacity-50 hover:opacity-100"
                      } duration-150
                          hover:cursor-pointer text-xl
                        `}
                      onClick={() => {
                        setCurrentProject(index);
                      }}>
                      {project.name}
                    </div>
                    <AnimatePresence initial={false}>
                      {index == currentProject ? (
                        <motion.div
                          key={index}
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: {
                              opacity: 1,
                              height: "auto",
                              transition: { duration: 0.5 },
                            },
                            collapsed: { opacity: 0, height: 0 },
                          }}
                          transition={{
                            duration: 0.5,
                            delayChildren: 0.2, // Delay the appearance of children
                            staggerChildren: 0.1, // Stagger the appearance of children
                          }}>
                          <Markdown content={project.contentHtml} />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </>
                );
              } else {
                return null;
              }
            })}
            <div className="italic text-xs opacity-50 hover:opacity-100 duration-150">
              Unless otherwise specified, all images presented in this portfolio
              have been created and are owned by {name} and Interfacing Research
              Laboratory. Any unauthorized use, reproduction, or distribution of
              these images without the explicit permission of the author is
              strictly prohibited.
            </div>
          </div>
        </div>
        <HorizontalProjectScroller
          projects={projects}
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
        />
      </main>
    </>
  );
};
