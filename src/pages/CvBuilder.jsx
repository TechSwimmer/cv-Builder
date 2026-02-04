import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import API from '../../src/api';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Components
import FormWizard from "../components/FormWizard";
import BuilderNavbar from "../components/BuilderNavbar";
import PreviewDisplay from "../components/PreviewDisplay";
import LayoutDrawer from "../components/layoutDrawer";
import EditStyle from "../components/EditStyle";
import EditStyleTwo from "../components/EditStyleTwo";
import EditStyleThree from "../components/EditStyleThree";
import SaveCvModal from "../components/SaveCVModal";


// Layouts for PDF export
import PDFlayoutOne from "../components/PDFlayoutOne";
import PdfLayoutTwo from "../components/PdfLayoutTwo";
import PdfLayoutThree from "../components/PdfLayoutThree";

// Images
import layoutOne from "../images/layout1.png";
import layoutTwo from "../images/layout2.png";
import layoutThree from "../images/layout3.png";

// Styles
import "../styles/IntroStyles.css";
import "../styles/App.css";

// Constants
const INITIAL_FORM_DATA = {
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
  education: [{
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
    achievements: {
      title: "",
      points: [""]
    }
  }],
  skills: [{ skill: "" }],
  experience: [{
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    location: "",
    achievements: {
      title: "",
      points: [""]
    }
  }],
  projects: [{
    title: "",
    company: "",
    description: "",
    skillsUsed: [],
    keyFeatures: [],
    link: "",
  }],
  hobbies: [{
    title: "",
    description: ""
  }],
  languages: [{
    language: "",
    proficiency: "",
  }],
  custom: [{
    title: "",
    type: "text",
    description: "",
    listItems: [""],
    phone: "",
    email: "",
    links: [""],
  }],
};

const INITIAL_STYLES = {
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
  bodyBgColor: "#ffffff",
  skillTabColor: "aqua",
  textColorSkillTab: "#000000",
  fontFamilyHeader: "Lucida Console, monospace",
  fontFamilyContent: "Lucida Console, monospace",
  fontSize: "16px",
};

