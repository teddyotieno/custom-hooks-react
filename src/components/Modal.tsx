import React, { useEffect, useRef, ReactChild, MutableRefObject } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal = ({ children}: { children: ReactChild }) => {
  const elRef: MutableRefObject<null | HTMLDivElement> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    if (modalRoot && elRef.current) {
      modalRoot.appendChild(elRef.current);
      return () => {
        if (elRef.current) {
          modalRoot.removeChild(elRef.current);
        }
      };
    }
  });
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
