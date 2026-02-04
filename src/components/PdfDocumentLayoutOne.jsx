import { useLayoutEffect, useRef, forwardRef } from "react";
import "../styles/pdfstyles/pdfDocument.css";

const A4_HEIGHT = 1123 - 96; // height minus padding

const PDFDocumentLayoutOne = forwardRef(({ children }, ref) => {
    const sourceRef = useRef(null)
    const pagesRef = useRef(null)

    useLayoutEffect(() => {
        const source = sourceRef.current;
        const pages = pagesRef.current;
        if (!source || !pages) return;

        pagesRef.current.dataset.ready = "false"

        // Get all sections
        const leftBlocks = [...source.querySelectorAll("[data-col='left']")]
        const rightBlocks = [...source.querySelectorAll("[data-col='right']")]

        pages.innerHTML = ""

        // Separate fixed block
        const fixedBlock = leftBlocks.find(block => block.hasAttribute('data-fixed'))
        const regularLeftBlocks = leftBlocks.filter(block => !block.hasAttribute('data-fixed'))

        // Function to create page with both columns
        const createPageWithBothColumns = () => {
            
            const page = document.createElement("div")
            page.className = "pdf-page pdf1-page"
            pages.appendChild(page)

         

            const body = document.createElement("div")
            body.className = "pdf1-body"
            page.appendChild(body)
            
            const leftCol = document.createElement("div")
            leftCol.className = "pdf1-left"
            const rightCol = document.createElement("div")
            rightCol.className = "pdf1-right"

            body.append(leftCol, rightCol)

            return { page, leftCol, rightCol }
        }

        // Create pages
        let currentPage = null
        let leftCol = null
        let rightCol = null
        let leftHeight = 0
        let rightHeight = 0
        let isFirstPage = true

        // Helper to create new page
        const createNewPage = () => {
            currentPage = createPageWithBothColumns()
            leftCol = currentPage.leftCol
            rightCol = currentPage.rightCol
            leftHeight = 0
            rightHeight = 0

            // Add fixed block only to first page
            if (isFirstPage && fixedBlock) {
                const clone = fixedBlock.cloneNode(true)
                leftCol.appendChild(clone)
                leftHeight = clone.getBoundingClientRect().height
                isFirstPage = false
            }
        } 

        // Start with first page
        createNewPage()

        // Process blocks - keep both columns balanced
        let leftIndex = 0
        let rightIndex = 0
        const maxBlocks = Math.max(regularLeftBlocks.length, rightBlocks.length)

        for (let i = 0; i < maxBlocks; i++) {
            // Check if we need new page
            if (leftHeight >= A4_HEIGHT || rightHeight >= A4_HEIGHT) {
                createNewPage()
            }
   
            // Add left block if exists
            if (leftIndex < regularLeftBlocks.length) {
                const leftBlock = regularLeftBlocks[leftIndex]
                const clone = leftBlock.cloneNode(true)
                leftCol.appendChild(clone)
                leftHeight += clone.getBoundingClientRect().height
                leftIndex++
            }

            // Add right block if exists
            if (rightIndex < rightBlocks.length) {
                const rightBlock = rightBlocks[rightIndex]
                const clone = rightBlock.cloneNode(true)
                rightCol.appendChild(clone)
                rightHeight += clone.getBoundingClientRect().height
                rightIndex++
            }
        }
        pagesRef.current.dataset.ready = "true"
    }, [children])




    return (
        <div ref={ref} className="pdf-document">
            <div ref={sourceRef} className="pdf-source">
                {children}
            </div>
            <div ref={pagesRef} className="pdf-pages" />
        </div>
    );
});

export default PDFDocumentLayoutOne;