import { Artboard } from '@html2sketch';
import { describe, expect, it  } from 'vitest'

describe('Artboard', () => {
  it('toSketchJSON', () => {
    const artboard = new Artboard({ width: 100, height: 100 });

    const json = artboard.toSketchJSON();

    expect(json._class).toBe('artboard');
    expect(json.frame.width).toEqual(100);
    expect(json.frame.height).toEqual(100);
    expect(json.frame.x).toEqual(0);
    expect(json.frame.y).toEqual(0);
  });
});
