import PropTypes from 'prop-types';
import { useState } from 'react';
import useDimensions from 'react-use-dimensions';
import HoverDecorator from './HoverDecorator.js';
import { Card } from './Card.js';
import './ToolTipDecorator.css';


ToolTipDecorator.propTypes = {
  message: PropTypes.string.isRequired
};

export default function ToolTipDecorator({ children, message }) {
  // Properies -----------------------------------
  // Hooks ---------------------------------------
  const [refParent, dimParent] = useDimensions();
  
  // Methods -------------------------------------
  // View ----------------------------------------
    return (
      <div className="ToolTipDecorator" ref={refParent}>
        <HoverDecorator>
          {children}
          <ToolTip message={message} width={dimParent.width} />
        </HoverDecorator>
      </div>
  );
}

ToolTip.propTypes = {
  message: PropTypes.string.isRequired,
  isParentHovering: PropTypes.bool
};

function ToolTip({message, width: parentWidth, isParentHovering }) {
  // Properies -----------------------------------
  // Hooks ---------------------------------------
  const [annotationStatus, setAnnotationStatus] = useState("NOT_SHOWN");
  const [refChild, dimChild] = useDimensions();

  // Methods -------------------------------------
  const delayStartOfAnnotation = 333; // i.e. millisecs
  const maxDurationOfAnnotation = 2000; // i.e. two seconds

  const startAnnotation = () => {
    setTimeout( () => setAnnotationStatus("SHOWING"), delayStartOfAnnotation ); // Don't start annotation straight away
    setTimeout( () => setAnnotationStatus("SHOWN"), maxDurationOfAnnotation ); // Limit the annotation!
  }

  // View ----------------------------------------
  if (isParentHovering && (annotationStatus==="NOT_SHOWN")) startAnnotation();
  if (!isParentHovering && (annotationStatus!=="NOT_SHOWN")) setAnnotationStatus("NOT_SHOWN")
  
  // Computes the offset to horizontally align the button and tooltip; initially we are not sure of the width so use minimum
  const toolTipMinWidth = 100;
  const renderOffset =
    dimChild.width
      ? 0.5 * (parentWidth - dimChild.width)
      : parentWidth > toolTipMinWidth
        ? 0
        : 0.5 * (parentWidth - toolTipMinWidth);

  return (
    (annotationStatus === "SHOWING") &&
      <Card>
        <div
          className="ToolTip"
          ref={refChild}
          style={{ transform: `translate(${renderOffset}px,3px)` }}
        >
          <p>{message}</p>
        </div>
      </Card>
  );
}
