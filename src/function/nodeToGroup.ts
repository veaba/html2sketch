/* eslint-disable no-console */
import type { AnyLayer } from '..';
import { Group, Style } from '../models';
import { getChildNodeList } from '../utils/hierarchy';
import { getName } from '../utils/name';
import { isExistPseudoShape, isExistPseudoText } from '../utils/pseudo';
import { checkNoNull } from '../utils/utils';
import { isNodeVisible } from '../utils/visibility';
import nodeToLayers from './nodeToLayers';

export interface Options {
  postTransform?: (group: AnyLayer) => AnyLayer;
  getGroupName: (node: Element) => string;
}

const consoleGroupStyle = `font-weight:bold;color:#666;`;

/**
 * 将一个节点和其包含的所有子级转为 Group 对象
 * @param node
 * @param options
 */
const nodeToGroup = async (node: Element, options?: Options): Promise<Group> => {
  if (!node) throw Error('解析对象不存在 请检查传入对象');

  const bcr = node.getBoundingClientRect();
  const { left, top } = bcr;
  const width = bcr.right - bcr.left;
  const height = bcr.bottom - bcr.top;

  console.group('%c处理节点:', consoleGroupStyle, node);

  const layers = await nodeToLayers(node);

  // ---------- 处理父节点 ------ //
  if (node.nodeName !== 'svg') {
    const childNodeList = getChildNodeList(node);

    // Recursively collect child groups for child nodes
    for (let i = 0; i < childNodeList.length; i += 1) {
      const childNode = childNodeList[i];
      // eslint-disable-next-line no-await-in-loop
      const l = await nodeToGroup(childNode, options);
      layers.push(l);

      // Traverse the shadow DOM if present
      if (childNode.shadowRoot) {
        const promise = Array.from(childNode.shadowRoot.children)
          .filter((n) => isNodeVisible(n))
          .map(async (n) => {
            const shadowGroup = await nodeToGroup(n);
            return shadowGroup;
          });
        // eslint-disable-next-line no-await-in-loop
        const shadowChild = await Promise.all(promise);
        shadowChild.forEach((layer) => layers.push(layer));
      }
    }
  }

  // Now build a group for all these children

  const styles = getComputedStyle(node);
  const { opacity, transform } = styles;

  const group = new Group({ x: left, y: top, width, height });
  const groupStyle = new Style();

  groupStyle.opacity = opacity;
  group.style = groupStyle;

  layers
    .filter((l) => l)
    .forEach((layer) => {
      group.addLayer(layer);
    });
  console.groupEnd();

  checkNoNull(group.frame);

  if (transform !== 'none') {
    group.applyTransformRotate(transform);
  }

  if (
    group.layers.length === 1 &&
    group.rotation === 0 &&
    (group.layers[0].class === 'rectangle' ||
      group.layers[0].class === 'text' ||
      group.layers[0].class === 'bitmap' ||
      group.layers[0].class === 'svg' ||
      group.layers[0].class === 'group')
  ) {
    console.groupCollapsed('%c清理无效层级', consoleGroupStyle);
    const layer = group.layers[0];
    console.log(`该 group 只包含一个子级 [${layer.class}]: ${layer.name} ,丢弃...`);
    console.groupEnd();
    // 将父级的图层关系还给子集
    layer.x += group.x;
    layer.y += group.y;

    // 只有一个形状时不需要裁剪
    layer.hasClippingMask = false;

    // 只有一个形状时不需要裁剪
    layer.hasClippingMask = false;

    return layer as Group;
  }

  console.info('解析group.layers=>', group.layers)

  if (options && options.getGroupName) {
    group.name = options.getGroupName(node);
  } else {
    group.name = getName(node.nodeName);
  }

  /**
   * @todo 不应该丢失吧==
   * 舍弃类似 <div></div>
  */
  if (
    group.layers.length === 0 &&
    !isExistPseudoText(node).exist &&
    !isExistPseudoShape(node).exist
  ) {
    console.groupCollapsed('%c清理无效层级', consoleGroupStyle);
    console.log('该 group 是空的,丢弃...');
    console.groupEnd();
    // @ts-ignore
    // eslint-disable-next-line consistent-return
    // @todo 为什么是 return？？
    // return
    // return group
  }

  group.className = node.className;
  console.info('%c输出 Group 为:', 'font-weight:bold;color:#4590f7;', group);
  return group;
};

export default nodeToGroup;
