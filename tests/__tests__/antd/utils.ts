import { writeFileSync } from 'fs';
import { join } from 'path';

export {default as defaultModalJSON } from './json/default-modal.json';
export {default as radioJSON } from './json/radio.json';

export {default as svgButtonJSON } from './json/svg-button.json';
export {default as svgIconJSON } from './json/svg-icon.json';

export const saveJSONData = (json: any | any[], name?: string) => {
  writeFileSync(join(__dirname, `./json/${name || 'json'}.json`), JSON.stringify(json));
};

export const sleep = (time: number) =>
  new Promise((r) => {
    setTimeout(r, time);
  });

declare global {
  interface Window {
    loadAntdCSS: boolean;
  }
}

export const setupAntdTestEnv = () =>
  new Promise<void>((resolve) => {
    const baseJSFile = [
      'https://unpkg.com/react@18.2.0/umd/react.development.js',
      'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
      'https://unpkg.com/antd@5.4.2/dist/antd.min.js',
      'https://unpkg.com/@babel/standalone@7/babel.min.js',
    ];

    // 2. 插入 react 等基础 js 环境
    baseJSFile.forEach((src) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;

      document.head.prepend(script);
    });

    // 3. 创建 dom 容器
    const node = document.createElement('div');

    node.id = 'container';

    document.body.prepend(node);

    resolve();
  });

  
  /**
   * vitest 支持
  */
  export const setupAntdTestVitestEnv = () =>
  new Promise<void>((resolve) => {
    const baseJSFile = [
      'https://unpkg.com/react@18.2.0/umd/react.development.js',
      'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
      'https://unpkg.com/antd@5.4.2/dist/antd.min.js',
      'https://unpkg.com/@babel/standalone@7/babel.min.js',
    ];

    // 2. 插入 react 等基础 js 环境
    baseJSFile.forEach((src) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;

      document.head.prepend(script);
    });
    resolve();
  });