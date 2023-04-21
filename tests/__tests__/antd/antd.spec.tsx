/**
 * @by veaba
 * antd 关联的 rc-picker 使用 dayjs 报错
 * Uncaught TypeError: Cannot read properties of undefined (reading 'extend')
 * @todo Radio 单选器
 * @todo SVG 和按钮
 * @todo Tooltip
 */
import { Button, Modal, Radio, Tooltip } from 'antd';
import { PlusOutlined, UpCircleOutlined } from '@ant-design/icons';
import type SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { isUpdate, render, removeTestNode, setupTestNode } from '@test-utils';
import { nodeToGroup, nodeToSymbol } from '@html2sketch';
import {
  defaultModalJSON,
  radioJSON,
  saveJSONData,
  setupAntdTestVitestEnv,
  sleep,
  svgButtonJSON,
  svgIconJSON,
} from './utils';

const { _InternalPanelDoNotUseOrYouWillBeFired: PureTooltip } = Tooltip;

describe('antd 组件库可正常解析', () => {
  beforeAll(async () => {
    await setupAntdTestVitestEnv();
  })
  beforeEach(async () => {
    setupTestNode('<div id="container"><div>')
  });

  afterEach(() => {
    removeTestNode();
  })

  /** 
   * 原仓库的 radioJSON.json frame.width 111.484375 不正确的，（现改为 107.03125)
   * 原仓库的 radioJSON.json .layers[1].frame.width 79.484375 不正确的，（现改为 75.03125)
   */
  it('Radio 单选器', async () => {
    await render(<Radio checked>html2sketch</Radio>);
    await sleep(1)

    const node = document.getElementById('container') as HTMLDivElement;

    const group = (await nodeToGroup(node)).toSketchJSON();

    if (isUpdate) {
      saveJSONData(group, 'radio');
    }
    
    const { frame, ...target } = group;
    const { frame: originFrame, ...origin } = radioJSON;

    expect(JSON.parse(JSON.stringify(target))).toEqual(origin);
    expect(Math.round(frame.width)).toEqual(Math.round(originFrame.width));
  });

  /**
   * @todo 为什么 下面两个只能同时支持一个呢
  */
  describe('Svg', () => {
    it('svg icon', async () => {
      await render(<PlusOutlined />);
      await sleep(1)
      const node = document.getElementById('container') as HTMLDivElement;

      const group = (await nodeToGroup(node)).toSketchJSON();

      if (isUpdate) {
        saveJSONData(group, 'svg-icon');
      }
      // expect(group.layers[0]).toMatchObject(svgIconJSON.layers[0])
      expect(group).toMatchObject(svgIconJSON);
    });
    it('SVG 和按钮', async () => {
      await render(
        <Button id="button" icon={<UpCircleOutlined />} type="primary">
          文本
        </Button>,
      );
      await sleep(2)

      const node = document.getElementById('container') as HTMLDivElement;

      const group = (await nodeToGroup(node)).toSketchJSON();

      if (isUpdate) {
        saveJSONData(group, 'svg-button');
      }
      expect(group.layers[0]).toMatchObject(svgButtonJSON.layers[0]);
      const {layers: _, ...a} = group;
      const {layers, ...b} = svgButtonJSON
      expect({...a}).toMatchObject({...b});

      // layers { frame :{"y": 8.75}}, 7=>8.75
      // expect(group.layers[0]).toMatchObject(svgButtonJSON.layers[0]);
      // expect(group.layers[1]).toMatchObject(svgButtonJSON.layers[1]);
      expect(group.layers[2]).toMatchObject(svgButtonJSON.layers[2]);
      expect(group).toMatchObject(svgButtonJSON);
    });
  });

  it('Modal', async () => {
    await render(
      <div style={{ position: 'relative', minHeight: 400 }}>
        <Modal._InternalPanelDoNotUseOrYouWillBeFired
          title="Modal"
          mask={false}
          wrapProps={{ id: 'modal' }}
          // centered
          maskClosable
          getContainer={false}
          width={520}
        >
          Content
        </Modal._InternalPanelDoNotUseOrYouWillBeFired>
      </div>,
    );
    await sleep(1)

    afterAll(() => removeTestNode())

    const node = document.getElementsByClassName('ant-modal')[0] as HTMLDivElement;

    const symbol = (await nodeToSymbol(node)).toSketchJSON();

    if (isUpdate) {
      saveJSONData(symbol, 'default-modal');
    }
    const { frame, ...target } = symbol;
    const { frame: originFrame, ...origin } = defaultModalJSON;

    expect(target.name).toEqual(origin.name);
    expect(Math.round(frame.width)).toEqual(Math.round(originFrame.width));

    expect(symbol._class).toBe('symbolMaster');
    expect(symbol.groupLayout).toStrictEqual({
      _class: 'MSImmutableFreeformGroupLayout',
    });
    expect(symbol.name).toBe('Modal');
    expect(symbol.layers.length).toBe(5);

    const header = symbol.layers[1] as SketchFormat.Group;
    expect(header.groupLayout).toStrictEqual({
      _class: 'MSImmutableInferredGroupLayout',
      axis: 0,
      layoutAnchor: 0,
    });
  });

  it.todo('Tooltip', async () => {
    await render(<PureTooltip title="text" />);
    await sleep(1)
    const node = document.getElementById('container') as HTMLDivElement;

    const group = (await nodeToGroup(node)).toSketchJSON();

    expect(group).toMatchSnapshot();
  });
});
