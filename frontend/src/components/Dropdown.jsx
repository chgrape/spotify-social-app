import React, { useRef, useState } from "react";
import useClickOutside from "../assets/useClickOutside";

const Dropdown = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null)
  useClickOutside(menuRef, ()=>setIsOpen(false))

  return (
    <>
      <button
        className="w-72 flex p-2 border-2 border-neutral-600 rounded-lg text-neutral-400 bg-neutral-700 my-2"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        {name}
      </button>
      <div
        ref={menuRef}
        className={
          !isOpen
            ? "hidden"
            : "bg-neutral-700 z-10 absolute rounded-lg w-72 border-2 border-neutral-600 ring-2 ring-white ring-opacity-10 text-neutral-400 h-64 overflow-auto scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-neutral-600"
        }
      >
        {children.map((child) =>
          React.cloneElement(child, {
            key: child.props.name,
            setIsOpen,
            ...child.props,
          })
        )}
      </div>
    </>
  );
};

export default Dropdown;
