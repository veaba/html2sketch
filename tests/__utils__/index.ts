/* istanbul ignore file */

import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { createRoot } from 'react-dom/client';
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
export { default as inlineImageJSON } from './json/inline-image.json';
export { default as pngURLImageJSON } from './json/png-url-image.json';

/** export svg string */
export {default as antdRawSvg } from './svg/antdRaw.svg?raw';
export {default as illustrationSvg} from './svg/illustration.svg?raw';
export {default as antdOptSvg} from './svg/antdOpt.svg?raw'
export {default as bgRawSvg } from './svg/bgRaw.svg?raw'
export {default as bgOptSvg } from './svg/bgOpt.svg?raw'


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

/**
 * 更新
 */
export const isUpdate = process.env.UPDATE === '1';

/**
 * 初始化测试节点（配合 removeTestNode 方法使用）
 * @param innerHTML
 * @param id
 */
export const setupTestNode = (innerHTML: string) => {
  const node = document.createElement('div');
  const child = document.createElement('div')
  child.innerHTML = innerHTML
  node.id = '__vitestDiv'
  node.appendChild(child)
  node.innerHTML = innerHTML;
  document.body.prepend(node);
};

/**
 * 如果使用了 setupTestNode 方法插入 html 内容
 * 请务必使用 removeTestNode 放到移除 node
*/
export const removeTestNode = () => {
  document.body.removeChild(document.getElementById('__vitestDiv') as HTMLElement );
}

/**
 * 从 __vitestDiv 删除一些 node
*/
export const removeNodeByText = () => {
  return document.getElementById('__vitestDiv') as HTMLElement 
}

/**
 * 将 vitest https://xx/@fs/xx 转换
 * */
export const vitestUrlResolve = (url: string, filePath: string) => {
  const urlObj = new URL(url);
  const { origin, pathname } = urlObj;
  return origin + resolve(pathname,'../',filePath);
};

export const render = (App: JSX.Element) => {
  const container = document.getElementById('container')
  const root = createRoot(container)
  return root.render(App);
};

export const setupTestEnv = () => {
  // 3. 创建 dom 容器
  const node = document.createElement('div');

  node.id = 'container';

  document.body.prepend(node);
};
