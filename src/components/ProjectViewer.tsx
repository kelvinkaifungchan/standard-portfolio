"use client";

import { useState, useEffect } from "react";

import { Project } from "@/types";
import { HorizontalLine } from "./HorizontalLine";
import { Lightbox } from "./Lightbox";

interface PureProjectProps {
  data: Project;
}

export const ProjectViewer: React.FC<PureProjectProps> = ({ data }) => {
  const [error, setError] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex flex-col h-full w-full overflow-y-hidden border-r border-[#FFFFFF55] w-[60vw] min-w-[60vw] max-w-[60vw]">
      {data ? (
        <>
          <div className="p-5 flex justify-between text-xl">
            <span>
              {data.name} ({data.date})
            </span>
          </div>
          <HorizontalLine />
          <div className="w-full h-full overflow-y-auto customScroll pb-20">
            {/* <Markdown content={data?.contentHtml} /> */}
            {data.media?.map((item, index) => {
              if (item.type == "image") {
                return (
                  <div key={index} className="w-full">
                    <img
                      className="object-contain px-5 pt-5 duration-300 max-h-[80vh] hover:cursor-zoom-in hover:opacity-50"
                      src={item.link}
                      alt={`${index}`}
                      width={1920}
                      height={1920}
                      loading="eager"
                      onClick={() => {
                        setLightbox(true);
                        setCurrentIndex(index);
                      }}
                    />
                    <div className="px-5 pt-2 italic text-sm">
                      {item.caption}
                    </div>
                  </div>
                );
              } else if (item.type == "video") {
                return (
                  <div key={index} className="w-full flex flex-col">
                    <video
                      className="w-full object-contain px-5 pt-5 duration-300 max-h-[80vh] hover:cursor-zoom-in hover:opacity-50"
                      autoPlay
                      muted
                      loop
                      disablePictureInPicture
                      playsInline>
                      <source src={item.link} type="video/mp4" />
                    </video>
                    <div className="px-5 pt-2 italic text-sm">
                      {item.caption}
                    </div>
                  </div>
                );
              } else if (item.type == "video/sound") {
                return (
                  <div key={index} className="w-full flex flex-col">
                    <video
                      className="w-full object-contain px-5 pt-5 duration-300 max-h-[80vh] hover:cursor-zoom-in hover:opacity-50"
                      controls
                      disablePictureInPicture
                      playsInline>
                      <source src={item.link} type="video/mp4" />
                    </video>
                    <div className="px-5 pt-2 italic text-sm">
                      {item.caption}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </>
      ) : null}
      {data.media && (
        <Lightbox
          toggle={() => {
            setLightbox(!lightbox);
          }}
          open={lightbox}
          project={data.name}
          images={data.media}
          selectedImage={currentIndex}
          setSelectedImage={setCurrentIndex}
        />
      )}
    </div>
  );
};
