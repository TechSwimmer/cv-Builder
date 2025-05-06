// import essential react hooks for the App component
import React, { useRef, useState,useEffect } from "react";

//import all the preview pages that are to be displayed 
import Preview from "./components/Preview";
import PreviewTwo from "./components/PreviewTwo";
import PreviewThree from "./components/PreviewThree";

// import the style pages for all the previews
import EditStyle from "./components/EditStyle";
import EditStyleTwo from "./components/EditStyleTwo";
import EditStyleThree from "./components/EditStyleThree";

// import the navbar component (btns to select formSection and EditStyle page)
import Navbar from "./components/Navbar";

// intropages shows a couple of pages to explain how to create a cv in this app
import IntroPages from "./components/Intropages";

// style pages for intropages and app.jsx
import "./styles/IntroStyles.css"
import "./styles/App.css";

// FormSection is the form where user inputs the data i.e. to be displayed on the cv
import FormSection from "./components/FormSection";

// import html2canvas and jspdf to download the cv in PDF format
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// PreviewDisplay ensures that the correct preview is displayed with the appropriate data.
import PreviewDisplay from "./components/PreviewDisplay";

// Layout.jsx helps us to display proper preview layout w.r.t. the clicked img btn
import Layout from "./components/Layout";

// import preview images to be displayed as btns where user can click and change the preview 
import layoutOne from "./images/layout1.png";
import layoutTwo from "./images/layout2.png";
import layoutThree from "./images/layout3.png";



function App() {

          // state variables
          const [image, setImage] = useState(layoutOne);                         // image to be displayed as btn

          const [previewComponent, setPreviewComponent] = useState(<Preview />); // preview component to be displayed

          const [currentLayout, setCurrentLayout] = useState('layout1');         // current preview layout

          const [selectedEditStyle,setSelectedEditStyle] = useState(null);       // current edit style page

          const [showIntro, setShowIntro] = useState(true);                      // handle visibility of intro pages

          const [activeTab, setActiveTab] = useState("content");                 // toggle between editstyle and formsection page

          const [showForm, setShowForm] = useState(true);                        // toggle full screen mode for preview

          const [customStyles, setCustomStyles] = useState({                     // store all the styles for all the preview            
            fontNameSize:"34px",
            fontHeaderSize: "28px",
            fontContentSize: "20px",
            textColorLeft: "#000000",
            textColorRight: "#000000",
            textColorHeader: "#000000",
            textColorContent: "#000000",
            backgroundColorLeft: "#ffffff",
            backgroundColorRight: "#ffffff",
            backgroundColorHeader: "#ffffff",
            backgroundColorContent: "#ffffff",
            bodyBgColor: "aqua",
            skillTabColor: "aqua",
            textColorSkillTab:"#000000",
            fontFamilyHeader: "Lucida Console, monospace",
            fontFamilyContent: "Lucida Console, monospace",
            fontSize:"16px",
          });
          const [visibleSections, setVisibleSections] = useState({
            education: true,
            experience: true,
            projects: true,
            skills: true,
            summary: true,
            hobbies:true,
          });
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

          const handleStylePage = (currentLayout) => {
            if (currentLayout === 'layout1') {
              setSelectedEditStyle('EditStyle')
            }
            else if (currentLayout === 'layout2'){
              setSelectedEditStyle('EditStyleTwo')
            }
            else if (currentLayout === 'layout3'){
              setSelectedEditStyle('EditStyleThree')
            }
          }
          
          const renderEditStyle = () => {
            if (selectedEditStyle === 'EditStyle'){
              return <EditStyle
              customStyles={customStyles}
              setCustomStyles={setCustomStyles}
              onSubmit={handleSubmit}
              updateStyles={updateStyles}
              currentLayout={currentLayout}
              setCurrentLayout={setCurrentLayout}
              handleLayoutClick={handleLayoutClick}
              />;
            }
            else if (selectedEditStyle === 'EditStyleTwo'){
              return <EditStyleTwo
              customStyles={customStyles}
              setCustomStyles={setCustomStyles}
              onSubmit={handleSubmit}
              updateStyles={updateStyles}
              currentLayout={currentLayout}
              setCurrentLayout={setCurrentLayout}
              handleLayoutClick={handleLayoutClick}
              />
            }
            else if (selectedEditStyle === 'EditStyleThree'){
              return <EditStyleThree
              customStyles={customStyles}
              setCustomStyles={setCustomStyles}
              onSubmit={handleSubmit}
              updateStyles={updateStyles}
              currentLayout={currentLayout}
              setCurrentLayout={setCurrentLayout}
              handleLayoutClick={handleLayoutClick}
              />
          }
          else {
            return null;
          }
        }


          const handleLayoutClick = (layout) => {
              setCurrentLayout(layout);
              
              const layoutSlider = document.querySelector(".layout-slider");
              layoutSlider.classList.toggle("show");

              handleStylePage(layout)

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
        scrollY: -window.scrollY,
        backgroundColor: null,
        allowTaint: true,
        ignoreElements: (el) => {
          // Skip elements that might interfere
          return el.classList.contains('no-print');
        },
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
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



 

  const updateStyles = (newStyles) => { 
    setCustomStyles((prev) => ({...prev, ...newStyles}));
  };
 

 


  

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
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} handleStylePage={handleStylePage} currentLayout={currentLayout} />
          {activeTab === "content" && (
            <FormSection
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              visibleSections={visibleSections}
              setVisibleSections={setVisibleSections}
            />
          )}
          {activeTab === "style" && 
           renderEditStyle()
          }
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