import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import API from '../../src/api';

import html2canvas from "html2canvas";
import { PDFViewer } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
// import PDF layouts 
import PDFlayoutOne from "../components/pdf components/Layout-One/LayoutOnePDF.jsx";
import PDFlayoutTwo from "../components/pdf components/Layout-Two/LayoutTwoPDF.jsx";
import PDFlayoutThree from "../components/pdf components/Layout-Three/LayoutThreePDF.jsx";


// Components
import FormWizard from "../components/form components/FormWizard";
import BuilderNavbar from "../components/navbar components/BuilderNavbar";
import PreviewDisplay from "../components/preview components/PreviewDisplay";
import LayoutDrawer from "../components/layout components/layoutDrawer";
import EditStyle from "../components/style components/EditStyle";
import EditStyleTwo from "../components/style components/EditStyleTwo";
import EditStyleThree from "../components/style components/EditStyleThree";
import SaveCVModal from "../components/navbar components/SaveCVModal";

import { useLocation  } from "react-router-dom";


// Images
import layoutOne from "../images/layout1.png";
import layoutTwo from "../images/layout2.png";
import layoutThree from "../images/layout3.png";

// Styles
import "../styles/pages styles/App.css";

// upload resume function 
import { uploadResume } from "../services/resumeUpload.service.js"

import { normalizeImportedResume } from "../services/normalizeImportedResume.js";

// Constants
export const INITIAL_FORM_DATA = {
  generalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    github: "",
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
    keyFeatures: {
      title:"",
      points:[""]
    },
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
  custom: {
    title: "",
    type: "text",
    description: "",
    listItems: [""],
    phone: "",
    email: "",
    links: [""],
  },
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

const CvBuilder = ({setGlobalLoading}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // State
  const [activeTab, setActiveTab] = useState("content");
  const [showForm, setShowForm] = useState(true);

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

  const location = useLocation();

  // Refs
  const previewRef = useRef();

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
    setUserName(localStorage.getItem('username'))
    setIsLoggedIn(!!token);
   
    if (!token && !sessionStorage.getItem('cvAlertShown')) {
      setTimeout(() => {
        alert('You are browsing as a guest. Log in to save or delete CVs.');
        sessionStorage.setItem('cvAlertShown', 'true');
      }, 1000);
    }
  }, []);


  // insert parsed data from uploadResume to form

  useEffect(() => {
    const imported = sessionStorage.getItem("importedResume")
    if (!imported) return;

    try {
      const parsed = JSON.parse(imported);

      // convert AI response -> app strcture
      const normalized = normalizeImportedResume(parsed)

      setFormData(normalized);

      // clear temp data
      sessionStorage.removeItem("")
    }
    catch(err){
       console.error("Failed to load imported resume", err);
    }
  }, [location.key])
 

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


  const handleDownloadPDF = async () => {
    const blob = await pdf(
      getPdfLayout(currentLayout, {
        ...formData,
        visibleSections
      })
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cvName || "resume"}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

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

  const getPdfLayout = (layout, props) => {
    switch (layout) {
      case "layout1":
        return <PDFlayoutOne {...props} />;
      case "layout2":
        return <PDFlayoutTwo {...props} />;
      case "layout3":
        return <PDFlayoutThree {...props} />;
      default:
        return <PDFlayoutOne {...props} />;
    }
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
          setGlobalLoading={setGlobalLoading}
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

                </div>
              )}
            </div>
          )}

          <div className={`cv-builder-preview-container ${activeTab === "preview" ? 'full-screen' : ''}`}>

            {activeTab !== "preview" && (
              <PreviewDisplay
                ref={previewRef}
                {...formData}
                style={customStyles}
                visibleSections={visibleSections}
                currentLayout={currentLayout}
              />
            )}

            {/* React-PDF fullscreen preview */}
            {activeTab === "preview" && (
              <PDFViewer width="100%" height="600">
                {getPdfLayout(currentLayout, {
                  ...formData,
                  visibleSections
                })}
              </PDFViewer>
            )}


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


    </>
  );
};

export default CvBuilder;



