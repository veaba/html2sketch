import { isNodeVisible, isTextVisible } from '@html2sketch/utils/visibility';
import { setupTestNode, removeTestNode, removeNodeByText } from '@test-utils';

describe('isNodeVisible', () => {
  describe('正确识别可见节点', () => {
    beforeAll(() => {
      const innerHTML = `
<p class='check-me'>text</p>
<div style='position: absolute'>
<p class='check-me' />
</div>
<div class='check-me' style='width: 0'>text</div>
<div class='check-me' style='opacity: 0.1'>text</div>
      `;
      setupTestNode(innerHTML)
    });
    afterAll(() => removeTestNode())
    it('正确识别可见节点', () => {
      const nodesToCheck = Array.from(document.querySelectorAll('.check-me'));
      const invisibleNodes = nodesToCheck.filter((n) => !isNodeVisible(n));

      expect(invisibleNodes).toEqual([]);
    });
  });

  describe('正确识别不可见节点', () => {
    beforeAll(() => {
      const innerHTML = `
<style>
  .one {
    display: none;
  }
  .two {
    width: 0;
    height: 0;
    overflow: hidden;
  }
  .three {
    opacity: 0
  }
  .four {
    visibility: hidden
  }
  .five {
    clip: rect(0px, 0px, 0px, 0px);
    position: absolute;
  }
  .six {
    visibility: collapse
  }
</style>
<p class='one check-me'>text</p>
<div class='two check-me'>text</div>
<div class='three check-me'>text</div>
<div class='four check-me'><div class='check-me'></div></div>
<div class='five check-me'></div>
<div class='six check-me'></div>
<div class='remove-me check-me'></div>
`;

    setupTestNode(innerHTML)
    });
    afterAll(() => removeTestNode())
    it('正确识别不可见节点', () => {
      const nodesToCheck = Array.from(document.querySelectorAll('.check-me'));

      // detach node .remove-me
      const removeMeNode = document.querySelector('.remove-me')!
      removeNodeByText().removeChild(removeMeNode!);

      const visibleNodes = nodesToCheck.filter((n) => isNodeVisible(n));
      expect(visibleNodes).toEqual([]);
    });
  });
});

describe('isTextVisible', () => {
  beforeAll(() => {
    const innerHTML = `
<style>
.one {
  overflow: hidden;
  text-indent: -99999px;
}
</style>
<p class='one check-me'>text</p>
`;
  setupTestNode(innerHTML)
  });
  afterAll(() => removeTestNode())
  it('正确识别不可见文本', () => {
    const nodesToCheck = Array.from(document.querySelectorAll('.check-me'));
    const visibleText = nodesToCheck.filter((n) =>
      isTextVisible(getComputedStyle(n)),
    );

    expect(visibleText).toEqual([]);
  });
});
