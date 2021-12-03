import features from './FeatureToggles.json';

type Feature = { [key: string]: boolean };

const isFeatureEnabled = (key: string) => {
  return (features as Feature)[key];
};

const keys = {
  SLATE_INPUT: 'slateInput',
};

const FeatureToggles = {
  isFeatureEnabled,
  keys,
};

export default FeatureToggles;
