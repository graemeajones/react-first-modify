import { useState } from 'react';
import Modal from '../UI/Modal.js';
import ToolTipDecorator from '../UI/ToolTipDecorator.js';
import Action from '../UI/Actions.js';


export default function MyAssessments() {
  // Properties ----------------------------------
  const actions = [];

  // Hooks ---------------------------------------
  const [showModal, setShowModal] = useState(true);

  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  actions.push(
    <ToolTipDecorator key="ActionYes" message="Click to dismiss modal">
      <Action.Yes showText onClick={() => setShowModal(false)}/>
    </ToolTipDecorator>
  );

  return (
    <>
      <h1>My Assessments</h1>
      {
        showModal && (
          <Modal title="Alert!" actions={actions}>
            <p>Want this modal to go away?</p>
          </Modal>
        )
      }
    </>
  )
}
