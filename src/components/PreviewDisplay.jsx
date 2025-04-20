// Preview.jsx
import React from 'react';
import Preview from './Preview';
import PreviewTwo from './PreviewTwo';
import PreviewThree from './PreviewThree';


const PreviewDisplay = (props) => {

    // props for Preview
  const { previewComponent, ...otherProps } = props;

  


  return (
    <div>
       {React.cloneElement(previewComponent, otherProps)}
    </div>
  );
};

export default PreviewDisplay;
