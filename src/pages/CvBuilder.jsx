
// import essential react hooks for the App component
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import API from '../../src/api'



// import the style pages for all the previews
import EditStyle from "../components/EditStyle";
import EditStyleTwo from "../components/EditStyleTwo";
import EditStyleThree from "../components/EditStyleThree";

// import the navbar component (btns to select formSection and EditStyle page)
import Navbar from "../components/Navbar";

// intropages shows a couple of pages to explain how to create a cv in this app
import IntroPages from "../components/Intropages";

// style pages for intropages and app.jsx
import "../styles/IntroStyles.css"
import "../styles/App.css";

// FormSection is the form where user inputs the data i.e. to be displayed on the cv
import FormSection from "../components/FormSection";

// import html2canvas and jspdf to download the cv in PDF format
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// PreviewDisplay ensures that the correct preview is displayed with the appropriate data.
import PreviewDisplay from "../components/PreviewDisplay";

// Layout.jsx helps us to display proper preview layout w.r.t. the clicked img btn
import Layout from "../components/Layout";

// import preview images to be displayed as btns where user can click and change the preview 
import layoutOne from "../images/layout1.png";
import layoutTwo from "../images/layout2.png";
import layoutThree from "../images/layout3.png";



const CvBuilder = () => {
    
    const [searchParams] = useSearchParams();
    const cvId = searchParams.get('id');
    const navigate = useNavigate();
    // state variables
    const [image, setImage] = useState(layoutOne);                         // image to be displayed as btn

    // const [previewComponent, setPreviewComponent] = useState(<Preview />); // preview component to be displayed

    const [currentLayout, setCurrentLayout] = useState('layout1');         // current preview layout

    const [selectedEditStyle, setSelectedEditStyle] = useState(null);       // current edit style page

    const [showSaveDialog, setShowSaveDialog] = useState(false);            // to show the niput field for naming cv

    const [cvName, setCvName] = useState('');                               // set the name of cv

    const [activeTab, setActiveTab] = useState("content");                 // toggle between editstyle and formsection page

    const [showForm, setShowForm] = useState(true);                        // toggle full screen mode for preview

    // display the save and delete btn if the user is logged in else no save and del btns
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const token = localStorage.getItem('token');
    

    const desktopStyles = {
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
    };



    const mobileStyles = {
        ...desktopStyles,
        fontNameSize:"16px",
        fontHeaderSize: "12px",
        fontContentSize: "10px",
    };

    const [customStyles, setCustomStyles] = useState(desktopStyles)                     // store all the styles for all the preview            ;
  
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


    // style w.r.t. screen size
    useEffect(() => {

        const updateStyles = () => {
            if(window.innerWidth <= 840) {
                setCustomStyles(mobileStyles)
            }
            else{
                setCustomStyles(desktopStyles);
            }
        };

        // set the style intially
        updateStyles();


        // Listen to resize events
        window.addEventListener("resize", updateStyles);
        return () => window.removeEventListener("resize",updateStyles);
    },[]);


    useEffect(() => {
        if(cvId && token) {
            axios.get(`/api/cv/${cvId}`, {
                headers: { Authorization:`Bearer ${token}` },
            }).then(res => {
               const { formData:fetchedFormData, customStyles, visibleSections:fetchedVisibleSections,layout } = res.data;

               setFormData(fetchedFormData);

               setCustomStyles(customStyles || {});
               setVisibleSections({
                summary:true,
                education:true,
                experience:true,
                projects:true,
                skills:true,
                hobbies:true,
                languages:true,
                custom:true,
                ...fetchedVisibleSections
               });
               setCurrentLayout(layout || 'layout 1')
               console.log(cvId)
               console.log(fetchedFormData,customStyles,visibleSections)
            })
            .catch(err => {
                console.error('Failed to load CV:', err) 
            });

        }
    }, [cvId,token])



    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        console.log(token)
        const alertShown = sessionStorage.getItem('cvAlertShown');

        if(!token) {
            alert('You are browsing as a guest. Log in to save or delete CVs.');
            sessionStorage.setItem('cvAlertShown', 'true');
        }
    }, []);


     // save cv to backend
    
    //   const saveCvtoBackend = async (data) => {
    
    
    
    //     try{
    //       const res = await API.post('/cv/create', {
    //         title:cvName,
    //         data: formData,
            
    //         layout: currentLayout,
    //         customStyles,
    //         visibleSections,
    //       },{
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('token')}`
    //         }
    //       });
    //       console.log('CV saved:', res.data);
    //       alert('Cv saved to your account');
    //       setShowSaveDialog(false)
    //     }
    //     catch(err) {
    //       console.log('Error saving CV:', err.response?.data, err.message);
    //     }
    //   };


      const saveCvtoBackend =  async(data) => {
        const payload = {
            title:cvName,
            data:formData,
            layout:currentLayout,
            customStyles,
            visibleSections
        };

        try{
            const token = localStorage.getItem('token');

            if(cvId) {
                // ======== UPDATE EXISTING CV ==========
                const res = await API.put(`/cv/${cvId}`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert('CV updated  successfully!');
            }
            else{
                // ========== CREATE NEW CV============

                const res = await API.post('/cv/create', payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert('New CV saved successfully!')

                // you may want to redirect or update cvId in URL
                navigate(`/builder?id=${res.data._id}`)           // optional
            }

            setShowSaveDialog(false);
        }
        catch(err) {
            console.error('Error saving CV:', err.response?.data || err.message);
            alert('Failed to save CV');
        }


      };

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


    // useEffect(() => {
    //     console.log("Updated currentLayout is:", currentLayout);
    // }, [currentLayout]);


    // Function to handle layout selection when a layout button/image is clicked

    const handleLayoutClick = (layout) => {
        let layoutName = layout
        setCurrentLayout(layoutName)
        console.log(layout)
        // Update the current layout state

        

        // Toggle the visibility of the layout slider menu

        const layoutSlider = document.querySelector(".layout-slider");
        layoutSlider.classList.toggle("show");

        

        // Render the corresponding preview component and update the preview image
        if (layout === "layout2") {
            // setPreviewComponent(<PreviewTwo />);            // set previewTwo
            layoutName = 'layout2'
            setImage(layoutTwo)                             //  update the preview page
        }
        else if (layout === "layout3") {
            // setPreviewComponent(<PreviewThree />)           // set previewThree
            layoutName = 'layout3'
            setImage(layoutThree)                           // update the preview page    
        }
        else if (layout === "layout1") {
            // setPreviewComponent(<Preview />)                // set preview
            layoutName = 'layout1' 
            setImage(layoutOne)                             // update the preview page
        }

        
        // Set the appropriate EditStyle component for the selected layout
        handleStylePage(layoutName)
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



    // create a reference using useRef to print the cv in PDF format
    const previewRef = useRef();

    // logic to download the preview component in PDF format
    const handleDownloadPDF = async () => {
        // Ensure preview is visible and rendered
        setActiveTab("preview");
        setShowForm(false);

        // Small delay to allow DOM update
        await new Promise(resolve => setTimeout(resolve, 2000));

        // get a reference to the preview DOM element
        const element = previewRef.current;


        // Temporary style adjustments for capture
        const originalStyles = {
            position: element.style.position,
            overflow: element.style.overflow,
            height: element.style.height,
            width:element.style.width,
            boxShadow: element.style.boxShadow,
        };

        // set values for temporary style adjustments
        element.style.position = 'absolute';
        element.style.overflow = 'visible';
        element.style.height = element.scrollHeight + "px";
        element.style.width = element.scrollWidth + "px";

        // Scroll the element into view before taking a snapshot
        // element.scrollIntoView({ behavior: "auto", block: "start" });

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
                scrollY: 0,                       // enable height based scrolling before screenshot
                scrollX:0,
                width:element.scrollWidth,
                height:element.scrollHeight,
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

            // Initialize a new jsPDF instance 
            const pxToMm = (px) => px * 0.264583;
            const pageWidth = pxToMm(canvas.width)
            const pageHeight = pxToMm(canvas.height)
            const pdf = new jsPDF('p', 'mm', [pageWidth,pageHeight]);

          

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


//  useEffect(() => {
//     const style = document.createElement("style");
    
//     style.innerHTML = `
//     @media print {
//         /* Hide everything by default */
//         body * {
//             visibility: hidden;
//         }
        
