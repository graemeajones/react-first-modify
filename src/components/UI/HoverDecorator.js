import React from 'react';
import { useState } from 'react';

export default function HoverDecorator({ children }) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  const [isHovering, setIsHovering] = useState(false);
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div
      className="HoverDecorator"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {
        React.Children.map(children, (child) => {
          return React.cloneElement(child, { isParentHovering: isHovering });
         })
      }
    </div>
  );
}
