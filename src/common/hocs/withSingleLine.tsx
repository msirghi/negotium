import { Editor, Transforms } from 'slate';

function withSingleLine<T extends Editor>(editor: T) {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      if (editor.children.length > 1) {
        Transforms.mergeNodes(editor);
      }
    }

    return normalizeNode([node, path]);
  };

  return editor;
}

export default withSingleLine;
