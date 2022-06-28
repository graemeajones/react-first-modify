import './Badge.css';


export default function Badge({ children, background }) {
  // Properies -----------------------------------
  // Hooks ---------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div className="Badge" style={{ background: background }}>
      {children}
    </div>
  );
}