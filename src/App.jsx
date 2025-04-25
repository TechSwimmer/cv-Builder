import React, { useRef, useState,useEffect } from "react";

import Navbar from "./components/Navbar";
import EditStyle from "./components/EditStyle";
import Preview from "./components/Preview";
import IntroPages from "./components/Intropages";
import "./styles/IntroStyles.css"

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import PreviewDisplay from "./components/PreviewDisplay";
import FormSection from "./components/FormSection";
import "./styles/App.css";
import Layout from "./components/Layout";
import PreviewTwo from "./components/PreviewTwo";
import PreviewThree from "./components/PreviewThree";

// import { boxShadow } from "html2canvas/dist/types/css/property-descriptors/box-shadow";

import layoutOne from "./images/layout1.png";
import layoutTwo from "./images/layout2.png";
import layoutThree from "./images/layout3.png";

// import { image } from "html2canvas/dist/types/css/types/image";

function App() {

          const [image, setImage] = useState(layoutOne);
          const [previewComponent, setPreviewComponent] = useState(<Preview />);
          const [currentLayout, setCurrentLayout] = useState('layout1');
      
          const handleLayoutClick = (layout) => {
              setCurrentLayout(layout);
              
              const layoutSlider = document.querySelector(".layout-slider");
              layoutSlider.classList.toggle("show");

              

              // render the corresponding preview component
              if(layout === "layout2") {
                setPreviewComponent(<PreviewTwo />);
                setImage(layoutTwo)
              }
              else if(layout === "layout3") {
                setPreviewComponent(<PreviewThree />)
                setImage(layoutThree)
              }
              else if(layout === "layout1"){
                setPreviewComponent(<Preview/>)
                setImage(layoutOne)
              }
            };
            
            const handleMouseLeave = () => {
              const layoutSlider = document.querySelector(".layout-slider");
              layoutSlider.classList.remove("show");
            };
      
            const handleMouseEnter = () => {
              const layoutSlider = document.querySelector(".layout-slider");
              layoutSlider.classList.add("show");
            }
      
            const images = {layoutOne, layoutTwo, layoutThree};
 
  const [showIntro, setShowIntro] = useState(true);

  const onFinish = () => {
    window.location.href= "https://resume-baker.netlify.app/";
  }

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");

    if(hasSeenIntro){
      setShowIntro(false)
    }
   },[]);

  // handling visibility for each section in preview 
  const [visibleSections, setVisibleSections] = useState({
    education: true,
    experience: true,
    projects: true,
    skills: true,
    summary: true,
    hobbies:true,
  });
 

  

  const previewRef = useRef();

  const handleDownloadPDF = async () => {
    // Ensure preview is visible and rendered
    setActiveTab("preview");
    setShowForm(false);
    
    // Small delay to allow DOM update

   
    await new Promise(resolve => setTimeout(resolve,1000));
    
    const element = previewRef.current;
    // element.style.boxShadow = 'none';
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
    
    element.scrollIntoView({ behavior: "auto", block: "start" });
    element.querySelectorAll('*').forEach(el => {
      if (el.textContent && el.textContent.includes(' ')) {
        el.style.whiteSpace = 'pre-wrap';
        el.style.wordSpacing = 'normal';
      }
    });
  
    try {
      const canvas = await html2canvas(element, {
        scale: 1,
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
    fontHeaderSize: "28px",
    fontContentSize: "20px",
    textColorLeft: "#000000",
    textColorRight: "#000000",
    backgroundColorLeft: "#ffffff",
    backgroundColorRight: "#ffffff",
    skillTabColor: "aqua",
    textColorSkillTab:"#000000",
    fontFamily: "Lucida Console, monospace",
    fontSize:"16px",
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
      title:"",
    },
  
    summary: { summary: "" },
    education: [
      { school: "",
        degree: "",
        startDate: "",
        endDate: "",
        location: "",
        achievements: {
          title: "Achievements",
          points: [""]
        }
       },
    ],
    skills: [{ skill: "" }],
    experience: [
      { company: "",
        position: "",
        startDate: "", 
        endDate: "", 
        location: "",
        achievements: {
          title: "Achievements",
          points: [""]
        }
       },
    ],
    projects: [
      {
        title: "",
        company: "",
        description: "",
        
        skillsUsed: [],
        keyFeatures: [],
        link: "",
      },
    ],
    hobbies: [
      {
        title: "listening Music",
        description: "I enjoy listening to music,"
      },
    ],
    languages:[
      {
        language:"",
        proficiency: "",
      },
    ],
    custom: [
      {
        title: "",
        type: "text", // "text" | "list" | "contact" | "links"
        description: "",
        listItems: [""],
        phone: "",
        email: "",
        links: [""],
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
    <>
  {/* Always render form + preview */}
  <div className="app">
    <div className="container">
      {/* Left Side - Forms */}
      {showForm && (
        <div className="form-navbar-container">
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === "content" && (
            <FormSection
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              visibleSections={visibleSections}
              setVisibleSections={setVisibleSections}
            />
          )}
          {activeTab === "style" && (
            <EditStyle
              customStyles={customStyles}
              setCustomStyles={setCustomStyles}
              onSubmit={handleSubmit}
              updateStyles={updateStyles}
            />
          )}
        </div>
      )}

      {/* Right Side - Preview */}
      <div className={`preview-container ${activeTab === "preview" ? "full-width" : ""}`}>
        <PreviewDisplay
          ref={previewRef}
          {...formData}
          style={customStyles}
          visibleSections={visibleSections}                                                                           
          previewComponent={previewComponent}
          setVisibleSections={setVisibleSections}
          currentLayout={currentLayout}
          handleLayoutClick={handleLayoutClick}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
        <Layout 
          currentLayout={currentLayout}
          handleLayoutClick={handleLayoutClick}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          images={images}
          image={image}
          setImage={setImage}
        />

        {activeTab === "preview" && (
          <div className="full-preview-btns">
            <button onClick={() => handleDownloadPDF()}>Download as PDF</button>
            <button className="edit-btn" onClick={handleEditClick}>Edit</button>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Overlay the IntroPages only if active */}
  {showIntro && (
    <IntroPages onFinish={onFinish}  />
  )}
</>
   );
}

export default App;