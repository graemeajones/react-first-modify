import PropTypes from 'prop-types';
import Icon from './Icons.js';
import './Actions.css';


// -----------------------------------------
// Action Button ///////////////////////////
// -----------------------------------------

Action.propTypes = {
  onClick: PropTypes.func.isRequired,
  showText: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
};

export default function Action({ children, onClick, showText, buttonText }) {
  return (
    <button className="Action" onClick={onClick}>
      {children} {showText && <p>{buttonText}</p>}
    </button>
  );
}

// -----------------------------------------
// Action Tray /////////////////////////////
// -----------------------------------------

Tray.propTypes = {
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired
}

export function Tray({children}) {
  return (
    <div className="ActionTray">
      { children }
    </div>
  );
}

// -----------------------------------------
// Actions /////////////////////////////////
// -----------------------------------------

const ActionPropTypes = {
  onClick: PropTypes.func.isRequired,
  showText: PropTypes.bool
};

Add.propTypes = ActionPropTypes;

export function Add({ onClick, showText=false }) {
  return (
    <Action buttonText="Add" onClick={onClick} showText={showText} >
      <Icon.Plus />
    </Action>
  );
}

Close.propTypes = ActionPropTypes;

export function Close({ onClick, showText=false }) {
  return (
    <Action buttonText="Close" onClick={onClick} showText={showText} >
      <Icon.Cross />
    </Action>
  );
}

Delete.propTypes = ActionPropTypes;

export function Delete({ onClick, showText=false }) {
  return (
    <Action buttonText="Delete" onClick={onClick} showText={showText} >
      <Icon.Trash />
    </Action>
  );
}

Dismiss.propTypes = ActionPropTypes;

export function Dismiss({ onClick, showText=false }) {
  return (
    <Action buttonText="Dismiss" onClick={onClick} showText={showText} >
      <Icon.Cross />
    </Action>
  );
}

Favourites.propTypes = ActionPropTypes;

export function Favourites({ onClick, showText=false }) {
  return (
    <Action buttonText="List favourites" onClick={onClick} showText={showText} >
      <Icon.RedHeart />
    </Action>
  );
}

ListAll.propTypes = ActionPropTypes;

export function ListAll({ onClick, showText=false }) {
  return (
    <Action buttonText="List all" onClick={onClick} showText={showText} >
      <Icon.List />
    </Action >
  );
}

Modify.propTypes = ActionPropTypes;

export function Modify({ onClick, showText=false }) {
  return (
    <Action buttonText="Modify" onClick={onClick} showText={showText} >
      <Icon.Pen />
    </Action>
  );
}

No.propTypes = ActionPropTypes;

export function No({ onClick, showText=false }) {
  return (
    <Action buttonText="No" onClick={onClick} showText={showText} >
      <Icon.Cross />
    </Action>
  );
}

Submit.propTypes = ActionPropTypes;

export function Submit({ onClick, showText=false }) {
  return (
    <Action buttonText="Submit" onClick={onClick} showText={showText} >
      <Icon.Tick />
    </Action>
  );
}

Subscribe.propTypes = ActionPropTypes;

export function Subscribe({ onClick, showText=false }) {
  return (
    <Action buttonText="Subscribe" onClick={onClick} showText={showText} >
      <Icon.Tick />
    </Action>
  );
}

Yes.propTypes = ActionPropTypes;

export function Yes({ onClick, showText=false }) {
  return (
    <Action buttonText="Yes" onClick={onClick} showText={showText} >
      <Icon.Tick />
    </Action>
  );
}

Unsubscribe.propTypes = ActionPropTypes;

export function Unsubscribe({ onClick, showText=false }) {
  return (
    <Action buttonText="Unsubscribe" onClick={onClick} showTex={showText}>
      <Icon.Cross />
    </Action>
  );
}

// -----------------------------------------
// Compose Action Object ///////////////////
// -----------------------------------------

Action.Tray = Tray;

Action.Add = Add;
Action.Close = Close;
Action.Delete = Delete;
Action.Dismiss = Dismiss;
Action.Favourites = Favourites;
Action.ListAll = ListAll;
Action.Modify = Modify;
Action.No = No;
Action.Submit = Submit;
Action.Subscribe = Subscribe;
Action.Yes = Yes;
Action.Unsubscribe = Unsubscribe;
