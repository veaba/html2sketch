/**
 * @by veaba
 * antd 关联的 rc-picker 使用 dayjs 报错
 * Uncaught TypeError: Cannot read properties of undefined (reading 'extend')
 * @todo
 */
import { Button, Modal, Radio, Tooltip } from 'antd';
import { PlusOutlined, UpCircleOutlined } from '@ant-design/icons';
import type SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { isUpdate, render, removeTestNode } from '@test-utils';
import { nodeToGroup, nodeToSymbol } from '@html2sketch';
import {
  defaultModalJSON,
  radioJSON,
  saveJSONData,
  setupAntdTestVitestEnv,
  svgButtonJSON,
  svgIconJSON,
} from './utils';

const { _InternalPanelDoNotUseOrYouWillBeFired: PureTooltip } = Tooltip;

describe('antd 组件库可正常解析', () => {
  beforeEach(async () => {
    await setupAntdTestVitestEnv();
  });

  // afterAll(() => removeTestNode())

  it.skip('Radio 单选器', async () => {
    await render(<Radio checked>html2sketch</Radio>);
    afterAll(() => removeTestNode())

    const node = document.getElementById('container') as HTMLDivElement;

    const group = (await nodeToGroup(node)).toSketchJSON();

    if (isUpdate) {
      saveJSONData(group, 'radio');
    }
    
    const { frame, ...target } = group;
    const { frame: originFrame, ...origin } = radioJSON;
    console.log('target.name=>',target.name)
    console.log('origin.name=>',origin.name)
    expect(JSON.parse(JSON.stringify(target))).toEqual(origin);
    expect(Math.round(frame.width)).toEqual(Math.round(originFrame.width));
  });

  describe('Svg', () => {
    it('svg icon', async () => {
      await render(<PlusOutlined />);
      // afterAll(() => removeTestNode())

      const node = document.getElementById('container') as HTMLDivElement;

      const group = (await nodeToGroup(node)).toSketchJSON();

      if (isUpdate) {
        saveJSONData(group, 'svg-icon');
      }

      console.log('svg icon 11 =>', JSON.stringify(group).length)
      console.log('svg icon 22=>', JSON.stringify(svgIconJSON).length)

      console.log('group length=>', group.layers.length); // 0
      console.log('svgIconJSON length=>', svgIconJSON.layers.length); // 3

      console.log('group=>', group.layers)
      console.log('svgIconJSON=>', svgIconJSON.layers)


      console.log('group=>', group)
      console.log('svgIconJSON=>', svgIconJSON)
      expect(group).toMatchObject(svgIconJSON);
    });
    it.skip('SVG 和按钮', async () => {
      await render(
        <Button id="button" icon={<UpCircleOutlined />} type="primary">
          文本
        </Button>,
      );

      const node = document.getElementById('container') as HTMLDivElement;

      const group = (await nodeToGroup(node)).toSketchJSON();

      if (isUpdate) {
        saveJSONData(group, 'svg-button');
      }
      expect(group).toMatchObject(svgButtonJSON);
    });
  });

  it.skip('Modal', async () => {
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

  it.skip('Tooltip', async () => {
    await render(<PureTooltip title="text" />);
    afterAll(() => removeTestNode())
    const node = document.getElementById('container') as HTMLDivElement;

    const group = (await nodeToGroup(node)).toSketchJSON();

    expect(group).toMatchSnapshot();
  });
});
