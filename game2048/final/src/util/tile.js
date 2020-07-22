import { getRandomInteger } from './number';
import { MAX_POS } from '../constant';
import { assert } from './assert';

export function getInitialTileList() {
  const tileList = [];
  const tile1 = makeTile(tileList);
  tileList.push(tile1);
  const tile2 = makeTile(tileList);
  tileList.push(tile2);
  return tileList;
}
function checkCollision(tileList, newTile) {
  return tileList.some(tile => tile.x === newTile.x && tile.y === newTile.y);
}
let currentId = 0;
export function makeTile(tileList) {
  let newTile;
  while (!newTile || (tileList && checkCollision(tileList, newTile))) {
    newTile = {
      id: currentId++,
      x: getRandomInteger(1, MAX_POS),
      y: getRandomInteger(1, MAX_POS),
      value: 2,
      isNew: undefined,
      isMerged: undefined,
    };
  }
  return newTile;
}

export function moveTile({ tileList, x, y }) {
  assert(x === 0 || y === 0, '');
  const isMoveY = y !== 0;
  const isMinus = x + y < 0;
  const sorted = tileList
    .map(item => ({ ...item, isMerged: false, isNew: false }))
    .filter(item => !item.isDisabled)
    .sort((a, b) => {
      const res = isMoveY ? a.x - b.x : a.y - b.y;
      if (res) {
        return res;
      } else {
        if (isMoveY) {
          return isMinus ? a.y - b.y : b.y - a.y;
        } else {
          return isMinus ? a.x - b.x : b.x - a.x;
        }
      }
    });
  const initialPos = isMinus ? 1 : MAX_POS;
  let pos = initialPos;
  for (let i = 0; i < sorted.length; i++) {
    if (isMoveY) {
      sorted[i].y = pos;
      pos = isMinus ? pos + 1 : pos - 1;
      if (sorted[i].x !== sorted[i + 1]?.x) {
        pos = initialPos;
      }
    } else {
      sorted[i].x = pos;
      pos = isMinus ? pos + 1 : pos - 1;
      if (sorted[i].y !== sorted[i + 1]?.y) {
        pos = initialPos;
      }
    }
  }

  let nextPos = 0;
  const newTileList = [...sorted];
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].isDisabled) {
      continue;
    }

    if (
      nextPos &&
      (isMoveY
        ? sorted[i].x === sorted[i - 1]?.x
        : sorted[i].y === sorted[i - 1]?.y)
    ) {
      if (isMoveY) {
        sorted[i].y = nextPos;
      } else {
        sorted[i].x = nextPos;
      }
      nextPos += isMinus ? 1 : -1;
    } else {
      nextPos = 0;
    }

    if (
      (isMoveY
        ? sorted[i].x === sorted[i + 1]?.x
        : sorted[i].y === sorted[i + 1]?.y) &&
      sorted[i].value === sorted[i + 1]?.value
    ) {
      const tile = makeTile();
      tile.x = sorted[i].x;
      tile.y = sorted[i].y;
      tile.isMerged = true;
      tile.value = sorted[i].value * 2;
      newTileList.push(tile);
      sorted[i].isDisabled = true;
      sorted[i + 1].isDisabled = true;
      if (isMoveY) {
        nextPos = sorted[i + 1].y;
        sorted[i + 1].y = sorted[i].y;
      } else {
        nextPos = sorted[i + 1].x;
        sorted[i + 1].x = sorted[i].x;
      }
    }
  }
  return newTileList;
}
