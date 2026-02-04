import { useLayoutEffect, useRef, forwardRef } from "react";
import "../styles/pdfstyles/pdfDocument.css";

const A4_HEIGHT = 1123 - 96; // height minus padding

const PDFDocumentLayoutTwo = forwardRef(({ children, mode = 'pdf' }, ref) => {
    const sourceRef = useRef(null);
    const pagesRef = useRef(null);

    // In preview mode, just render the content directly
    if (mode === 'preview') {
        return (
            <div ref={ref} className="pdf2-page preview-mode">
                {children}
            </div>
        );
    }

    useLayoutEffect(() => {
        const source = sourceRef.current;
        const pages = pagesRef.current;
        if (!source || !pages) return;

        pagesRef.current.dataset.ready = "false"

        // Get header from source
        const header = source.querySelector(".pdf2-header-section")?.parentElement;
        const leftCol = source.querySelector(".pdf2-left");
        const rightCol = source.querySelector(".pdf2-right");

        const leftBlocks = leftCol ? [...leftCol.querySelectorAll("[data-col='left']")] : [];
        const rightBlocks = rightCol ? [...rightCol.querySelectorAll("[data-col='right']")] : [];

        pages.innerHTML = "";

        let page = createPage();
        let body = createBody();
        let newLeft = createColumn("left");
        let newRight = createColumn("right");

        // Clone header for first page
        if (header) {
            page.append(header.cloneNode(true));
        }
        page.append(body);
        body.append(newLeft, newRight);

        let leftHeight = 0;
        let rightHeight = 0;

        flow(leftBlocks, newLeft, "left");
        flow(rightBlocks, newRight, "right");

        function flow(blocks, column, side) {
            blocks.forEach(block => {

                // 1. clone into a hidden measuring container
                const probe = block.cloneNode(true);
                probe.style.position = "absolute";
                probe.style.visibility = "hidden";
                probe.style.width = column.offsetWidth + "px";
                document.body.appendChild(probe);

                const h = probe.offsetHeight;
                document.body.removeChild(probe);

                const current = side === "left" ? leftHeight : rightHeight;

                // 2. if it won't fit → create new page BEFORE inserting
                if (current + h > A4_HEIGHT) {
                    page = createPage();
                    body = createBody();
                    newLeft = createColumn("left");
                    newRight = createColumn("right");
                    page.append(body);
                    body.append(newLeft, newRight);

                    column = side === "left" ? newLeft : newRight;
                    side === "left" ? (leftHeight = 0) : (rightHeight = 0);
                }

                // 3. now insert for real
                const clone = block.cloneNode(true);
                column.appendChild(clone);
                side === "left" ? (leftHeight += h) : (rightHeight += h);
            });
        }

        function createPage() {
            const p = document.createElement("div");
            p.className = "pdf-page pdf2-page";
            pages.appendChild(p);
            return p;
        }

        function createBody() {
            const b = document.createElement("div");
            b.className = "pdf2-body";
            return b;
        }

        function createColumn(side) {
            const d = document.createElement("div");
            d.className = `pdf2-${side}`;
            return d;
        }
        pagesRef.current.dataset.ready = "true"
    }, [children]);

    return (
        <div ref={ref} className="pdf-document">
            <div ref={sourceRef} className="pdf-source">
                {children}
            </div>
            <div ref={pagesRef} className="pdf-pages" />
        </div>
    );
});

export default PDFDocumentLayoutTwo;
