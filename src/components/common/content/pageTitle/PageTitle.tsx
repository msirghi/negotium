import { FC } from 'react';
import { IconButton, Typography } from '@mui/material';
import { If } from '../../utilities/if/If';
import { UpperHeader } from './upperHeader/UpperHeader';
import { TaskWrapperTitleOptions } from '../types';
import { EditableTitle } from './editableTitle/EditableTitle';
import { Row } from '../../utilities/row/Row';
import SettingsIcon from '@mui/icons-material/Settings';
import { makeStyles } from '@mui/styles';
import { SettingsOptions } from './types';
import { ProjectOptions } from './projectOptions/ProjectOptions';
import { ProjectSettingsOption } from '../../../../common/constants/enums';

type Props = {
  title: string;
  editableOptions?: TaskWrapperTitleOptions;
  showUpperHeader?: boolean;
  upperHeaderTitle?: string;
} & SettingsOptions;

const useStyles = makeStyles({
  settingsIcon: {
    marginLeft: 'auto',
  },
});

export const PageTitle: FC<Props> = ({ title, showUpperHeader, upperHeaderTitle, editableOptions, settingsOptions, projectOptions }) => {
  const classes = useStyles();

  const onOptionChange = (option: ProjectSettingsOption) => {
    if (projectOptions && projectOptions.onClick) {
      projectOptions.onClick(option);
    }
  };

  return (
    <div>
      <If condition={Boolean(showUpperHeader && upperHeaderTitle)}>
        <UpperHeader title={upperHeaderTitle!} />
      </If>
      <If condition={!!editableOptions}>
        <EditableTitle title={title} editableOptions={editableOptions!} />
      </If>
      <If condition={!editableOptions}>
        <Row alignVerticalCenter>
          <Typography fontSize={28}>{title}</Typography>
          {settingsOptions && (
            <IconButton className={classes.settingsIcon} onClick={settingsOptions!.onClick}>
              <SettingsIcon />
            </IconButton>
          )}

          <If condition={!!projectOptions}>
            <ProjectOptions onClick={onOptionChange} />
          </If>
        </Row>
      </If>
    </div>
  );
};