const CvBuilder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // State
  const [activeTab, setActiveTab] = useState("content");
  const [showForm, setShowForm] = useState(true);
  const [showPDFLayout, setShowPDFLayout] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [currentLayout, setCurrentLayout] = useState('layout1');
  const [selectedEditStyle, setSelectedEditStyle] = useState('EditStyle');
  const [cvName, setCvName] = useState('');
  const [username, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customStyles, setCustomStyles] = useState(INITIAL_STYLES);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [visibleSections, setVisibleSections] = useState({
    education: true,
    experience: true,
    projects: true,
    skills: true,
    summary: true,
    hobbies: true,
    languages: true,
    custom: true,
  });

  // Refs
  const previewRef = useRef();
  const pdfRef = useRef();
  const cvId = searchParams.get('id');
  const token = localStorage.getItem('token');

  // Effects
  useEffect(() => {
    // Set initial layout and style
    setSelectedEditStyle('EditStyle');
    handleStylePage('layout1');
  }, []);

  useEffect(() => {
    // Handle responsive styles
    const updateStyles = () => {
      if (window.innerWidth <= 840) {
        setCustomStyles(prev => ({
          ...prev,
          fontNameSize: "16px",
          fontHeaderSize: "12px",
          fontContentSize: "10px",
        }));
      } else {
        setCustomStyles(INITIAL_STYLES);
      }
    };

    updateStyles();
    window.addEventListener("resize", updateStyles);
    return () => window.removeEventListener("resize", updateStyles);
  }, []);

  useEffect(() => {
    // Load existing CV if editing
    if (cvId && token) {
      const loadCV = async () => {
        try {
          const res = await API.get(`/api/cv/${cvId}`);
          const { formData: fetchedFormData, customStyles: fetchedStyles,
            visibleSections: fetchedVisibleSections, layout, title } = res.data;

          setFormData(fetchedFormData || INITIAL_FORM_DATA);
          setCustomStyles(fetchedStyles || INITIAL_STYLES);
          setVisibleSections(fetchedVisibleSections || visibleSections);
          setCurrentLayout(layout || 'layout1');
          setCvName(title || '');

          // Set appropriate edit style component
          handleStylePage(layout || 'layout1');
        } catch (err) {
          console.error('Failed to load CV:', err);
          alert('Failed to load CV. Please try again.');
        }
      };
      loadCV();
    }
  }, [cvId, token]);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (!token && !sessionStorage.getItem('cvAlertShown')) {
      setTimeout(() => {
        alert('You are browsing as a guest. Log in to save or delete CVs.');
        sessionStorage.setItem('cvAlertShown', 'true');
      }, 1000);
    }
  }, []);

  // Handlers
  const handleLayoutClick = useCallback((layout) => {
    const layoutMap = {
      layout1: { style: 'EditStyle', image: layoutOne },
      layout2: { style: 'EditStyleTwo', image: layoutTwo },
      layout3: { style: 'EditStyleThree', image: layoutThree },
    };

    const layoutConfig = layoutMap[layout] || layoutMap.layout1;

    setCurrentLayout(layout);
    setSelectedEditStyle(layoutConfig.style);

    // Toggle layout slider
    const layoutSlider = document.querySelector(".layout-slider");
    if (layoutSlider) {
      layoutSlider.classList.toggle("show");
    }
  }, []);

  const handleStylePage = useCallback((layout) => {
    const styleMap = {
      layout1: 'EditStyle',
      layout2: 'EditStyleTwo',
      layout3: 'EditStyleThree',
    };
    setSelectedEditStyle(styleMap[layout] || 'EditStyle');
  }, []);

  const generateThumbnail = useCallback(async () => {
    const element = previewRef.current;
    if (!element) return null;

    try {
      const canvas = await html2canvas(element, {
        scale: 0.4,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      return null;
    }
  }, []);

  const saveCvToBackend = useCallback(async () => {
    if (!formData || !currentLayout) {
      alert('Please complete all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to save CV');
        return;
      }

      const thumbnail = await generateThumbnail();
      const payload = {
        title: cvName.trim() || 'Untitled CV',
        data: formData,
        layout: currentLayout,
        customStyles,
        visibleSections,
        thumbnail
      };

      if (cvId) {
        // Update existing CV
        await API.put(`/api/cv/${cvId}`, payload);
        alert('CV updated successfully!');
      } else {
        // Create new CV
        const res = await API.post('/api/cv/create', payload);
        alert('New CV saved successfully!');
        navigate(`/builder?id=${res.data._id}`);
      }

      setShowSaveDialog(false);
    } catch (err) {
      console.error('Error saving CV:', err.response?.data || err.message);
      alert('Failed to save CV. Please try again.');
    }
  }, [cvId, cvName, currentLayout, formData, customStyles, visibleSections, navigate, generateThumbnail]);

  const waitForPDF = useCallback(() =>
    new Promise((resolve, reject) => {
      const maxWaitTime = 10000; // 10 seconds max
      const startTime = Date.now();

      const check = () => {
        const root = pdfRef.current;

        if (!root) {
          if (Date.now() - startTime > maxWaitTime) {
            reject(new Error('PDF root not found after timeout'));
            return;
          }
          requestAnimationFrame(check);
          return;
        }

        // Try multiple ways to detect readiness
        const pages = root.querySelectorAll(".pdf-page");
        const hasPages = pages.length > 0;

        // Check for data-ready attribute or any content
        const isReady = root.querySelector(".pdf-pages")?.dataset.ready === "true" ||
          hasPages ||
          root.innerHTML.includes("pdf-page");

        if (isReady) {
          console.log('PDF ready with', pages.length, 'pages');
          resolve();
        } else if (Date.now() - startTime > maxWaitTime) {
          console.warn('Proceeding with PDF generation despite timeout');
          resolve(); // Try anyway
        } else {
          requestAnimationFrame(check);
        }
      };

      check();
    }), []);
  const handleDownloadPDF = useCallback(async () => {
    try {
      // 1. Set PDF mode first
      setActiveTab("preview");
      setShowForm(false);
      setShowPDFLayout(true);

      // 2. Force a re-render to ensure PDF layout mounts
      await new Promise(resolve => setTimeout(resolve, 300));

      // 3. Wait for PDF layout to be fully rendered
      await waitForPDF();

      const root = pdfRef.current;
      if (!root) {
        console.error("PDF root element not found");
        alert('PDF generation failed: Root element missing');
        return;
      }

      const pages = root.querySelectorAll(".pdf-page");
      console.log('Found PDF pages:', pages.length);

      if (pages.length === 0) {
        // Try alternative selector
        const altPages = root.querySelectorAll("[class*='page']");
        console.log('Alternative pages found:', altPages.length);

        if (altPages.length === 0) {
          alert('No content found for PDF generation');
          return;
        }
      }

      const pdf = new jsPDF("p", "mm", "a4");
      const targetPages = pages.length > 0 ? pages : root.querySelectorAll("[class*='page']");

      for (let i = 0; i < targetPages.length; i++) {
        const page = targetPages[i];

        // Make page visible temporarily
        const originalDisplay = page.style.display;
        page.style.display = 'block';

        try {
          const canvas = await html2canvas(page, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            removeContainer: true,
            logging: true, // Enable for debugging
            onclone: (clonedDoc) => {
              // Ensure all styles are applied in the clone
              const clonedPage = clonedDoc.querySelectorAll(".pdf-page")[i];
              if (clonedPage) {
                clonedPage.style.visibility = 'visible';
                clonedPage.style.opacity = '1';
                clonedPage.style.position = 'static';
              }
            }
          });

          const imgData = canvas.toDataURL("image/jpeg", 1.0);

          if (i > 0) {
            pdf.addPage();
          }

          pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, "", "FAST");

          // Restore original display
          page.style.display = originalDisplay;

        } catch (canvasError) {
          console.error('Error capturing page', i, canvasError);
          // Continue with next page
        }
      }

      pdf.save(`${cvName.trim() || 'resume'}.pdf`);
      setShowPDFLayout(false);

    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF generation failed. Please try again.');
      setShowPDFLayout(false);
    }
  }, [waitForPDF, cvName]);

  const updateStyles = useCallback((newStyles) => {
    setCustomStyles(prev => ({ ...prev, ...newStyles }));
  }, []);

  const handleSubmit = () => {
    setShowForm(false);
    setActiveTab("preview");
  };

  const handleEditClick = () => {
    setShowForm(true);
    setActiveTab('content');
  };

  // Component renderers
  const renderEditStyle = () => {
    const styleComponents = {
      EditStyle: (
        <EditStyle
          customStyles={customStyles}
          setCustomStyles={setCustomStyles}
          updateStyles={updateStyles}
        />
      ),
      EditStyleTwo: (
        <EditStyleTwo
          customStyles={customStyles}
          setCustomStyles={setCustomStyles}
          updateStyles={updateStyles}
        />
      ),
      EditStyleThree: (
        <EditStyleThree
          customStyles={customStyles}
          setCustomStyles={setCustomStyles}
          updateStyles={updateStyles}
        />
      ),
    };
    return styleComponents[selectedEditStyle] || null;
  };

  const renderPDFLayout = () => {
    if (!showPDFLayout) return null;

    const pdfProps = { ...formData, visibleSections };
    const pdfComponents = {
      layout1: <PDFlayoutOne ref={pdfRef} {...pdfProps} />,
      layout2: <PdfLayoutTwo ref={pdfRef} {...pdfProps} />,
      layout3: <PdfLayoutThree ref={pdfRef} {...pdfProps} />,
    };

    return (
      <div className="pdf-generator">
        {pdfComponents[currentLayout] || pdfComponents.layout1}
      </div>
    );
  };
 


  return (
    <>
      <div className="cv-builder-app">
        <BuilderNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentLayout={currentLayout}
          isLoggedIn={isLoggedIn}
          handleLayoutClick={handleLayoutClick}
          handleDownloadPDF={handleDownloadPDF}
          showSaveDialog={showSaveDialog}
          setShowSaveDialog={setShowSaveDialog}
          showForm={showForm}
          setShowForm={setShowForm}
          navigateToDashboard={navigate}
          username={username}
          setUserName={setUserName}
          onSubmit={handleSubmit}
        />

        <div className="cv-builder-container">
          {showForm && (
            <div className="cv-builder-form-container">
              {activeTab === "content" && (
                <div className="form-wizard-wrapper">
                  <FormWizard
                    formData={formData}
                    setFormData={setFormData}
                    visibleSections={visibleSections}
                    setVisibleSections={setVisibleSections}
                  />
                </div>
              )}
              {activeTab === "style" && (
                <div className="edit-style-wrapper">
                  {renderEditStyle()}
                </div>
              )}
            </div>
          )}

          <div className={`cv-builder-preview-container ${!showForm ? 'full-screen' : ''}`}>
            <PreviewDisplay
              ref={previewRef}
              {...formData}
              style={customStyles}
              visibleSections={visibleSections}
              currentLayout={currentLayout}
              handleLayoutClick={handleLayoutClick}
              isFullScreen={activeTab === "preview"}
            />

            <LayoutDrawer
              handleLayoutClick={handleLayoutClick}
              images={{ layoutOne, layoutTwo, layoutThree }}
              currentImage={currentLayout === 'layout1' ? layoutOne :
                currentLayout === 'layout2' ? layoutTwo : layoutThree}
            />

           
          </div>
        </div>
      </div>

      {showSaveDialog && (
        <SaveCVModal
          cvName={cvName}
          setCvName={setCvName}
          onSave={saveCvToBackend}
          onClose={() => setShowSaveDialog(false)}
        />
      )}

      {renderPDFLayout()}
    </>
  );
};

export default CvBuilder;