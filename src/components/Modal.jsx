import { useEffect } from "react";

/* eslint-disable react/prop-types */
const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <>
        <div className="relative">{children}</div>
        <button
          className="absolute top-0 right-0 m-3 text-white hover:text-gray-700"
          onClick={onClose}
        >
          Close
        </button>
      </>
    </div>
  );
};

export default Modal;
