
import React, { FunctionComponent } from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: any;
}

const Modal: FunctionComponent<ModalProps> = ({ isOpen, closeModal, children}) => {
  const modalClass = isOpen ? "" : "hidden";

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 m-10 md:m-52 ${modalClass}`}>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-container w-auto bg-black text-white border border-zinc-50mx-auto z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

