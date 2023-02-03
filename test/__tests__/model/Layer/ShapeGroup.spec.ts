import { ShapeGroup } from 'html2sketch';
import { describe, test, expect, it, beforeAll  } from 'vitest'

describe('ShapeGroup', () => {
  describe('toSketchJSON', () => {
    it('生成正常', () => {
      const shapeGroup = new ShapeGroup();
      expect(shapeGroup.toSketchJSON()).toMatchSnapshot();
    });
  });
  it('生成正常', () => {
    const shapeGroup = new ShapeGroup();
    expect(shapeGroup).toMatchSnapshot();
  });

  it('设置剪贴蒙版', () => {
    const shapeGroup = new ShapeGroup();

    expect(shapeGroup.toSketchJSON().hasClippingMask).toBe(false);

    shapeGroup.hasClippingMask = true;
    expect(shapeGroup.toSketchJSON().hasClippingMask).toBe(true);
  });
});
