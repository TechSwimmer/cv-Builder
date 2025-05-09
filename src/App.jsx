// import essential react hooks for the App component
import React, { useRef, useState, useEffect } from "react";

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

  const [selectedEditStyle, setSelectedEditStyle] = useState(null);       // current edit style page

  const [showIntro, setShowIntro] = useState(true);                      // handle visibility of intro pages

  const [activeTab, setActiveTab] = useState("content");                 // toggle between editstyle and formsection page

  const [showForm, setShowForm] = useState(true);                        // toggle full screen mode for preview

  const [customStyles, setCustomStyles] = useState({                     // store all the styles for all the preview            
    fontNameSize: "34px",
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
    textColorSkillTab: "#000000",
    fontFamilyHeader: "Lucida Console, monospace",
    fontFamilyContent: "Lucida Console, monospace",
    fontSize: "16px",
  });
  const [visibleSections, setVisibleSections] = useState({                      // store  visibility values for specific sections 
    education: true,
    experience: true,
    projects: true,
    skills: true,
    summary: true,
    hobbies: true,
  });
  const [formData, setFormData] = useState({                                    // store the users's cv-data and change it using this state
    generalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      Github: "",
      linkedin: "",
      website: "",
      title: "",
    },

    summary: { summary: "" },
    education: [
      {
        school: "",
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
      {
        company: "",
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
    languages: [
      {
        language: "",
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

  //  set the appropriate EditStyle component based on the selected layout

  const handleStylePage = (currentLayout) => {
    if (currentLayout === 'layout1') {
      setSelectedEditStyle('EditStyle')        // for layout1
    }
    else if (currentLayout === 'layout2') {
      setSelectedEditStyle('EditStyleTwo')     // for layout2
    }
    else if (currentLayout === 'layout3') {
      setSelectedEditStyle('EditStyleThree')   // for layout1
    }
  }

  // Function to render the correct EditStyle component based on selectedEditStyle state
  const renderEditStyle = () => {
    if (selectedEditStyle === 'EditStyle') {
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
    else if (selectedEditStyle === 'EditStyleTwo') {
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
    else if (selectedEditStyle === 'EditStyleThree') {
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

  // Function to handle layout selection when a layout button/image is clicked

  const handleLayoutClick = (layout) => {
    // Update the current layout state

    setCurrentLayout(layout);

    // Toggle the visibility of the layout slider menu

    const layoutSlider = document.querySelector(".layout-slider");
    layoutSlider.classList.toggle("show");

    // Set the appropriate EditStyle component for the selected layout
    handleStylePage(layout)

    // Render the corresponding preview component and update the preview image
    if (layout === "layout2") {
      setPreviewComponent(<PreviewTwo />);            // set previewTwo
      setImage(layoutTwo)                             //  update the preview page
    }
    else if (layout === "layout3") {
      setPreviewComponent(<PreviewThree />)           // set previewThree
      setImage(layoutThree)                           // update the preview page    
    }
    else if (layout === "layout1") {
      setPreviewComponent(<Preview />)                // set preview  
      setImage(layoutOne)                             // update the preview page
    }
  };

  // Function to handle mouse enter and leave events
  const handleMouseLeave = () => {
    const layoutSlider = document.querySelector(".layout-slider");
    layoutSlider.classList.remove("show");
  };
  // Function to handle mouse enter and leave events
  const handleMouseEnter = () => {
    const layoutSlider = document.querySelector(".layout-slider");
    layoutSlider.classList.add("show");
  }

  // store all the preview images in a variable
  const images = { layoutOne, layoutTwo, layoutThree };



  const onFinish = () => {
    window.location.href = "https://resume-baker.netlify.app/";   // guide the user back to the main page of app
  }

  // useEffect to check if the user has already seen the intro pages

  useEffect(() => {
    // Retrieve the 'hasSeenIntro' flag from localStorage
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");

    // If the flag exists, hide the intro pages
    if (hasSeenIntro) {
      setShowIntro(false)
    }
  }, []);

  // create a reference using useRef to print the cv in PDF format
  const previewRef = useRef();

  // logic to download the preview component in PDF format
  const handleDownloadPDF = async () => {
    // Ensure preview is visible and rendered
    setActiveTab("preview");
    setShowForm(false);

    // Small delay to allow DOM update
    await new Promise(resolve => setTimeout(resolve, 1000));

    // get a reference to the preview DOM element
    const element = previewRef.current;


    // Temporary style adjustments for capture
    const originalStyles = {
      position: element.style.position,
      overflow: element.style.overflow,
      height: element.style.height,
      boxShadow: element.style.boxShadow,
    };

    // set values for temporary style adjustments
    element.style.position = 'absolute';
    element.style.overflow = 'visible';
    element.style.height = 'auto';

    // Scroll the element into view before taking a snapshot
    element.scrollIntoView({ behavior: "auto", block: "start" });

    // Fix potential line-breaking or white space issues for consistent text rendering
    element.querySelectorAll('*').forEach(el => {
      if (el.textContent && el.textContent.includes(' ')) {
        el.style.whiteSpace = 'pre-wrap';
        el.style.wordSpacing = 'normal';
      }
    });


    try {
      // take a snapshot of the DOM element using html2canvas 
      const canvas = await html2canvas(element, {
        scale: 1,                         // scale factor is 1:1
        logging: true,                    // enable logging for debugging
        useCORS: true,                    // allow cross-origin images
        scrollY: -window.scrollY,         // enable height based scrolling before screenshot
        backgroundColor: null,            // bg transparent
        allowTaint: true,                 // allow other cross-orighin content

        // set logic to ignore elements in preview (if any)
        ignoreElements: (el) => {
          // Skip elements that might interfere
          return el.classList.contains('no-print');        // elements with className ('.no-print') will not print
        },
        windowWidth: element.scrollWidth,                  // set window width
        windowHeight: element.scrollHeight,                // set window height
        // Modify the cloned DOM before rendering, ensuring all styles are visible
        onclone: (clonedDoc) => {
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

      // Initialize a new jsPDF instance (portrait, mm units, A4 size)
      const pdf = new jsPDF('p', 'mm', 'a4');

      // Convert the canvas to an image (PNG format)
      const imgData = canvas.toDataURL('image/png', 1.0);

      // Calculate proportional height for A4 paper
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add the image to the PDF and save it
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');

    } catch (error) {
      // Log any error that occurs during the PDF generation process
      console.error("PDF generation failed:", error);
    } finally {
      // Restore original styles of the preview element and body
      element.style.boxShadow = '';
      document.body.style.background = '';
      Object.assign(element.style, originalStyles);
    }
  };


  useEffect(() => {
    // Create a <style> tag dynamically // Create a <style> tag dynamically
    const style = document.createElement("style");
    // Set its contents to custom @media print CSS

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
    // Add this <style> tag to the document head
    document.head.appendChild(style);

    // Cleanup function: remove the style when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);


  // update the styles in the app
  const updateStyles = (newStyles) => {
    setCustomStyles((prev) => ({ ...prev, ...newStyles }));
  };

  // display preview in full screen 
  const handleSubmit = () => {
    setShowForm(false);
    setActiveTab("preview")
  }

  // display the form and preview sections
  const handleEditClick = () => {
    setShowForm(true);
    setActiveTab('content')
  }
  
  
  return (
    <>
      {/* Always render form + preview */}
      <div className="app">
        <div className="container">
          {/* Left Side: Form and Navbar section, shown only if form is not hidden  */}
          {showForm && (
            <div className="form-navbar-container">
              {/* Navbar for switching tabs and selecting layout styles */}
              <Navbar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                handleStylePage={handleStylePage} 
                currentLayout={currentLayout} />
              {/* Conditionally render form fields if the active tab is "content" */}
              {activeTab === "content" && (
                <FormSection
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleSubmit}
                  visibleSections={visibleSections}
                  setVisibleSections={setVisibleSections}
                />
              )}
              {/* Conditionally render style customization if the tab is "style" */}
              {activeTab === "style" &&
                renderEditStyle()
              }
            </div>
          )}

          {/* Right Side: Preview and layout thumbnails */}
          <div className={`preview-container ${activeTab === "preview" ? "full-width" : ""}`}>
            {/* Resume preview area */}
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
            {/* Layout selector thumbnails below preview */}
            <Layout
              currentLayout={currentLayout}
              handleLayoutClick={handleLayoutClick}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              images={images}
              image={image}
              setImage={setImage}
            />
            {/* Action buttons: Only show on "preview" tab */}.''
            {activeTab === "preview" && (
              <div className="full-preview-btns">
                <button onClick={() => handleDownloadPDF()}>Download as PDF</button>
                <button className="edit-btn" onClick={handleEditClick}>Edit</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Optional intro overlay component, shown only on first visit */}
      {showIntro && (
        <IntroPages onFinish={onFinish} />
      )}
    </>
  );
}

export default App;



// tabled structure of return statement


// Feature	-------------------------- Purpose
// showForm	-------------------------- Toggles visibility of the form section
// activeTab	------------------------ Determines whether the user is editing content, styles, or previewing
// previewRef	------------------------ Reference to the preview DOM node for generating a PDF
// showIntro	------------------------ Displays an intro/tutorial overlay on first visit
// handleDownloadPDF()	-------------- Triggered to generate and download the resume as PDF
// handleEditClick()	---------------- Switches back to editing mode from preview
// onfinish()	------------------------ Redirects to the main page of the app
// handleSubmit()	--------------------- Switches to preview mode from form
// handleMouseEnter() ---------------- Toggles visibility of the layout thumbnails
// handleMouseLeave() ---------------- Toggles visibility of the layout thumbnails
// handleLayoutClick() --------------- 
// setVisibleSections ----------------- Sets the visibility of sections in the form
// 