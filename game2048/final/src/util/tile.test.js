// @ts-nocheck
import { moveTile } from './tile';

describe('moveTile', () => {
  function removeProps(tileList) {
    for (const tile of tileList) {
      delete tile.id;
      if (tile.isMerged === false) {
        delete tile.isMerged;
      }
      if (tile.isNew === false) {
        delete tile.isNew;
      }
    }
    return tileList;
  }
  describe('가로 8 8 4 4', () => {
    const tileList = [
      {
        id: 11,
        x: 1,
        y: 1,
        value: 8,
      },
      {
        id: 12,
        x: 2,
        y: 1,
        value: 8,
      },
      {
        id: 13,
        x: 3,
        y: 1,
        value: 4,
      },
      {
        id: 14,
        x: 4,
        y: 1,
        value: 4,
      },
    ];
    it('x=1', () => {
      expect(removeProps(moveTile({ x: 1, y: 0, tileList }))).toMatchSnapshot();
    });
    it('x=-1', () => {
      expect(
        removeProps(moveTile({ x: -1, y: 0, tileList })),
      ).toMatchSnapshot();
    });
    it('y=1', () => {
      expect(removeProps(moveTile({ x: 0, y: 1, tileList }))).toMatchSnapshot();
    });
    it('y=-1', () => {
      expect(
        removeProps(moveTile({ x: 0, y: -1, tileList })),
      ).toMatchSnapshot();
    });
  });
  describe('세로 8 8 4 4', () => {
    const tileList = [
      {
        id: 11,
        x: 1,
        y: 1,
        value: 8,
      },
      {
        id: 12,
        x: 1,
        y: 2,
        value: 8,
      },
      {
        id: 13,
        x: 1,
        y: 3,
        value: 4,
      },
      {
        id: 14,
        x: 1,
        y: 4,
        value: 4,
      },
    ];
    it('x=1', () => {
      expect(removeProps(moveTile({ x: 1, y: 0, tileList }))).toMatchSnapshot();
    });
    it('x=-1', () => {
      expect(
        removeProps(moveTile({ x: -1, y: 0, tileList })),
      ).toMatchSnapshot();
    });
    it('y=1', () => {
      expect(removeProps(moveTile({ x: 0, y: 1, tileList }))).toMatchSnapshot();
    });
    it('y=-1', () => {
      expect(
        removeProps(moveTile({ x: 0, y: -1, tileList })),
      ).toMatchSnapshot();
    });
  });
  describe('가로 2 4 8 8', () => {
    const tileList = [
      {
        id: 11,
        x: 1,
        y: 1,
        value: 2,
      },
      {
        id: 12,
        x: 2,
        y: 1,
        value: 4,
      },
      {
        id: 13,
        x: 3,
        y: 1,
        value: 8,
      },
      {
        id: 14,
        x: 4,
        y: 1,
        value: 8,
      },
    ];
    it('x=1', () => {
      expect(removeProps(moveTile({ x: 1, y: 0, tileList }))).toMatchSnapshot();
    });
    it('x=-1', () => {
      expect(
        removeProps(moveTile({ x: -1, y: 0, tileList })),
      ).toMatchSnapshot();
    });
  });
  describe('가로 2 x 8 8', () => {
    const tileList = [
      {
        id: 11,
        x: 1,
        y: 1,
        value: 2,
      },
      {
        id: 13,
        x: 3,
        y: 1,
        value: 8,
      },
      {
        id: 14,
        x: 4,
        y: 1,
        value: 8,
      },
    ];
    it('x=1', () => {
      expect(removeProps(moveTile({ x: 1, y: 0, tileList }))).toMatchSnapshot();
    });
    it('x=-1', () => {
      expect(
        removeProps(moveTile({ x: -1, y: 0, tileList })),
      ).toMatchSnapshot();
    });
  });
  describe('세로 2 x 8 8', () => {
    const tileList = [
      {
        id: 11,
        x: 1,
        y: 1,
        value: 2,
      },
      {
        id: 13,
        x: 1,
        y: 3,
        value: 8,
      },
      {
        id: 14,
        x: 1,
        y: 4,
        value: 8,
      },
    ];
    it('y=1', () => {
      expect(removeProps(moveTile({ x: 0, y: 1, tileList }))).toMatchSnapshot();
    });
    it('y=-1', () => {
      expect(
        removeProps(moveTile({ x: 0, y: -1, tileList })),
      ).toMatchSnapshot();
    });
  });
  describe('가로 여러 줄, 2 2 4 4, 8 x 4 4', () => {
    const tileList = [
      {
        id: 11,
        x: 1,
        y: 1,
        value: 2,
      },
      {
        id: 12,
        x: 2,
        y: 1,
        value: 2,
      },
      {
        id: 13,
        x: 3,
        y: 1,
        value: 4,
      },
      {
        id: 14,
        x: 4,
        y: 1,
        value: 4,
      },
      {
        id: 15,
        x: 1,
        y: 2,
        value: 8,
      },
      {
        id: 16,
        x: 3,
        y: 2,
        value: 4,
      },
      {
        id: 17,
        x: 4,
        y: 2,
        value: 4,
      },
    ];
    it('x=1', () => {
      expect(removeProps(moveTile({ x: 1, y: 0, tileList }))).toMatchSnapshot();
    });
    it('x=-1', () => {
      expect(
        removeProps(moveTile({ x: -1, y: 0, tileList })),
      ).toMatchSnapshot();
    });
  });
});
