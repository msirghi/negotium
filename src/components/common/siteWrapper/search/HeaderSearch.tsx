import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import colors from '../../../../common/styles/colors';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useEffect, useState } from 'react';
import { HeaderSearchOptions } from './types';
import { useRouter } from 'next/router';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useIsMobile } from '../../../../common/hooks/common/useIsMobile';
import { HeaderSearchOption } from './option/HeaderSearchOption';

const useStyles = makeStyles({
  input: {
    backgroundColor: colors.greys['800'],
    borderRadius: 5,
    marginLeft: 20,
    transition: '.3s all ease-in-out',
    '&.Mui-focused': {
      backgroundColor: colors.white,
      border: 'none',
      width: 400,
    },
  },
});

export const HeaderSearch = () => {
  const classes = useStyles();
  const [options, setOptions] = useState<HeaderSearchOptions[]>([]);
  const projects = useSelector((state: RootState) => state.projects.projects);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const closePopper = () => {
    setOpen(false);
  };

  const openPopper = () => {
    setTimeout(() => {
      setOpen(true);
    }, 300);
  };

  const configureProjects = () => {
    const projectOptions: HeaderSearchOptions[] = projects.map((project) => {
      return {
        id: project.id,
        title: project.name,
        onClick: () => {
          closePopper();
          router.push(`/home/projects/${project.id}`);
          setSelectedOption(project.id);
        },
        Icon: ReorderIcon,
      };
    });
    setOptions((prevState) =>
      Array.from(new Set([...prevState, ...projectOptions]))
    );
  };

  useEffect(() => {
    if (projects) {
      configureProjects();
    }
  }, [projects]);

  if (isMobile) {
    return <div />;
  }

  return (
    <Autocomplete
      key={selectedOption}
      disableClearable
      disabledItemsFocusable
      sx={{ width: 300 }}
      onChange={(e, value) => {
        value.onClick();
      }}
      size={'small'}
      id={'header-autocomplete'}
      className={classes.input}
      disablePortal
      open={open}
      onOpen={openPopper}
      onClose={closePopper}
      getOptionLabel={() => ''}
      renderInput={(params) => (
        <TextField {...params} size={'small'} placeholder={'Search'} />
      )}
      options={Array.from(new Set(options))}
      renderOption={(props, option) => (
        <HeaderSearchOption props={props} option={option} />
      )}
    />
  );
};
