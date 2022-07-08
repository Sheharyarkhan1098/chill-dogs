import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { DeviceType } from '../../../providers/ViewportProvider';

export const useStyles = makeStyles<Theme, { device: DeviceType }>(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: '30px',
    },
    socialLink: {
      height: '194.77px',
      // margin: '0 70px',
    },
    footerText:{
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: '18px',
      lineHeight: '27px',
      textAlign: 'center', 
      color: '#5C5C5C',
      
    },
    footerLogo:{
      height: '194.77px',
      margin: '0 70px',
    },
    maskDataIcons:{
      display: 'flex',
      flexDirection: 'row',
      gap: '30px',
      textAlign:'center',
      alignItems:'center',
      justifyContent:'center'
    },
    img:{
        border: '4px solid #d39add',
        borderRadius: '50%',
        padding: '3px',
        width: '54px',
        height: '54px',
      
    }
  })
);
