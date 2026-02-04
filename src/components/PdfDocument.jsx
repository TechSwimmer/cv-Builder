import { useLayoutEffect, useRef, forwardRef } from "react";
import "../styles/pdfstyles/pdfDocument.css"

const A4_HEIGHT = 1123 - 96; // Account for padding

const PDFDocument = forwardRef(({ children }, ref) => {
  const sourceRef = useRef();
  const pagesRef = useRef();

  useLayoutEffect(() => {
    const blocks = Array.from(sourceRef.current.querySelectorAll("[data-block]"));
    pagesRef.current.innerHTML = "";
    pagesRef.current.dataset.ready = "false";

    let page = createPage();
    let usedHeight = 0;

    blocks.forEach(block => {
      // Measure block
      const probe = block.cloneNode(true);
      const temp = document.createElement("div");

      temp.style.cssText = `
      position:absolute;
      visibility:hidden;
      width:794px;
      padding:48px 56px;
      box-sizing:border-box;
    `;

      temp.appendChild(probe);
      document.body.appendChild(temp);
      const h = probe.offsetHeight;
      document.body.removeChild(temp);

      // If block does not fit → move to new page BEFORE inserting
      if (usedHeight + h > A4_HEIGHT && usedHeight > 0) {
        page = createPage();
        usedHeight = 0;
      }

      // Now insert for real
      const clone = block.cloneNode(true);
      page.appendChild(clone);
      usedHeight += h;
    });

    function createPage() {
      const p = document.createElement("div");
      p.className = "pdf-page";
      pagesRef.current.appendChild(p);
      return p;
    }

    pagesRef.current.dataset.ready = "true";
  }, [children]);

  return (
    <div ref={ref} className="pdf-document-container">
      {/* Hidden source layout for measurement */}
      <div ref={sourceRef} className="pdf-source">
        {children}
      </div>

      {/* Actual printable pages */}
      <div ref={pagesRef} className="pdf-pages" />
    </div>
  );
});

export default PDFDocument;