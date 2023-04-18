<<<<<<< HEAD:test/__tests__/parser/InputText.spec.ts
import { parseInputTextToText, Text } from '@html2sketch';
import { describe, expect, it, beforeAll  } from 'vitest'
=======
import type { Text } from 'html2sketch';
import { parseInputTextToText } from 'html2sketch';

const getInputText = (node: HTMLInputElement | HTMLTextAreaElement) =>
  parseInputTextToText(node)?.layers[1];
>>>>>>> c0b598c5b426c4474582e825e339df0cfc24c266:tests/__tests__/parser/InputText.spec.ts

describe('parseInputTextToText', () => {
  beforeAll(() => {
    document.head.innerHTML = `
<style>
  body{
    margin: 0;
  }
  .input::placeholder {
    color:red;
  }
</style>`;

    document.body.innerHTML = `
<div>



  <input id="input" />
  <textarea id="pure-textarea"></textarea>

  <input id="input-placeholder" class="input" placeholder="测试输入框" />
  <textarea id="textarea-placeholder" class="input" placeholder="测试输入框"></textarea>

  <div>
    <input id="input-value" placeholder="测试输入框" value="这是值" />
    <textarea id="textarea-value" placeholder="测试输入框">这是值</textarea>
  </div>


  <div>
    <input id="input-center" type="text" value="123456" style="width: 100px;text-align:center;" />
  </div>

</div>
`;
  });

  it('input 不返回', () => {
    const node = document.getElementById('input') as HTMLInputElement;
    const input = getInputText(node);

    expect(input).toBeUndefined();
  });

  it('textarea 不返回', () => {
    const node = document.getElementById('pure-textarea') as HTMLTextAreaElement;
    console.log(node);
    const input = getInputText(node);

    expect(input).toBeUndefined();
  });

  it('input-placeholder 解析成文本', () => {
    const node = document.getElementById('input-placeholder') as HTMLInputElement;
    const input = getInputText(node) as Text;
    expect(input.textStyle.color.red).toBe(255);
    const json = input.toSketchJSON();
    expect(json._class).toBe('text');
    expect(json.attributedString.string).toBe('测试输入框');
  });

  it('textarea-placeholder 解析成文本', () => {
    const node = document.getElementById('textarea-placeholder') as HTMLInputElement;
    const input = getInputText(node) as Text;
    expect(input.textStyle.color.red).toBe(255);
    const json = input.toSketchJSON();
    expect(json._class).toBe('text');
    expect(json.attributedString.string).toBe('测试输入框');
  });

  it('input-value 解析成文本', () => {
    const node = document.getElementById('input-value') as HTMLInputElement;
    const input = getInputText(node) as Text;
    const json = input.toSketchJSON();
    expect(json._class).toBe('text');
    expect(json.attributedString.string).toBe('这是值');
    expect(input.x).toBeLessThanOrEqual(2);
  });

  it('textarea-value 解析成文本', () => {
    const node = document.getElementById('textarea-value') as HTMLTextAreaElement;
    const input = getInputText(node) as Text;
    const json = input.toSketchJSON();
    expect(json._class).toBe('text');
    expect(json.attributedString.string).toBe('这是值');
  });

  it('input-center 解析成文本', () => {
    const node = document.getElementById('input-center') as HTMLInputElement;
    const input = getInputText(node) as Text;
    const json = input.toSketchJSON();
    expect(json._class).toBe('text');
    expect(json.attributedString.string).toBe('123456');

<<<<<<< HEAD:test/__tests__/parser/InputText.spec.ts
    expect(input.centerX).toBe(54); // veaba 原本 53，但是由于不错了 isTemplate 类型声明个数就增加了
=======
    expect(input.centerX).toBeGreaterThanOrEqual(53);
>>>>>>> c0b598c5b426c4474582e825e339df0cfc24c266:tests/__tests__/parser/InputText.spec.ts
  });
});
