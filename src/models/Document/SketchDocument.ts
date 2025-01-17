import { uuid } from '../../utils/utils';
import type Group from '../Layer/Group';
import type Color from '../Style/Color';
import type ColorAsset from '../Style/ColorAsset';
import Style from '../Style/Style';
import type Page from './Page';

import type { AnyLayer } from '../../types';
import { SketchFormat } from '../../types';

/**
 * Sketch 文档对象
 */
class SketchDocument {
  id: string;

  colors: Color[];

  /**
   * 色板
   */
  swatches: SketchFormat.Swatch[] = [];

  /**
   * 颜色资产
   */
  colorAssets: ColorAsset[] = [];

  /**
   * 文本样式
   */
  textStyles: SketchFormat.SharedStyle[];

  /**
   * 图层样式
   */
  layerStyles: SketchFormat.SharedStyle[];

  /**
   * 外部图层样式
   */
  foreignLayerStyles: SketchFormat.ForeignLayerStyle[] = [];

  /**
   * 外部文本样式
   */
  foreignTextStyles: SketchFormat.ForeignTextStyle[] = [];

  /**
   * 外部 Swatch
   */
  foreignSwatch: SketchFormat.ForeignSwatch[] = [];

  /**
   * 外部 Symbol
   */
  foreignSymbol: SketchFormat.ForeignSymbol[] = [];

  /**
   * 画板
   */
  pages: Page[];

  /**
   * 文件名
   */
  name: string = '';

  constructor() {
    this.id = uuid();
    this.colors = [];
    this.textStyles = [];
    this.layerStyles = [];
    this.pages = [];
  }

  addPage(page: any) {
    this.pages.push(page);
  }

  addTextStyle(textLayer: AnyLayer, id?: string) {
    this.textStyles.push(Style.layerToSketchSharedStyle(textLayer, id));
  }

  addLayerStyle(layer: Group, id: string) {
    this.layerStyles.push(Style.layerToSketchSharedStyle(layer, id));
  }

  addColor(color: Color) {
    this.colors.push(color);
  }

  /**
   * 转为 Sketch JSON对象
   */
  toSketchJSON(): SketchFormat.Document {
    return {
      _class: 'document',
      do_objectID: this.id,
      assets: {
        do_objectID: uuid(),
        _class: 'assetCollection',
        exportPresets: [],
        images: [],
        gradients: [],
        gradientAssets: [],
        colors: this.colors.map((color) => color.toSketchJSON()),
        colorAssets: this.colorAssets.map((colorAsset) =>
          colorAsset.toSketchJSON(),
        ),
      },
      colorSpace: SketchFormat.ColorSpace.Unmanaged,
      currentPageIndex: 0,
      foreignLayerStyles: this.foreignLayerStyles,
      foreignSymbols: [],
      foreignTextStyles: this.foreignTextStyles,
      foreignSwatches: [],


      layerStyles: {
        _class: 'sharedStyleContainer',
        objects: this.layerStyles,
      },
      layerSymbols: {
        _class: 'symbolContainer',
        objects: [],
      },
      layerTextStyles: {
        _class: 'sharedTextStyleContainer',
        objects: this.textStyles,
      },
      pages: this.pages.map(this.pageToPageReference),
      sharedSwatches: {
        _class: 'swatchContainer',
        objects: this.swatches,
      },
      perDocumentLibraries: [],
    };
  }

  /**
   * 将 Page 转为参考对象
   */
  pageToPageReference = (page: Page): SketchFormat.FileRef => ({
    _class: 'MSJSONFileReference',
    _ref_class: 'MSImmutablePage',
    _ref: `pages/${page.id}`,
  });
}

export default SketchDocument;
