import { Node } from 'slate';
import { SlateNode } from '../constants/types';
import {
  initialRichTextValue,
  MENTION_ARRAY_KEYWORDS,
} from '../constants/constants';
import dayjs from 'dayjs';

const serialize = (nodes: SlateNode[]) => {
  return nodes.map((n) => Node.string(n)).join('\n');
};

const transformKeywordToDate = (keyword: string) => {
  if (keyword === 'today') {
    return dayjs().format();
  }
  if (keyword === 'tomorrow') {
    return dayjs().add(1, 'day').format();
  }
};

const detectDateInInput = (value: string) => {
  const keywordFound = MENTION_ARRAY_KEYWORDS.find((keyword) =>
    value.toLowerCase().includes(keyword.toLowerCase())
  );
  if (!keywordFound) {
    return;
  }
  return transformKeywordToDate(keywordFound.toLowerCase());
};

const detectDateKeywords = (
  value: string,
  callback: (date: string | undefined) => void
) => {
  const transformedToDate = SlateUtils.detectDateInInput(value);
  if (transformedToDate) {
    callback(transformedToDate);
    return;
  }
};

const removeDateKeyword = (value: string) => {
  try {
    const parsed = JSON.parse(value);
    parsed[0].children = parsed[0].children.filter(
      (p: { type: string }) => p.type !== 'mention'
    );
    return JSON.stringify(parsed);
  } catch (e) {
    return value;
  }
};

const getInitialValueForSlate = (val: string | undefined) => {
  if (!val) {
    return initialRichTextValue;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return initialRichTextValue;
  }
};

const SlateUtils = {
  serialize,
  detectDateInInput,
  detectDateKeywords,
  removeDateKeyword,
  transformKeywordToDate,
  getInitialValueForSlate,
};

export default SlateUtils;
