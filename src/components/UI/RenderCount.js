import { useRef } from 'react';
import Badge from './Badge.js';

const renderCountStyling = { position: "relative" };

export default function RenterCount({background}) {
  // Properies -----------------------------------
  // Hooks ---------------------------------------
  const renderCount = useRef(0);
  renderCount.current += 1;
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div style={renderCountStyling}>
      <Badge background={background}>
        {renderCount.current}
      </Badge>
    </div>
  );
}
