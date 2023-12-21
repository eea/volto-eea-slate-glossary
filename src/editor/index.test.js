import install from './index';
import { makeInlineElementPlugin } from '@plone/volto-slate/elementEditor';
import { GLOSSARY } from './constants';

jest.mock('@plone/volto-slate/elementEditor', () => ({
  makeInlineElementPlugin: jest.fn(),
}));

describe('install', () => {
  it('should correctly configure the Slate editor', () => {
    const mockConfig = { settings: { slate: {} } };
    makeInlineElementPlugin.mockImplementation(() => [
      jest.fn((config) => config),
    ]);

    const newConfig = install(mockConfig);

    expect(makeInlineElementPlugin).toHaveBeenCalledWith(
      expect.objectContaining({
        pluginId: GLOSSARY,
        elementType: GLOSSARY,
      }),
    );
    expect(newConfig.settings.slate.toolbarButtons).toContain('glossary');
    expect(newConfig.settings.slate.expandedToolbarButtons).toContain(
      'glossary',
    );
  });

  it('returns true when formData is truthy', () => {
    const mockConfig = { settings: { slate: {} } };
    const [
      installGlossaryEditor,
    ] = makeInlineElementPlugin.mock.results[0].value;
    installGlossaryEditor(mockConfig);

    const opts = makeInlineElementPlugin.mock.calls[0][0];
    expect(opts.hasValue({})).toBe(true);
    expect(opts.hasValue('some data')).toBe(true);
  });

  it('returns false when formData is falsy', () => {
    const mockConfig = { settings: { slate: {} } };
    const [
      installGlossaryEditor,
    ] = makeInlineElementPlugin.mock.results[0].value;
    installGlossaryEditor(mockConfig);

    const opts = makeInlineElementPlugin.mock.calls[0][0];
    expect(opts.hasValue(null)).toBe(false);
    expect(opts.hasValue(undefined)).toBe(false);
    expect(opts.hasValue('')).toBe(false);
    expect(opts.hasValue(0)).toBe(false);
  });
});
