import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import Color from './Color';

const SYSTEM_FONTS = [
  /* * Apple * */
  '-apple-system',
  'system-ui',
  'BlinkMacSystemFont',
  /* * Microsoft * */
  'Segoe UI',
  /* * Android * */
  'Roboto',
];

type FontWeightEnum = {
  normal: FontWeightType;
  bold: FontWeightType;
  bolder: FontWeightType;
  '100': FontWeightType;
  '200': FontWeightType;
  '300': FontWeightType;
  '400': FontWeightType;
  '500': FontWeightType;
  '600': FontWeightType;
  '700': FontWeightType;
  '800': FontWeightType;
  '900': FontWeightType;
};

type FontWeightType =
  | 'Regular'
  | 'Bold'
  | 'Semibold'
  | 'UltraLight'
  | 'Thin'
  | 'Light'
  | 'Medium'
  | 'Heavy'
  | 'Black';

/**
 * 字体权重
 * */
export const FONT_WEIGHTS: FontWeightEnum = {
  normal: 'Regular',
  bold: 'Bold',
  bolder: 'Semibold',
  '100': 'UltraLight',
  '200': 'Thin',
  '300': 'Light',
  '400': 'Regular',
  '500': 'Medium',
  '600': 'Semibold',
  '700': 'Bold',
  '800': 'Heavy',
  '900': 'Black',
};

