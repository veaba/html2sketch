import { Text } from '@html2sketch';
import { describe, test, expect } from 'vitest'

const { fixWhiteSpace } = Text;

// Sequences of whitespace are collapsed. Newline characters in the source are handled the same as other whitespace.
describe('fixWhiteSpace', () => {
  test('normal & nowrap', () => {
    const input = `
      Luke,  I'm


  your      father `;
    const output = " Luke, I'm your father ";

    expect(fixWhiteSpace(input, 'normal')).toEqual(output);
    expect(fixWhiteSpace(input, 'nowrap')).toEqual(output);
  });

  // Sequences of whitespace are collapsed. Lines are broken at newline characters
  test('pre-line', () => {
    const input = `
       Luke,  I'm


  your      father `;
    const output = `
Luke, I'm


your father`;

    expect(fixWhiteSpace(input, 'pre-line')).toEqual(output);
  });

  // Sequences of whitespace are preserved. Lines are only broken at newline characters
  test('pre & pre-wrap', () => {
    const input = `
       Luke,  I'm


  your      father `;

    expect(fixWhiteSpace(input, 'pre')).toEqual(input);
    expect(fixWhiteSpace(input, 'pre-wrap')).toEqual(input);
  });
});
