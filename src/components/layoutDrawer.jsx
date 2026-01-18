import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Layout from "./Layout";
import "../styles/LayoutDrawer.css";

const LayoutDrawer = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Toggle */}
      <button
        className={`layout-floating-btn ${open ? "attached" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle layouts"
      >
        {open ? <MdChevronRight size={22} /> : <MdChevronLeft size={22} />}
      </button>

      {/* Slide Panel */}
      <div className={`layout-drawer ${open ? "open" : ""}`}>
        <Layout {...props} />
      </div>
    </>
  );
};

export default LayoutDrawer;