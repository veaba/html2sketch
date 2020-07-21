import Color, { ColorParam } from './Color';
import StyleBase from './Base';
import { CGPoint, SketchFormat } from '../../index';
import { defaultContextSettings } from '../utils';
import Gradient from './Gradient';
import Image from './Image';

export interface BorderProps {
  type: SketchFormat.FillType;
  color?: ColorParam;
  image?: string;
  gradient?: {
    to: CGPoint;
    from: CGPoint;
    gradientType: SketchFormat.GradientType;
    stops: ColorParam[];
  };
  position?: SketchFormat.BorderPosition;
  name?: string;
  thickness?: number;
}

/**
 * 描边对象
 **/
class Border extends StyleBase {
  constructor(props: BorderProps) {
    super();
    const { type, color, name, image, gradient, position, thickness } = props;

    this.name = name || 'Border';
    this.type = type;
    this.position = position || SketchFormat.BorderPosition.Inside;
    this.thickness = thickness;
    switch (type) {
      case SketchFormat.FillType.Color:
        this.color = new Color(color);
        break;
      case SketchFormat.FillType.Gradient:
        this.gradient = new Gradient(gradient);
        break;
      case SketchFormat.FillType.Pattern:
        this.image = new Image(image);
    }
  }

  /**
   * 颜色填充类型
   **/
  type: SketchFormat.FillType;
  /**
   * 颜色
   */
  color?: Color;
  /**
   * 色彩节点
   */
  stops: Color[];

  /**
   * 终点
   */
  to: CGPoint;

  /**
   * 渐变类型
   **/
  gradient?: Gradient;

  /**
   * 使用图片进行填充
   **/
  image?: Image;

  /**
   * 描边位置, 默认为内部描边
   **/
  position: SketchFormat.BorderPosition;

  /**
   * 描边宽度 默认为 1
   **/
  thickness: number = 1;

  /**
   * 转为 Sketch JSON 对象
   * @returns {SketchFormat.Border}
   */
  toSketchJSON = (): SketchFormat.Border => {
    return {
      _class: SketchFormat.ClassValue.Border,
      isEnabled: true,
      fillType: this.type,
      color: this.color && this.color.toSketchJSON(),
      contextSettings: defaultContextSettings,
      gradient: this.gradient && this.gradient.toSketchJSON(),
      position: this.position,
      thickness: this.thickness,
    };
  };
}

export default Border;
