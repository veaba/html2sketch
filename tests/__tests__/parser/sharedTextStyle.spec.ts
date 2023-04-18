import { parseToSharedTextStyle } from '@html2sketch';
import { removeTestNode, setupTestNode } from '@test-utils';

describe('parseToSharedTextStyle', () => {
  beforeAll(() => {
    setupTestNode(`
<div>
    <div id="default" style="background: aliceblue">
    aaa
    </div>
</div>
`)
  });
  afterAll(() => {
    removeTestNode();
  });

  it('default 正常解析', async () => {
    const node = document.getElementById('default') as HTMLDivElement;
    const layers = await parseToSharedTextStyle(node);

    expect(layers.length).toBe(1);
    expect(layers[0].name).toBe('aaa');
  });
});
