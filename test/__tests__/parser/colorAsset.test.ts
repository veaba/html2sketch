// import colorAsset from '../colorAsset';
import { describe, test, expect, it, beforeAll  } from 'vitest'

describe('colorAsset', () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <table>
      <tbody>
        <thead>
          <tr>
            <th class="table" >
              Header 1
              <span/>
            </th>
          </tr>
        </thead>
      </tbody>
    </table>
    <div id="text">文本对象</div>
    <div id="no-text"></div>
    `;
  });
  afterAll(() => {
    document.body.innerHTML = '';
  });

  it('RGB should work fine', () => {
    // const color = colorAsset()
  });
});
