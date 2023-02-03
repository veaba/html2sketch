import { Text, SketchDocument } from '@html2sketch';
import { describe, expect, it  } from 'vitest'

describe('Sketch 文档类', () => {
  it('addPage', () => {
    const doc = new SketchDocument();

    expect(doc.toSketchJSON()).toMatchObject({
      pages: [],
    });

    doc.addPage({ id: 'my-page-id' });
    expect(doc.toSketchJSON()).toMatchObject({
      pages: [
        expect.objectContaining({
          _class: 'MSJSONFileReference',
          _ref_class: 'MSImmutablePage',
          _ref: 'pages/my-page-id',
        }),
      ],
    });
  });

  it('addTextStyle', () => {
    const doc = new SketchDocument();

    expect(doc.toSketchJSON()).toMatchObject({
      layerTextStyles: {
        _class: 'sharedTextStyleContainer',
        objects: [],
      },
    });

    // @ts-ignore
    doc.addTextStyle(new Text({ text: '123', style: { color: '#eee' } }));

    expect(doc.toSketchJSON()).toMatchObject({
      layerTextStyles: {
        _class: 'sharedTextStyleContainer',
        objects: [
          {
            _class: 'sharedStyle',
            do_objectID: 'UUID',
            name: '123',
          },
        ],
      },
    });
  });
});
