// Preview.jsx
import React from 'react';
import Preview from './Preview';
import PreviewTwo from './PreviewTwo';
import PreviewThree from './PreviewThree';


const PreviewDisplay = ({currentLayout,visibleSections,...otherProps}) => {

 

    // props for Preview
  const getLayoutComponent = () => {
    console.log("Rendering layout:", currentLayout);
    switch (currentLayout) {
      case 'layout1':
        return <Preview visibleSections={visibleSections} {...otherProps} />
      case 'layout2':
        return <PreviewTwo visibleSections={visibleSections} {...otherProps} />
      case 'layout3':
        return  <PreviewThree visibleSections={visibleSections} {...otherProps} />
      default:
        return  null;
    }
  }

   const layoutComponent = getLayoutComponent();

  


  return layoutComponent ? (
  <>
    {React.cloneElement(layoutComponent, { key: currentLayout })}
  </>
  ): null;
};

export default PreviewDisplay;
