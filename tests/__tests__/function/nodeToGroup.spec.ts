import { nodeToGroup } from '@html2sketch';
import { vitestUrlResolve, setupTestNode, removeTestNode } from '@test-utils'
import { describe, expect, it, beforeAll  } from 'vitest'

describe('nodeToGroup', () => {
  beforeAll(async () => {
    const textPath = vitestUrlResolve(import.meta.url,'./html/nodeToGroup.html')
    const innerHTML = await fetch(textPath).then(text => text.text())
    setupTestNode(innerHTML);
  });
  afterAll(() => removeTestNode())
  it('没有节点则报错', async () => {
    const node = document.getElementById('empty') as HTMLDivElement;

    try {
      await nodeToGroup(node);
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toStrictEqual(Error('解析对象不存在 请检查传入对象'));
    }
  });
  /**
   * veaba: 我觉得不应该丢弃子级，原因：
   * 1、src\function\nodeToGroup.ts#L135 返回了 group，原为 return
   * 2、导致别的地方使用 group.toSketchJSON 是 不存在的
  */
  it('单个子级会丢弃多余父级正常解析', async () => {
    const node = document.getElementById('group1') as HTMLDivElement;
    const group = await nodeToGroup(node);
    expect(group.toSketchJSON()._class).toBe('group'); // 原为 text
  });
  it('多个子级保留父级结构', async () => {
    const node = document.getElementById('group2') as HTMLDivElement;
    const group = await nodeToGroup(node);

    expect(group.toSketchJSON()._class).toBe('group');
  });

  it('row-text 正常解析', async () => {
    const node = document.getElementById('row-text') as HTMLDivElement;
    const layers = await nodeToGroup(node);

    expect(layers.layers.length).toBe(14);
  });
  it('设置 group 名字', async () => {
    const node = document.getElementById('group-name') as HTMLDivElement;
    const group = await nodeToGroup(node, {
      getGroupName: (n) => n.getAttribute('name') || '123',
    });
    expect(group.toSketchJSON()._class).toBe('group');
    expect(group.name).toBe('name');
  });
  it('input 是 shadow 吗', async () => {
    const node = document.getElementById('input') as HTMLInputElement;
    const group = await nodeToGroup(node);
    expect(group.class).toBe('group');
    expect(group.layers.length).toBe(2);
  });

  it('继承坐标 旋转', async () => {
    const node = document.getElementById('svg') as unknown as SVGElement;
    const group = await nodeToGroup(node);
    expect(group.class).toBe('svg');
    expect(group.layers.length).toBe(2);
    const [mask, g] = group.layers;
    expect(mask.class).toBe('rectangle');
    expect(g.class).toBe('group');
    expect(Math.round(g.rotation)).toBe(15);
  });

  it('单个元素有 overflow 不需要蒙版', async () => {
    const node = document.getElementById('overflow-only') as HTMLDivElement;
    const group = await nodeToGroup(node);
    expect(group.layers.length).toBe(0);
    expect(group.hasClippingMask).toBeFalsy();
  });
});
