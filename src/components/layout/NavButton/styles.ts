import { Theme } from '@material-ui/core';
import { makeStyles, darken } from '@material-ui/core/styles';
import { fontGrid } from '@mui/material/styles/cssUtils';


export const useStyles = makeStyles<Theme, { isCurrent: boolean }>(
  (theme: Theme) => ({
    navButtons: ({ isCurrent }) => ({
      fontFamily:'Rubik Wet Paint',
      fontWeight: 400,
      // fontSize:`${font}`,
      // lineHeight: '75px',
      // background: 'linear-gradient(273.03deg, #86AEE0 4.06%, #D299DC 91.71%)',
      color: "white",
      // backgroundclip: 'text',
      // WebkitBackgroundClip:'text',
      // textFillColor: 'transparent',
      textTransform:'capitalize'
    }),
  })
);
