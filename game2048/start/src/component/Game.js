import React from 'react';

export default function Game() {
  return (
    <div className="game-container">
      <div className="grid-container">
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
        <div className="grid-row">
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
          <div className="grid-cell"></div>
        </div>
      </div>

      <div className="tile-container">
        <div className="tile tile-4 tile-position-1-2 tile-new">
          <div className="tile-inner">4</div>
        </div>
        <div className="tile tile-2 tile-position-1-3 tile-new">
          <div className="tile-inner">2</div>
        </div>
      </div>
    </div>
  );
}
