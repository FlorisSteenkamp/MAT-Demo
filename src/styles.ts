
import { makeStyles, createStyles, Theme } from "@material-ui/core";


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        height: 'calc(100% - 65px)',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));


export { useStyles }
