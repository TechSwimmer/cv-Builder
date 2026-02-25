import React, { forwardRef } from 'react';
import PreviewLayoutThree from '../preview components/PdfLayoutThree';
import PreviewLayoutOne from '../preview components/PDFlayoutOne';
import PreviewLayoutTwo from '../preview components/PdfLayoutTwo';

const PreviewDisplay = forwardRef(({currentLayout, visibleSections, style = {}, ...otherProps}, ref) => {
  
  const getLayoutComponent = () => {
    console.log("Rendering layout:", otherProps);
    switch (currentLayout) {
      case 'layout1':
        return <PreviewLayoutOne visibleSections={visibleSections} style={style} {...otherProps} mode="preview" />;
      case 'layout2':
        return <PreviewLayoutTwo visibleSections={visibleSections} style={style}  {...otherProps} mode="preview" />;
      case 'layout3':
        return <PreviewLayoutThree visibleSections={visibleSections} style={style}  {...otherProps} mode="preview" />;
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