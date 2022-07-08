import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DeviceType } from '../../providers/ViewportProvider';

export const useStyles = makeStyles<Theme, { device: DeviceType }>(
  (theme: Theme) => ({
    rafflesGrid: {
      display: 'flex',
      flexGrow: 'initial',
      maxWidth: '104%',
      width:'104%',
    },
    titleBar: ({ device }) => ({
      marginBottom: device === DeviceType.Phone ? '20px' : '50px',
    }),
    mainContent: {
      marginTop: '100px',
      textAlign: 'center',
    },
    raffleCardContainer: ({ device }) => ({
      margin:
        device === DeviceType.Phone ? '0 10px 20px 10px' : '0 20px 30px 20px',
    }),
  })
);
