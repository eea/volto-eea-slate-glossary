import { GLOSSARY } from './constants';

export const withGlossary = (editor) => {
  const { isInline } = editor;

  editor.isInline = (element) => {
    return element && element.type === GLOSSARY ? true : isInline(element);
  };

  return editor;
};
