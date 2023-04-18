import Style from '@html2sketch/models/Style/Style';
import { describe, expect, it } from 'vitest'

describe('Style 类', () => {
  describe('parserStyleString', () => {
    it('', () => {
      const string = 'fill: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65);';
      expect(Style.parseStyleString(string)).toBeTruthy();
    });
  });
});