//         /* Show all three preview layout types and their children */
//         .cv-preview, 
//         .cv-preview *,
//         .cv-2-preview,
//         .cv-2-preview *,
//         .cv-preview-container-3,
//         .cv-preview-container-3 * {
//             visibility: visible !important;
//         }
        
//         /* Position and size all preview layouts for printing */
//         .cv-preview,
//         .cv-2-preview, 
//         .cv-preview-container-3 {
//             position: absolute !important;
//             left: 0 !important;
//             top: 0 !important;
//             width: 100% !important;
//             height: auto !important;
//             margin: 0 !important;
//             padding: 0 !important;
//             box-shadow: none !important;
//             border: none !important;
//             background: white !important;
//         }
        
//         /* Ensure proper content sizing within previews */
//         .cv-preview .preview-section-left,
//         .cv-preview .preview-section-right,
//         .cv-2-preview .cv-2-content,
//         .cv-preview-container-3 .cv-preview-3{
//             width: 100% !important;
//             height: auto !important;
//         }
        
//         /* Hide all UI controls during printing */
//         .full-preview-btns,
//         .layout-switcher,
//         .layout-slider,
//         .layout-btn,
//         .cv-navbar,
//         .form-section,
//         .form-navbar-container,
//         .back-btn,
//         .edit-btn,
//         .modal-overlay,
//         .modal-box {
//             display: none !important;
//             visibility: hidden !important;
//         }
        
