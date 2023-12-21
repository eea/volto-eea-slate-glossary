import { withGlossary } from './extensions';
import { GLOSSARY } from './constants';

describe('withGlossary', () => {
  it('should set isInline to true for GLOSSARY type elements', () => {
    const mockEditor = {
      isInline: jest.fn().mockReturnValue(false),
    };
    const enhancedEditor = withGlossary(mockEditor);
    const glossaryElement = { type: GLOSSARY };
    expect(enhancedEditor.isInline(glossaryElement)).toBe(true);
  });

  it('should defer to the original isInline for non-GLOSSARY type elements', () => {
    const originalIsInline = jest.fn().mockReturnValue(false);
    const mockEditor = { isInline: originalIsInline };
    const enhancedEditor = withGlossary(mockEditor);
    const nonGlossaryElement = { type: 'non-glossary-type' };
    enhancedEditor.isInline(nonGlossaryElement);
    expect(originalIsInline).toHaveBeenCalledWith(nonGlossaryElement);
  });

  it('should preserve the original isInline behavior', () => {
    const originalIsInline = jest.fn(
      (element) => element.type === 'inline-type',
    );
    const mockEditor = { isInline: originalIsInline };
    const enhancedEditor = withGlossary(mockEditor);
    const inlineElement = { type: 'inline-type' };
    const blockElement = { type: 'block-type' };
    expect(enhancedEditor.isInline(inlineElement)).toBe(true);
    expect(enhancedEditor.isInline(blockElement)).toBe(false);
  });
});
