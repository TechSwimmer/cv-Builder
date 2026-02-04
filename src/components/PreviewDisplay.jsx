import React, { forwardRef } from 'react';
import PDFLayoutThree from './PdfLayoutThree';
import PDFLayoutOne from './PDFlayoutOne';
import PDFLayoutTwo from './PdfLayoutTwo';

const PreviewDisplay = forwardRef(({currentLayout, visibleSections, style = {}, ...otherProps}, ref) => {
  
  const getLayoutComponent = () => {
    console.log("Rendering layout:", currentLayout);
    switch (currentLayout) {
      case 'layout1':
        return <PDFLayoutOne visibleSections={visibleSections} {...otherProps} mode="preview" />;
      case 'layout2':
        return <PDFLayoutTwo visibleSections={visibleSections} {...otherProps} mode="preview" />;
      case 'layout3':
        return <PDFLayoutThree visibleSections={visibleSections} {...otherProps} mode="preview" />;
      default:
        return null;
    }
  };

  const layoutComponent = getLayoutComponent();

  return layoutComponent ? (
    <div className="preview-wrapper">
      <div 
        ref={ref} 
        className="cv-preview-display"
        
      >
        {React.cloneElement(layoutComponent, { key: currentLayout })}
      </div>
    </div>
  ) : null;
});

export default PreviewDisplay;