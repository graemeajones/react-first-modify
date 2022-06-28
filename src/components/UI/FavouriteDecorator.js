import React from 'react';
import PropTypes from 'prop-types';
import ToolTipDecorator from './ToolTipDecorator.js';
import Icon from './Icons.js';
import './FavouriteDecorator.scss';


FavouriteDecorator.propTypes = {
  isFavourite: PropTypes.bool,
  unFavourite: PropTypes.func
};

export default function FavouriteDecorator({ children, isFavourite, unFavourite }) {
  // Properties ----------------------------------
  // Hooks ---------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  return (
    <div className="FavouriteDecorator">
      {
        isFavourite && 
          <div className="Favourite" onClick={unFavourite}>
            <ToolTipDecorator message="Click to unfavourite">
              <Icon.RedHeart />
            </ToolTipDecorator>
          </div>
      }
      {children}
    </div>
  );
}
