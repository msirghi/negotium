import { ProjectSettingsOption } from '../../../../common/constants/enums';

export type SettingsOptions = {
  settingsOptions?: {
    onClick: () => void;
  };
  projectOptions?: {
    show: boolean;
    onClick?: (option: ProjectSettingsOption) => void;
  };
};
