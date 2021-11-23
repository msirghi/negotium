import { Node } from 'slate';
import { SlateNode } from '../constants/types';
import { MENTION_ARRAY_KEYWORDS } from '../constants/constants';
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
    parsed[0].children = parsed[0].children.filter((p) => p.type !== 'mention');
    return JSON.stringify(parsed);
  } catch (e) {
    return value;
  }
};

const isEmptyValue = (value: string) => {
  try {
    const parsed = JSON.parse(value).children.filter((p) => p.text);
    console.log('parsed.length', parsed.length);
    return parsed.length === 0;
  } catch (e) {
    return true;
  }
};

const SlateUtils = {
  serialize,
  detectDateInInput,
  detectDateKeywords,
  removeDateKeyword,
  isEmptyValue,
};

export default SlateUtils;
