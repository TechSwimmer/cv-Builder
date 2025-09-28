import React,{useState, useEffect,useCallback} from "react";
import Preview from "./Preview";

// import { image } from "html2canvas/dist/types/css/types/image";

    const Layout = ({  handleLayoutClick, handleMouseEnter, handleMouseLeave,images,image }) => {

        const [showSlider, setShowSlider] = useState(false);
        const [isMobile,setIsMobile] = useState(() => window.matchMedia("(max-width:840px0)").matches);


      // keep in sync with screen resize

      useEffect(() => {
        const mq = window.matchMedia("(max-width:840px)");;
        const handler = (e) => {
          setIsMobile(e.matches);
          // close slider on breakpoint change (prevents weird states)
          setShowSlider(false);
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
      },[]);

      // Desktop hover open/close
      const onEnter = useCallback(
        (e) => {
          if (!isMobile){
            setShowSlider(true);
            handleMouseEnter?.(e);
          }
        },
        [isMobile, handleMouseEnter]
      );

      const onLeave = useCallback(
        (e) => {
          if(!isMobile) {
            setShowSlider(false);
            handleMouseLeave?.(e);
          }
        },
        [isMobile, handleMouseLeave]
      );

      // Mobile click toggle 

        const toggleSlider = useCallback(() => {
          if (isMobile) setShowSlider((s) => !s);
        },[isMobile])

        const selectLayout = (layout) => {
          handleLayoutClick(layout);
          if (isMobile) setShowSlider(false);

        };
   

    
    return (
        <div className="layout-switcher" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {/* Layout Button */}
      <button className="layout-btn" onClick={toggleSlider}  aria-expanded={showSlider} aria-controls="layout-slider-menu">
        <img src={image} className="selected-layout-img" alt="layout" />
      </button>

      {/* Layout Slider */}
      <div className={`layout-slider ${showSlider ? "show" : ""} ${isMobile ? "mobile" : "desktop"}`} role="menu">
        <button className="layout-option" role="menuitem" onClick={() => selectLayout("layout1")}>
          <img src={images.layoutOne} alt="layout 1" />
          <p>Layout 1</p>
        </button>
        <button className="layout-option" role="menuitem" onClick={() => selectLayout("layout2")}>
          <img src={images.layoutTwo} alt="layout 2" />
          <p>Layout 2</p>
        </button>
        <button className="layout-option" role="menuitem" onClick={() => selectLayout("layout3")}>
          <img src={images.layoutThree} alt="layout 3" />
          <p>Layout 3</p>
        </button>
      </div>
    </div>
    )
}


export default Layout;