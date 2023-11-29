import React, { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { motion, Variants, useAnimation } from "framer-motion";
import { useGesture } from "@use-gesture/react";
import { Media } from "@/types";

interface LightboxProps {
  toggle: () => void;
  open: boolean;
  project: string;
  images: Media[];
  selectedImage: number;
  setSelectedImage: React.Dispatch<React.SetStateAction<number>>;
}

const variants: Variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 1 },
};

export const Lightbox: React.FC<LightboxProps> = ({
  toggle,
  open,
  project,
  images,
  selectedImage,
  setSelectedImage,
}) => {
  let closeRef = useRef(null);
  let imageRef = useRef(null);

  const [imageZoom, setImageZoom] = useState({ x: 0, y: 0, scale: 1 });

  useEffect(() => {
    setImageZoom({ x: 0, y: 0, scale: 1 });
  }, [selectedImage]);

  useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        setImageZoom((viewport) => ({ ...viewport, x: dx, y: dy }));
      },
      onPinch: ({
        memo,
        origin: [pinchOriginX, pinchOriginY],
        movement: [md],
        offset: [d],
      }) => {
        if (d > 8) {
          setImageZoom((viewport) => ({ ...viewport, scale: 8 }));
        } else if (d < 0.1) {
          setImageZoom((viewport) => ({ ...viewport, scale: 0.1 }));
        } else {
          setImageZoom((viewport) => ({ ...viewport, scale: d }));
        }
      },
    },
    {
      drag: {
        from: () => [imageZoom.x, imageZoom.y],
      },
      target: imageRef,
      eventOptions: { passive: false },
    }
  );

  const handleResetViewport = () => {
    setImageZoom({ x: 0, y: 0, scale: 1 });
  };

  return (
    <Dialog
      initialFocus={closeRef}
      open={open}
      onClose={() => {
        toggle();
      }}>
      <motion.div
        className="z-50 fixed inset-0 bg-[#000000DE]"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="fixed inset-0 flex flex-col items-center p-4 md:justify-center justify-between">
          <div className="z-20 w-full flex justify-between items-center">
            <div></div>
            <motion.div
              className="md:pb-3 text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.8 }}>
              {project}
            </motion.div>
            <motion.div
              className="md:pb-3 text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.8 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 hover:cursor-pointer hover:opacity-50 duration-150"
                onClick={toggle}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.div>
          </div>
          <div className="flex md:overflow-hidden items-center md:space-x-5">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="hidden z-30 md:block w-12 h-12 hover:opacity-50 hover:cursor-pointer translate-x-6 lg:translate-x-0 duration-150"
              onClick={() => {
                if (selectedImage == 0) {
                  setSelectedImage(images.length - 1);
                } else {
                  setSelectedImage(selectedImage - 1);
                }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.5 }}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </motion.svg>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "linear", duration: 0.5 }}
              className="block">
              {/* Mobile */}
              <img
                ref={imageRef}
                alt={"Image"}
                className="z-0 relative md:hidden max-w-[90vw] lg:h-[90vh] md:object-contain"
                style={{
                  left: imageZoom.x,
                  top: imageZoom.y,
                  transform: `scale(${imageZoom.scale})`,
                  touchAction: "none",
                }}
                width={2560}
                height={1440}
                src={images[selectedImage].link}
              />
              {/* Desktop */}
              <img
                alt={"Image"}
                className="hidden md:block max-w-[90vw] lg:h-[90vh] md:object-contain hover:cursor-zoom-out"
                width={2560}
                height={1440}
                src={images[selectedImage].link}
                onClick={toggle}
              />
            </motion.div>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="hidden md:block w-12 h-12 hover:opacity-50 duration-150 hover:cursor-pointer -translate-x-6 lg:translate-x-0"
              onClick={() => {
                if (selectedImage < images.length - 1) {
                  setSelectedImage(selectedImage + 1);
                } else {
                  setSelectedImage(0);
                }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.5 }}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </motion.svg>
          </div>
          <div className="z-20 flex justify-between items-center w-full space-x-3 pt-5">
            <div>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="md:hidden z-30 block w-6 h-6 hover:opacity-50 hover:cursor-pointer translate-x-6 lg:translate-x-0 duration-150"
                onClick={() => {
                  if (selectedImage == 0) {
                    setSelectedImage(images.length - 1);
                  } else {
                    setSelectedImage(selectedImage - 1);
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.5 }}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </motion.svg>
            </div>
            <motion.div
              className="md:pt-3 text-center w-3/4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.8 }}>
              <div>{images[selectedImage].caption}</div>
              <div>
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
            <div>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="block md:hidden w-6 h-6 hover:opacity-50 duration-150 hover:cursor-pointer -translate-x-6 lg:translate-x-0"
                onClick={() => {
                  if (selectedImage < images.length - 1) {
                    setSelectedImage(selectedImage + 1);
                  } else {
                    setSelectedImage(0);
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.5 }}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </motion.svg>
            </div>
          </div>
        </div>
      </motion.div>
    </Dialog>
  );
};
