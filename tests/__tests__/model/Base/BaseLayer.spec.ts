import { ResizingConstraint } from '@html2sketch';
import BaseLayer from '@html2sketch/models/Base/BaseLayer';
import { describe, test, expect } from 'vitest'

class TestGroup extends BaseLayer {
  constructor() {
    super('group');
  }
}

describe('Base图层 类', () => {
  test('setName', () => {
    const a = new TestGroup();
    const name = 'test/name-should-work';

    a.name = name;

    expect(a.toJSON().name).toBe(name);
  });
  test('setObjectID', () => {
    const a = new TestGroup();
    const id = 'test/name-should-work';

    a.id = id;

    expect(a.toJSON().id).toBe(id);
  });

  test('setResizingConstraint', () => {
    const a = new TestGroup();
    const { Top, Left, Bottom } = ResizingConstraint;
    const resizingConstraint = [Top, Left];

    a.setResizingConstraint(...resizingConstraint);

    // eslint-disable-next-line no-bitwise
    expect(a.resizingConstraint).toBe(Top & Left);
    expect(a.resizingConstraints).toEqual([Top, Left]);

    a.setResizingConstraint(Bottom);
    expect(a.resizingConstraint).toBe(Bottom);
    expect(a.resizingConstraints).toEqual([Bottom]);
  });

  test('addFixedWidthAndHeight', () => {
    const a = new TestGroup();
    const { Top, Left, Width, Height } = ResizingConstraint;
    const resizingConstraint = [Top, Left];

    a.resizingConstraints = [];
    // just test it
    a.addFixedWidthAndHeight();
    // eslint-disable-next-line no-bitwise
    expect(a.resizingConstraint).toEqual(Width & Height);
    expect(a.resizingConstraints).toEqual([Width, Height]);

    a.setResizingConstraint(...resizingConstraint);

    // eslint-disable-next-line no-bitwise
    expect(a.resizingConstraint).toBe(Top & Left);
    expect(a.resizingConstraints).toEqual([Top, Left]);

    a.addFixedWidthAndHeight();
    // eslint-disable-next-line no-bitwise
    expect(a.resizingConstraint).toBe(Top & Left & Width & Height);
    expect(a.resizingConstraints).toEqual([Top, Left, Width, Height]);

    a.addFixedWidthAndHeight();
    // eslint-disable-next-line no-bitwise
    expect(a.resizingConstraint).toBe(Top & Left & Width & Height);
    expect(a.resizingConstraints).toEqual([Top, Left, Width, Height]);
  });

  test('setIsLocked', () => {
    const a = new TestGroup();

    a.locked = true;

    expect(a.toJSON().locked).toBe(true);
  });

  test('setFixedWidthAndHeight', () => {
    const a = new TestGroup();
    const { Width, Height } = ResizingConstraint;

    a.setFixedWidthAndHeight();

    // eslint-disable-next-line no-bitwise
    expect(a.toJSON().resizingConstraint).toBe(Width & Height);
  });

  test('setPosition', () => {
    const a = new TestGroup();
    a.setPosition({ x: 100, y: 50 });

    expect(a.x).toBe(100);
    expect(a.y).toBe(50);
  });

  test('childLayersSize', () => {
    const a = new TestGroup();

    expect(a.childLayersSize).toStrictEqual({ width: 0, height: 0 });
  });
  describe('userInfo', () => {
    test('setUserInfo', () => {
      const a = new TestGroup();
      a.setUserInfo('xxx', 123);
      expect(a.userInfo).toStrictEqual({
        html2sketch: {
          xxx: 123,
        },
      });
    });
    test('getUserInfo', () => {
      const a = new TestGroup();
      a.setUserInfo('xxx', 123);
      expect(a.getUserInfo('xxx')).toBe(123);
    });
  });
});
