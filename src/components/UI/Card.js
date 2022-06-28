import PropTypes from 'prop-types';
import './Card.css';

CardContainer.propTypes = {
  className: PropTypes.string
};

export function CardContainer({ children, className }) {
  return (
    <div className={"CardContainer "+className}>
      {children}
    </div>
  );
}

Card.propTypes = {
  onClick: PropTypes.func,
  isParentHovering: PropTypes.bool
};

export function Card({ children, onClick, isParentHovering=false }) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div className={"Card " + (isParentHovering && "Hovering")} onClick={onClick}>
      {children}
    </div>
  );
}
