import PropTypes from 'prop-types';
import { Card } from './Card.js';
import Action from './Actions.js';
import './Modal.css';


Modal.propTypes = {
  title: PropTypes.string.isRequired
};


export default function Modal({ title, children, actions=null }) {
  // Validation ----------------------------------
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div className="ModalOverlay">
      <main className="ModalPane">
        <Card>
          <header>
            <p>{title}</p>
          </header>
          <main className="ModalContent">
            {children}
          </main>
          {
            actions && (
              <div className="ModalActions">
                <Action.Tray>
                  { actions.map(action => action) }
                </Action.Tray>
              </div>
            )
          }
        </Card>
      </main>
    </div>
  );
}
