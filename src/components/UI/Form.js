import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Action from '../UI/Actions.js';
import toCamelCase from '../utils/toCamelCase.js';
import './Form.scss';


Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default function Form({ children, onSubmit, onChange, onCancel }) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <form onSubmit={onSubmit} className="Form Bordered">
      <div className="FormTray">
        {
          // children.map((item) => item)
          React.Children.map(children, (child) => {
            return React.cloneElement(child, { onChange: onChange });
           })
        }
      </div>
      <Action.Tray>
        <Action.Submit showText onClick={onSubmit} />
        <Action.Dismiss showText onClick={onCancel} />
      </Action.Tray>
    </form>
  );
}

Item.propTypes = {
  label: PropTypes.string.isRequired,
  advice: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func
};

function Item({ children, label, advice=null, error=null, onChange }) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  const htmlFor = toCamelCase(label);
  return (
    <div className="FormItem">
      <label className="FormLabel" htmlFor={htmlFor}>{label}</label>
      {
        advice && <p className="FormAdvice">{advice}</p>
      }
      {
        React.cloneElement(children, {
          id: htmlFor,
          className: "FormInput " + (error && "FormError"),
          onChange: onChange
        })
      }
      {
        error && <p className="FormError">{error}</p>
      }
    </div>
  );
}

const useFormState = (initialFormObject) => {

  if (!initialFormObject || (initialFormObject === {}))
    throw new Error("[useFormState] Inital form object with keys must be provided");
    
  // Form State ----------------------------------
  const [formObject, setFormObject] = useState(initialFormObject);
  const [errorObject, setErrorObject] = useState(
    Object.keys(initialFormObject).reduce((accum, key) => ({ ...accum, [key]: null }), {}));

  // State Modifier ------------------------------
  const handleChange = (event) => setFormObject({ ...formObject, [event.target.name]: event.target.value });
  
  // Return --------------------------------------
  return [formObject, handleChange, errorObject, setErrorObject ];
}

// -----------------------------------------
// Compose Action Object ///////////////////
// -----------------------------------------

Form.Item = Item;
Form.useFormState = useFormState;
