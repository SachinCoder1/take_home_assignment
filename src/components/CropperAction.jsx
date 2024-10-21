import React from 'react';
import Button from './ui/Button';

const CropperActions = ({ handleStartCropper, handleRemoveCropper, isCropperActive,generatePreview }) => {
  return (
    <div className='items-center md:flex gap-x-4'>
      <Button onClick={handleStartCropper} disabled={isCropperActive}>
        Start Cropper
      </Button>
      <Button onClick={generatePreview} disabled={!isCropperActive}>
        Generate Preview
      </Button>
      <Button onClick={handleRemoveCropper} disabled={!isCropperActive}>
        Remove Cropper
      </Button>
    </div>
  );
};

export default CropperActions;
