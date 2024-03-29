// @ts-nocheck
import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
  FC,
} from 'react';
import {
  Editor,
  Transforms,
  Range,
  createEditor,
  Descendant,
  BaseEditor,
  BaseElement,
} from 'slate';
import { withHistory } from 'slate-history';
import {
  Slate,
  Editable,
  ReactEditor,
  withReact,
  useSelected,
  useFocused,
} from 'slate-react';
import withSingleLine from '../../../../../common/hocs/withSingleLine';

type Props = {
  onChange: (val: Descendant[]) => void;
  defaultValue?: Descendant[];
  keywords: string[];
};

const MentionInput: FC<Props> = ({ onChange, defaultValue, keywords }) => {
  const ref = useRef();
  const [value, setValue] = useState<Descendant[]>(
    defaultValue || initialValue
  );
  const [target, setTarget] = useState<Range | null | undefined>();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState('');
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const editor = useMemo(
    // @ts-ignore
    () => withMentions(withSingleLine(withReact(withHistory(createEditor())))),
    []
  );

  const chars = keywords
    .filter((c) => c.toLowerCase().startsWith(search.toLowerCase()))
    .slice(0, 10);

  const onKeyDown = useCallback(
    (event) => {
      if (target) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          case 'ArrowUp':
            event.preventDefault();
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          case 'Tab':
          case 'Enter':
            event.preventDefault();
            Transforms.select(editor, target);
            insertMention(editor, chars[index]);
            setTarget(null);
            break;
          case 'Escape':
            event.preventDefault();
            setTarget(null);
            break;
        }
      }
    },
    [index, search, target]
  );

  useEffect(() => {
    if (value) {
      onChange(value);
    }
  }, [value]);

  useEffect(() => {
    if (target && chars.length > 0) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [chars.length, editor, index, search, target]);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection);
          const wordBefore = Editor.before(editor, start, { unit: 'word' });
          const before = wordBefore && Editor.before(editor, wordBefore);
          const beforeRange = before && Editor.range(editor, before, start);
          const beforeText = beforeRange && Editor.string(editor, beforeRange);
          const beforeMatch = beforeText && beforeText.match(/^!(\w+)$/);
          const after = Editor.after(editor, start);
          const afterRange = Editor.range(editor, start, after);
          const afterText = Editor.string(editor, afterRange);
          const afterMatch = afterText.match(/^(\s|$)/);

          if (beforeMatch && afterMatch) {
            setTarget(beforeRange);
            setSearch(beforeMatch[1]);

            setIndex(0);
            return;
          }
        }

        setTarget(null);
      }}
    >
      <Editable
        renderElement={renderElement}
        onKeyDown={onKeyDown}
        placeholder="New task"
      />
      {target && chars.length > 0 && (
        <div
          ref={ref}
          style={{
            top: '-9999px',
            left: '-9999px',
            position: 'absolute',
            zIndex: 1,
            padding: '3px',
            background: 'white',
            borderRadius: '4px',
            boxShadow: '0 1px 5px rgba(0,0,0,.2)',
          }}
          data-cy="mentions-portal"
        >
          {chars.map((char, i) => (
            <div
              key={char}
              style={{
                padding: '1px 3px',
                borderRadius: '3px',
                background: i === index ? '#B4D5FF' : 'transparent',
              }}
            >
              {char}
            </div>
          ))}
        </div>
      )}
    </Slate>
  );
};

const withMentions = (editor: ReactEditor) => {
  const { isInline, isVoid } = editor;

  editor.isInline = (element: BaseElement) => {
    return element.type === 'mention' ? true : isInline(element);
  };

  editor.isVoid = (element: BaseElement) => {
    return element.type === 'mention' ? true : isVoid(element);
  };

  return editor;
};

const insertMention = (editor: BaseEditor, character: string) => {
  const mention = {
    type: 'mention',
    character,
    children: [{ text: '' }],
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};

const Element = (props) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'mention':
      return <Mention {...props} />;
    default:
      return (
        <b {...attributes} style={{ margin: 0 }}>
          {children}
        </b>
      );
  }
};

const Mention = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <span
      {...attributes}
      contentEditable={false}
      data-cy={`mention-${element.character.replace(' ', '-')}`}
      style={{
        padding: '3px 3px 2px',
        margin: '0 1px',
        verticalAlign: 'baseline',
        display: 'inline-block',
        borderRadius: '4px',
        backgroundColor: '#eee',
        fontSize: '0.9em',
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
      }}
    >
      {element.character}
      {children}
    </span>
  );
};

const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
];

export default MentionInput;
