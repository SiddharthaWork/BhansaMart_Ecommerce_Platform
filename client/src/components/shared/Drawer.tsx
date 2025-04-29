import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect } from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content?: React.ReactNode;
}

const DrawerComponent: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title = "",
  content,
}) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen])
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-600 bg-opacity-30 backdrop-blur-[0.7px]"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 z-40 md:h-screen h-full transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } bg-[#F5F5F5] md:w-[24rem] w-[19rem] lg:w-[26rem]`}
        tabIndex={-1}
        aria-labelledby="drawer-right-label"
        role="dialog"
      >
        {/* Fixed Title Section */}
        <div className="fixed z-50 flex items-center justify-between w-full h-16 px-4 bg-white shadow-sm">
          <h5
            id="drawer-right-label"
            className="text-xl font-semibold text-black"
          >
            {title}
          </h5>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200"
          >
            <Icon
              icon="ic:round-close"
              width="24"
              height="24"
              style={{ color: "#353537" }}
            />
          </button>
        </div>

        {/* Scrollable Content Section */}
        <div className="mt-16 h-[calc(100dvh-4rem)] overflow-y-auto">
          {content}
        </div>
      </div>
    </>

  );
};

export default DrawerComponent;
