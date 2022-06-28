import PropTypes from 'prop-types';
import HoverDecorator from '../../UI/HoverDecorator.js';
import FavouriteDecorator from '../../UI/FavouriteDecorator.js';
import { Card } from '../../UI/Card.js';
import ToolTipDecorator from '../../UI/ToolTipDecorator.js';
import Action from '../../UI/Actions.js';
import './ModuleCard.scss';


ModuleCard.propTypes = {
  module: PropTypes.shape({
    isSubscribed: PropTypes.bool,
    ModuleID: PropTypes.number.isRequired,
    ModuleImage: PropTypes.string.isRequired,
    ModuleName: PropTypes.string.isRequired,
    ModuleCode: PropTypes.string.isRequired,
    ModuleLevel: PropTypes.number.isRequired
  }),
  handlers: PropTypes.exact({
    handleSubscribe: PropTypes.func.isRequired,
    handleUnsubscribe: PropTypes.func.isRequired,
    handleModify: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  })
};

export default function ModuleCard({module,handlers}) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <HoverDecorator>
      <Card>
        
        <FavouriteDecorator
            isFavourite={module.isSubscribed}
            unFavourite={() => handlers.handleUnsubscribe(module.ModuleID)}
        />

        <div className="cardLayout">

          <div className="cardImage">
            <img src={module.ModuleImage} alt="Visual representation of module" />
          </div>

          <div className="cardDetails">
            <h1>{module.ModuleName} ({module.ModuleCode})</h1>
            <p>
              <span className="cardAttribute">Level</span>
              <span className="cardValue">{module.ModuleLevel}</span>
            </p>
          </div>

          <div className="cardActions">
            <Action.Tray>
              {module.isSubscribed
                ? <ToolTipDecorator message="Click to remove module to favourites">
                    <Action.Unsubscribe onClick={() => handlers.handleUnsubscribe(module.ModuleID)} />
                  </ToolTipDecorator>
                : <ToolTipDecorator message="Click to add module to favourites">
                    <Action.Subscribe onClick={() => handlers.handleSubscribe(module.ModuleID)} />
                  </ToolTipDecorator>
              }
              <ToolTipDecorator message="Click to modify module details">
                <Action.Modify onClick={handlers.handleModify} />
              </ToolTipDecorator>
              <ToolTipDecorator message="Delete module from list">
                <Action.Delete onClick={() => handlers.handleDelete(module.ModuleID)} />
              </ToolTipDecorator>
            </Action.Tray>
          </div>

        </div>

      </Card>
    </HoverDecorator>
  );
}
