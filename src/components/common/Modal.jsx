import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Tooltip } from "./Tooltip";
import {
  BounceLoader,
  ClipLoader,
  HashLoader,
  PuffLoader,
  RingLoader,
} from "react-spinners";
import EditorComponent from "./EditorComponent";

/* ---------------------- Modal Component ---------------------- */
export const Modal = ({
  open,
  onClose,
  size = "normal",
  position = "center",
  children,
}) => {
  if (!open) return null;

  const modalSize = size === "small" ? "max-w-sm" : "max-w-lg";
  const modalPosition =
    position === "top"
      ? "items-start mt-20 justify-center"
      : "items-center justify-center";

  return (
    <div className="fixed inset-0 flex bg-black/40 z-50" onClick={onClose}>
      <div
        className={`flex w-full h-full ${modalPosition}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`bg-white rounded-lg shadow-lg p-6 w-full ${modalSize}`}
        >
          {children}
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------- Demo Section ---------------------- */
const ModalDemo = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold text-indigo-500">Modal & Utils Demo</h1>

      {/* Open Modal */}
      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 bg-indigo-500 text-white rounded-md"
      >
        Open Modal
      </button>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size="small"
        position="center"
      >
        <h2 className="text-lg font-semibold text-indigo-500">Modal Content</h2>
        <p className="text-gray-600 mt-2">This is a reusable modal example.</p>
      </Modal>

      {/* Toast Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => toast.success("Action Successful!")}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Show Success Toast
        </button>
        <button
          onClick={() => toast.error("Something went wrong!")}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Show Error Toast
        </button>
      </div>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Tooltip Demo */}
      <button id="btn1" className="px-4 py-2 bg-gray-700 text-white rounded-md">
        Hover me
        <Tooltip title="Hello" pos="top" anchorId="btn1" />
      </button>

      {/* Spinner Demo */}
      <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: "20px",
        padding: "20px",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <BounceLoader color="#5846cf" size={30} />
      <ClipLoader color="#5846cf" size={30} />
      <HashLoader color="#5846cf" size={30} />
      <PuffLoader color="#5846cf" size={30} />
      <RingLoader color="#5846cf" size={30} />
    </div>
      <h1>Rich Text</h1>
      <EditorComponent />
    </div>
  );
};

export default ModalDemo;
