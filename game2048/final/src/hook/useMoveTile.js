import { useEffect } from 'react';
import { makeTile, moveTile } from '../util/tile';
import { addKeyCallback, removeKeyCallback } from '../util/keyboard';

export default function useMoveTile({ tileList, setTileList, setScore }) {
  useEffect(() => {
    function moveAndAdd({ x, y }) {
      const newTileList = moveTile({ tileList, x, y });
      const score = newTileList.reduce(
        (acc, item) => (item.isMerged ? acc + item.value : acc),
        0,
      );
      setScore(v => v + score);
      const newTile = makeTile(newTileList);
      newTile.isNew = true;
      newTileList.push(newTile);
      setTileList(newTileList);
    }

    function moveUp() {
      moveAndAdd({ x: 0, y: -1 });
    }
    function moveDown() {
      moveAndAdd({ x: 0, y: 1 });
    }
    function moveLeft() {
      moveAndAdd({ x: -1, y: 0 });
    }
    function moveRight() {
      moveAndAdd({ x: 1, y: 0 });
    }
    addKeyCallback('up', moveUp);
    addKeyCallback('down', moveDown);
    addKeyCallback('left', moveLeft);
    addKeyCallback('right', moveRight);
    return () => {
      removeKeyCallback('up', moveUp);
      removeKeyCallback('down', moveDown);
      removeKeyCallback('left', moveLeft);
      removeKeyCallback('right', moveRight);
    };
  }, [tileList, setTileList, setScore]);
}
