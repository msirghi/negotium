import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Row } from '../../utilities/row/Row';
import Typography from '@mui/material/Typography';
import { HeaderSearch } from '../search/HeaderSearch';
import Box from '@mui/material/Box';
import { TaskAdd } from '../taskAdd/TaskAdd';
import { AccountMenu } from '../account';
import AppBar from '@mui/material/AppBar';
import { Theme } from '@mui/system';
import { makeStyles } from '@mui/styles';

type Props = {
  selectedTheme: Theme;
  handleDrawerToggle: () => void;
  drawerWidth: number;
};

const useStyles = makeStyles(() => ({
  appBar: {
    minHeight: 50,
    paddingRight: 0,
  },
}));

export const SiteWrapperHeader = ({ selectedTheme, handleDrawerToggle, drawerWidth }: Props) => {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      sx={{
        ml: { sm: `${drawerWidth}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar className={classes.appBar} sx={{ backgroundColor: selectedTheme!.palette.primary.main }}>
        <IconButton
          id="menu-icon"
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Row alignVerticalCenter>
          <Typography variant="h6" noWrap component="div">
            Negotium
          </Typography>
          <HeaderSearch />
        </Row>
        <Box sx={{ flexGrow: 1 }} />
        <TaskAdd />
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
};
