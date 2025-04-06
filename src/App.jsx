import React, { useRef, useState,useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import Navbar from "./components/Navbar";
import EditStyle from "./components/EditStyle";
import Preview from "./components/Preview";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


import FormSection from "./components/FormSection";
import "./styles/App.css";
// import { boxShadow } from "html2canvas/dist/types/css/property-descriptors/box-shadow";


function App() {
 
  const previewRef = useRef();

  const handleDownloadPDF = async () => {
    // Ensure preview is visible and rendered
    setActiveTab("preview");
    setShowForm(false);
    
    // Small delay to allow DOM update
    await new Promise(resolve => setTimeout(resolve,700));
    
    const element = previewRef.current;
    element.style.boxShadow = 'none';
    document.body.style.background = "#fff"
    
    // Temporary style adjustments for capture
    const originalStyles = {
      position: element.style.position,
      overflow: element.style.overflow,
      height: element.style.height,
      boxShadow: element.style.boxShadow,
    };
    
    element.style.position = 'absolute';
    element.style.overflow = 'visible';
    element.style.height = 'auto';
    element.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.9)';
    
    element.querySelectorAll('*').forEach(el => {
      if (el.textContent && el.textContent.includes(' ')) {
        el.style.whiteSpace = 'pre-wrap';
        el.style.wordSpacing = 'normal';
      }
    });
  
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: true,
        useCORS: true,
        
        backgroundColor: null,
        allowTaint: true,
        ignoreElements: (el) => {
          // Skip elements that might interfere
          return el.classList.contains('no-print');
        },
        windowWidth: element.scrollWidth,
        height: element.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure all elements are visible during capture
          clonedDoc.querySelectorAll('*').forEach(el => {
            el.style.whiteSpace = 'pre';
            el.style.wordBreak = 'break-word';
            el.style.boxShadow = window.getComputedStyle(el).boxShadow;
            el.style.filter = 'none';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
            el.style.whiteSpace = 'pre-wrap';
            el.style.wordSpacing = 'normal';
            el.style.fontFamily = 'Consolas, monospace';
          });
        }
      });
  
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png',1.0);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
      
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      // Restore original styles
      element.style.boxShadow = '';
      document.body.style.background = '';
      Object.assign(element.style, originalStyles);
    }
  };

  const handleGenerate = () => {

    setTimeout(() => {
      window.print();
  }, 100);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
        @media print {
            body * {
                visibility: hidden;
            }
            .printable-area, .printable-area * {
                visibility: visible;
            }
            .printable-area {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                margin: 0;
                padding: 0;
            }
            /* Hide buttons when printing */
            .full-preview-btns {
                display: none !important;
            }
            /* Ensure proper page breaks */
            .cv-preview {
                page-break-after: avoid;
            }
        }
    `;
    document.head.appendChild(style);

    return () => {
        document.head.removeChild(style);
    };
}, []);



  const [activeTab, setActiveTab] = useState("content");
  const [customStyles, setCustomStyles] = useState({
    fontHeaderSize: "18px",
    fontContentSize: "14px",
    textColorLeft: "#000000",
    textColorRight: "#000000",
    backgroundColorLeft: "#ffffff",
    backgroundColorRight: "#ffffff",
    skillTabColor: "aqua",
    fontFamily: "Arial, sans-serif",
  });

  const updateStyles = (newStyles) => { 
    setCustomStyles((prev) => ({...prev, ...newStyles}));
  };
  const [showForm, setShowForm] = useState(true);

  const [formData, setFormData] = useState({
    generalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      Github: "",
      linkedin: "",
      website: "",
    },
  
    summary: { summary: "" },
    education: [
      { school: "", degree: "", startDate: "", endDate: "", location: "" },
    ],
    skills: [{ skill: "" }],
    experience: [
      { company: "", position: "", startDate: "", endDate: "", location: "" },
    ],
    projects: [
      {
        title: "",
        company: "",
        description: "",
        category: "",
        skillsUsed: [],
        keyFeatures: [],
        link: "",
      },
    ],
  });


  

  // keep all existing state 
  
  
   // This will capture the DOM element reliably





  const handleSubmit = () => {
    setShowForm(false);
    setActiveTab("preview")
  }

  const handleEditClick = () => {
    setShowForm(true);
    setActiveTab('content')
  }
  console.log(activeTab)

  return (
    <div className="app">
      <div className="container">
        {/* Left Side - Forms */}
        {showForm && (
          <div className="form-navbar-container">
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "content" && (
            <FormSection formData={formData} setFormData={setFormData} onSubmit={handleSubmit}/>
          )}
          {activeTab === "style" && <EditStyle customStyles={customStyles} setCustomStyles={setCustomStyles} updateStyles={updateStyles} />}
          </div>
        )}

        {/* Right Side - Preview */}
        <div className={`preview-container ${activeTab === "preview" ? "full-width" : ""}`} >
        
          <Preview  ref={previewRef} {...formData} style={customStyles} />
          
          {activeTab === "preview" && (
          <div className="full-preview-btns">
            <button onClick={() => handleDownloadPDF()}>Download as PDF</button>
            <button className="edit-btn" onClick={() => handleEditClick()}>
              Edit
            </button>
          </div>
        )}
        </div>  
        



        
      </div>
    </div>
  );
}

export default App;