//         /* Page break control for all layouts */
//         .cv-preview,
//         .cv-2-preview,
//         .cv-preview-container-3 {
//             page-break-after: avoid;
//             page-break-inside: avoid;
//         }
        
//         /* Ensure black text and white background for printing */
//         .cv-preview *,
//         .cv-2-preview *,
//         .cv-preview-container-3 * {
//             color: #000000 !important;
//             background-color: #ffffff !important;
//         }
        
//         /* Specific adjustments for Layout 2 */
//         .cv-2-preview .cv-2-header,
//         .cv-2-preview .cv-2-body {
//             width: 100% !important;
//             display: block !important;
//         }
        
//         /* Specific adjustments for Layout 3 */
//         .cv-preview-container-3 .cv-preview-3 .cv-3-left{
//             width:65% !important;
//             display: block !important;
//         }
//         .cv-preview-container-3 .cv-preview-3 .cv-3-right {
//             width: 35% !important;
//             display: block !important;
//         }
//     }
//     `;
    
//     document.head.appendChild(style);
    
//     return () => {
//         document.head.removeChild(style);
//     };
// }, []);


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
                        <button
                            className="back-btn"
                            onClick={() => navigate('/dashboard')}
                        >
                            Dashboard
                        </button>
                        {/* Resume preview area */}
                        <PreviewDisplay
                            ref={previewRef}
                            {...formData}
                            style={customStyles}
                            visibleSections={visibleSections}
                            // previewComponent={previewComponent}
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
                                {isLoggedIn && (
                                    <>
                                    <button className="edit-btn" onClick={handleEditClick}>Delete</button>
                                    <button onClick={() => setShowSaveDialog(true)}>
                                   
                                    Save CV
                                </button>
                                 </>
                                )}
                              
                                <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                                
                                
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showSaveDialog && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h3>Name your CV</h3>
                        <input
                            type="text"
                            value={cvName}
                            onChange={(e) => setCvName(e.target.value)}
                            placeholder="e.g., Frontend Resume, Freelance C.V."
                        />
                    <div className="modal-buttons">
                        <button onClick={() => saveCvtoBackend()}>Save CV</button>
                        <button onClick={() => setShowSaveDialog(false)}>Back</button>
                    </div>
                    </div>
                </div>
            )}
           
        </>
    )
}

export default CvBuilder;