// 输入: -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif
// 输出: PingFang SC
function getFirstFont(fonts: string, skipSystemFonts?: boolean) {
  let regularFont: string | null = null;
  let systemFont: string | null = null;

  fonts.split(',').forEach((font) => {
    font = font.trim().replace(/^["']+|["']+$/g, '');
    if (font === '') {
      return;
    }

    // See above for a note on OS-specific fonts
    if (!regularFont && (!skipSystemFonts || SYSTEM_FONTS.indexOf(font) < 0)) {
      regularFont = font;
    }
    if (!systemFont) {
      systemFont = font;
    }
  });

  if (regularFont) {
    return regularFont;
  }

  if (systemFont) {
    return systemFont;
  }

  return '-apple-system';
}

export interface TextStyleParams {
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number | string;
  lineHeight?: number;
  opacity?: number;
  letterSpacing?: number;
  textTransform?: string;
  textDecoration?: string;
  textAlign?: TextHorizontalAlign;
  verticalAlign?: TextVerticalAlign;
  /**
   * Some websites or component libraries use font-family
   * listsstarting with OS-specific fonts.
   *
   * If the option 'skipSystemFonts' is enabled,
   * we skip those fonts to choose a font Sketch is capable of.
   * */
  skipSystemFonts?: boolean;
}

export enum TextHorizontalAlign {
  Left = 'left',
  Right = 'right',
  Center = 'center',
  Justify = 'justify',
}
export enum TextVerticalAlign {
  Top = 'top',
  Middle = 'middle',
  Bottom = 'bottom',
}

/**
 * 文本样式
 */
class TextStyle {
  constructor(param?: TextStyleParams) {
    if (param) {
      const {
        color,
        fontFamily,
        fontWeight,
        lineHeight,
        letterSpacing,
        textTransform,
        textDecoration,
        textAlign,
        skipSystemFonts,
        fontSize,
      } = param;
      this.color = new Color(color);
      this.fontSize = fontSize || 14;

      this.lineHeight = lineHeight;
      this.letterSpacing = letterSpacing;

      this.textTransform = textTransform;
      this.textDecoration = textDecoration;
      this.textAlign = textAlign || TextHorizontalAlign.Left;

      if (fontWeight) {
        this.fontWeight = fontWeight.toString();
      }

      if (fontFamily) {
        this.fontFamily = getFirstFont(fontFamily, skipSystemFonts);
      }
    }
  }

  color: Color = new Color();

  /**
   * 字体家族
   * */
  fontFamily: string = 'PingFang SC';

  /**
   * 字体大小
   * */
  fontSize: number = 14;

  /**
   * 行高
   * */
  lineHeight?: number;

  /**
   * 字宽
   * */
  letterSpacing?: number;

  /**
   * 字重
   */
  fontWeight: string = '';

  /**
   * 字体变换
   *
   * 例如全部大写等
   * */
  textTransform?: string = '';

  /**
   * 文本横向对齐
   * */
  textAlign: TextHorizontalAlign = TextHorizontalAlign.Left;

  /**
   * 文本纵向对齐
   */
  verticalAlign: TextVerticalAlign = TextVerticalAlign.Top;

  /**
   * 文本装饰
   *
   * 例如 下划线、删除线等
   * */
  textDecoration?: string;

  /**
   * 字体类型
   * */
  FONT_STYLES = {
    normal: false,
    italic: true,
    oblique: true,
  };

  /**
   * 取得 sketch 下的横向对齐参数
   */
  getSketchHorizontalAlign = () => {
    // 默认使用左对齐
    return SketchFormat.TextHorizontalAlignment.Left;

    // 相关 Bug https://github.com/ant-design/html2sketch/issues/51
    // switch (this.textAlign) {
    //   case 'left':
    //   default:
    //     return SketchFormat.TextHorizontalAlignment.Left;
    //   case 'right':
    //     return SketchFormat.TextHorizontalAlignment.Right;
    //   case 'center':
    //     return SketchFormat.TextHorizontalAlignment.Centered;
    //   case 'justify':
    //     return SketchFormat.TextHorizontalAlignment.Justified;
    // }
  };

  /**
   * 取得 sketch 下的纵向对齐参数
   */
  getSketchVerticalAlign = () => {
    switch (this.verticalAlign) {
      case 'top':
      default:
        return SketchFormat.TextVerticalAlignment.Top;
      case 'middle':
        return SketchFormat.TextVerticalAlignment.Middle;
      case 'bottom':
        return SketchFormat.TextVerticalAlignment.Bottom;
    }
  };

  /**
   * 取得 sketch 下的文本变化属性
   */
  getTextTransform = () => {
    switch (this.textTransform?.toLowerCase()) {
      case 'uppercase':
        return SketchFormat.TextTransform.Uppercase;
      case 'lowercase':
        return SketchFormat.TextTransform.Lowercase;
      default:
        return SketchFormat.TextTransform.None;
    }
  };

  /**
   * 获取下划线参数
   */
  getUnderlineStyle = () => {
    if (this.textDecoration === 'underline')
      return SketchFormat.UnderlineStyle.Underlined;
    return SketchFormat.UnderlineStyle.None;
  };

  /**
   * 获取下划线参数
   */
  getStrikeThroughStyle = () => {
    if (this.textDecoration === 'line-through') return 1;
    return 0;
  };

  /**
   * 修正字体家族信息
   * */
  fixFontFamilyInfo = (
    _family: string,
    weight?: keyof FontWeightEnum,
    // _fontStyle?: string,
  ): string => {
    const defaultFontFamily = 'PingFangSC';

    const defaultFontWeight: FontWeightType = FONT_WEIGHTS.normal;

    let fontWeight: FontWeightType = weight
      ? FONT_WEIGHTS[weight]
      : defaultFontWeight;
    // Default to PingFangSC if fonts are missing

    // let isItalic = false;

    // let isCondensed = false;

    const familyName: string = defaultFontFamily;
    // if (family && family !== '-apple-system') {
    // familyName = family;
    // }

    // 针对苹方的字体 处理下 bold 的问题
    if (familyName === defaultFontFamily) {
      if (fontWeight === 'Bold') {
        fontWeight = 'Semibold';
      }
    }

    // if (fontStyle) {
    //   isItalic = this.FONT_STYLES[fontStyle] || false;
    // }

    // console.log('是否斜体:', isItalic);
    // return `${familyName}-${fontWeight}`;
    return `${familyName}-${fontWeight}`;
  };

  /**
   * 转为 Sketch JSON对象
   */
  toSketchJSON = (): SketchFormat.TextStyle => {
    return {
      _class: 'textStyle',
      verticalAlignment: this.getSketchVerticalAlign(),
      encodedAttributes: {
        underlineStyle: this.getUnderlineStyle(),
        MSAttributedStringTextTransformAttribute: this.getTextTransform(),
        paragraphStyle: {
          _class: 'paragraphStyle',
          alignment: this.getSketchHorizontalAlign(),
          maximumLineHeight: this.lineHeight || 22,
          minimumLineHeight: this.lineHeight || 22,
        },
        /**
         * 字宽
         * */
        kerning: this.letterSpacing || 0,
        strikethroughStyle: this.getStrikeThroughStyle(),
        MSAttributedStringFontAttribute: {
          _class: 'fontDescriptor',
          attributes: {
            name: this.fixFontFamilyInfo(this.fontFamily, this.fontWeight as keyof FontWeightEnum),
            size: this.fontSize,
          },
        },
        MSAttributedStringColorAttribute: this.color.toSketchJSON(),
      },
    };
  };

  /**
   * 从样式对象中解析出文本的横向对齐方式
   */
  static parseTextHorizontalAlign = (
    styles: CSSStyleDeclaration,
  ): TextHorizontalAlign => {
    const { display, justifyContent, textAlign } = styles;
    switch (display) {
      case 'flex':
      case 'inline-flex':
        switch (justifyContent) {
          case 'start':
          default:
            return TextHorizontalAlign.Left;
          case 'right':
          case 'end':
            return TextHorizontalAlign.Right;
          case 'center':
            return TextHorizontalAlign.Center;
          case 'space-between':
          case 'space-around':
            return TextHorizontalAlign.Justify;
        }
      case 'block':
      default:
        return (textAlign as TextHorizontalAlign) || TextHorizontalAlign.Left;
    }
  };

  /**
   * 从样式对象中解析出文本的纵向对齐方式
   * @param styles
   */
  static parseTextVerticalAlign = (
    styles: CSSStyleDeclaration,
  ): TextVerticalAlign => {
    const { display, alignItems, flexDirection } = styles;
    switch (display) {
      // 针对 flex 布局
      case 'flex':
      case 'inline-flex':
        if (alignItems === 'center') {
          return TextVerticalAlign.Middle;
        }

        switch (flexDirection) {
          case 'row':
          default:
            switch (alignItems) {
              default:
              case 'start':
                return TextVerticalAlign.Top;
              case 'end':
                return TextVerticalAlign.Bottom;
            }
          case 'row-reverse':
            switch (alignItems) {
              default:
              case 'start':
                return TextVerticalAlign.Bottom;
              case 'end':
                return TextVerticalAlign.Top;
            }
        }

      case 'block':
      default:
        return TextVerticalAlign.Top;
    }
  };
}

export default TextStyle;
