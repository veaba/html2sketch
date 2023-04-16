// @vitest-environment node
/* istanbul ignore file */

import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { writeFileSync } from 'fs'; // readFileSync
import { join, resolve } from 'path';

export { default as svgJSON } from './json/svg.json';
export { default as svgPathJSON } from './json/svg-path.json';
export { default as behanceJSON } from './json/behance.json';
export { default as dropboxJSON } from './json/dropbox.json';
export { default as upCircleParserJSON } from './json/parser/up-circle.json';
export { default as upCircleJSON } from './json/up-circle.json';
export { default as plusJSON } from './json/plus.json';
export { default as textJSON } from './json/text.json';
export { default as shapeJSON } from './json/shape.json';
export { default as antdParserJSON } from './json/parser/antd.json';
export { default as antdJSON } from './json/antd.json';
export { default as basicParserJSON } from './json/parser/basic.json';
export { default as pseudoTextJSON } from './json/pseudo-text.json';


export * from './testSvgData';

/**
 * 打印出 JSON 数据到路径中
 *
 * 如果出现不一致了,可以重新输出 JSON 对象
 * 类似 Enzyme 的快照功能
 *
 * @param json
 * @param name
 */
export const outputJSONData = (
  json:
    | SketchFormat.Group
    | SketchFormat.ShapeGroup
    | SketchFormat.Text
    | SketchFormat.Rectangle
    | SketchFormat.Bitmap
    | any[],
  name?: string,
) => {
  writeFileSync(
    join(__dirname, `./json/${name || 'json'}.json`),
    JSON.stringify(json),
  );
};

export const illustrationSvg = await import('./svg/illustration.svg');
export const antdRawSvg = await import('./svg/antdRaw.svg');

export const antdOptSvg = await import('./svg/antdOpt.svg');

export const bgRawSvg = await import('./svg/bgRaw.svg');

export const bgOptSvg = await import('./svg/bgOpt.svg');

/**
 * 更新
 */
export const isUpdate = process.env.UPDATE === '1';

/**
 * 初始化测试节点
 * @param innerHTML
 * @param id
 */
export const setupTestNode = (innerHTML: string, id: string) => {
  const node = document.createElement('div');
  node.id = id
  node.innerHTML = innerHTML;
  document.body.prepend(node);
};

export  const removeTestNode = (id : string) => {
  document.body.removeChild(document.getElementById(id));
}

/**
 * 将 vitest https://xx/@fs/xx 转换
 * */
export const vitestUrlResolve = (url: string, filePath: string) => {
  const urlObj = new URL(url);
  const { origin, pathname } = urlObj;
  return origin + resolve(pathname,'../',filePath);
};
