import React, { FC } from 'react';
import { Grid } from '@material-ui/core';

import { Prize } from '../../../../lib/types';
import PrizeCardOngoing from '../PrizeCardOngoing';
import useCommonStyles from '../../../../assets/styles';
import { useStyles } from './styles';
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export interface PrizeShowcaseProps {
  prizes: Prize[];
}

export const PrizeShowcase: FC<PrizeShowcaseProps> = ({ prizes }) => {
  const classes = { ...useCommonStyles(), ...useStyles() };
  const theme=useTheme();
const matches= useMediaQuery(theme.breakpoints.up("xs"));
  if (prizes.length === 0) return <div className={classes.root}>No prizes</div>;


    return (
      <div className={classes.root}>
        <Grid
          container
          //justifyContent={'space-evenly'}
          direction={'row'}
          className={classes.prizesGrid}
          style={matches?{justifyContent:'center'}:{}}
        >
          <Grid item >
            <PrizeCardOngoing prize={prizes[0]} className={classes.prizeItem} />
          </Grid>
        </Grid>
      </div>
    );

  // if (prizes.length === 2)
  //   return (
  //     <div className={classes.root}>
  //       <Grid
  //         container
  //         //justifyContent={'space-evenly'}
  //         direction={'row'}
  //         className={classes.prizesGrid}
  //       >
  //         <Grid item>
  //           <PrizeCardOngoing
  //             prize={prizes[0]}
  //             index={0}
  //             className={classes.prizeItem}
  //           />
  //         </Grid>
  //         <Grid item>
  //           <PrizeCardOngoing
  //             prize={prizes[1]}
  //             className={classes.prizeItem}
  //             index={1}
  //           />
  //         </Grid>
  //       </Grid>
  //     </div>
  //   );

  // return (
  //   <div className={classes.root}>
  //     <Grid
  //       container
  //       //justifyContent={'space-evenly'}
  //       direction={'row'}
  //       className={classes.prizesGrid}
  //     >
  //       <Grid item>
  //         <PrizeCardOngoing
  //           prize={prizes[0]}
  //           index={0}
  //           className={classes.prizeItem}
  //         />
  //       </Grid>
  //       <Grid item>
  //         <PrizeCardOngoing
  //           prize={prizes[1]}
  //           className={classes.prizeItem}
  //           index={1}
  //         />
  //       </Grid>
  //       <Grid item>
  //         <PrizeCardOngoing
  //           prize={prizes[2]}
  //           className={classes.prizeItem}
  //           index={2}
  //         />
  //       </Grid>
  //     </Grid>
  //   </div>
  // );
};

export default PrizeShowcase;
