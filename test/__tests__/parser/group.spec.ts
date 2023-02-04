import {parseToGroup} from '@html2sketch';
import {describe, expect, it, beforeAll} from 'vitest'

describe('parseToGroup', () => {
  beforeAll(() => {
    document.body.innerHTML = `<div id="group" style="line-height: 30px; border: 1px solid red">123</div>`;
  });
  it('文本正常解析', () => {
    const node = document.getElementById('group') as HTMLDivElement;
    const group = parseToGroup(node);
    expect(group).toBeTruthy();

    const groupSketchJSON = group.toSketchJSON();
    // console.log('body=>', document.body.innerHTML)
    // console.log('groupSketchJSON.frame=>', groupSketchJSON.frame)
    // @TODO js-dom 类型环境中不支持 getBoundingClientRect 等 layout 方法
    expect(groupSketchJSON.frame.height).toBe(30);
    expect(groupSketchJSON.layers.length).toBe(0);
  });
});
