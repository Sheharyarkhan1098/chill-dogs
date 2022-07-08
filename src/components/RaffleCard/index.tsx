import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import {
  Card,
  CardActions,
  CardMedia,
  IconButton, Button,
  Tooltip,
} from '@material-ui/core';
import { BsStopwatch } from "react-icons/bs";
import { MdOutlineMilitaryTech } from "react-icons/md";
import { Skeleton } from '@material-ui/lab';
import { ArrowForward, ConfirmationNumberOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router';

import { PrizeType, Raffle } from '../../lib/types';
import { routes } from '../../router/routes';
import Countdown from '../Countdown';
import { getDisplayAmount } from '../../lib/accounts';
import { useStyles } from './styles';
import { useViewport } from '../../hooks/useViewport';

export interface RaffleCardProps extends HTMLAttributes<HTMLDivElement> {
  raffle: Raffle;
}

const MAX_TITLE_LENGTH = 20;

const RaffleCard: FC<RaffleCardProps> = ({
  raffle,
  className,
  ...otherProps
}) => {
  const { device } = useViewport();
  const classes = useStyles({ device });
  const { push } = useHistory();
  const [isEnded, setIsEnded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timerId = setInterval(
      () => setIsEnded(new Date() < raffle.endTimestamp),
      1000
    );
    return () => clearInterval(timerId);
  }, [raffle, setIsEnded]);

  if (raffle.prizes.length === 0) return null;

  const prize = raffle.prizes[0];
  const imageUrl =
    raffle.metadata.overviewImageUri
      ? raffle.metadata.overviewImageUri
      : prize.meta.imageUri;

  return (
    <Card
      // onClick={() => {
      //   push(`${routes.RAFFLES}/${raffle.publicKey}`);
      // }}
      className={`${classes.root} ${className}`}
      {...otherProps}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#81d4f2 !important ', borderRadius: "10px", border: "12px solid #81d4f2" }}
    >
      {/* 
  <div className={classes.cardPrizesBadge}>
              {raffle.prizes.length} prize{raffle.prizes.length > 1 && 's'}
            </div> */}

      {/* {new Date() > raffle.endTimestamp && (
        <div className={classes.cardEndedBadge}>Ended</div>
      )} */}
      {!isLoaded && (
        <Skeleton
          variant="rect"
          animation={'wave'}
          classes={{
            root: classes.media,
          }}
        />
      )}
      <CardMedia
        component="img"
        className={classes.media}
        src={imageUrl}
        alt={prize.mint.name}
        style={isLoaded ? {} : { display: 'none' }}
        onLoad={() => setIsLoaded(true)}
      />

      <CardActions className={classes.raffleInfo}>
        <div className={classes.detailsRow1} >
          {raffle.metadata.name.length > MAX_TITLE_LENGTH ? (
            <Tooltip title={raffle.metadata.name} placement="top">
              <div>{raffle.metadata.name.slice(0, MAX_TITLE_LENGTH - 4)} ...</div>
            </Tooltip>
          ) : (
            raffle.metadata.name
          )}
        </div>
        <div className={classes.detailsRow2} style={{marginLeft:'0px'}}>
          <div className={classes.ticketsSold}>


            <div className={classes.label} style={{ fontFamily: 'Inter' }}>
              {/* <span className={classes.cardLabel}>  sold</span> */}
              <ConfirmationNumberOutlined style={{ marginRight: '8px', marginTop: '-2px',color:'#81d4f2' }} /> {raffle.totalTickets} sold
            </div>
          </div>
          <div className={classes.endingIn}>
            <div className={classes.label} style={{ fontFamily: 'Inter' }}>
              {/* <span className={classes.cardLabel}>Ending in</span> */}

              <MdOutlineMilitaryTech size="24" style={{ marginRight: '-20px',color:'#81d4f2' }} /><span style={{ fontFamily: 'Inter' }}>{raffle.prizes.length} winner{raffle.prizes.length > 1 && 's'}</span>
              {/* <div className={classes.cardPrizesBadge}>
              {raffle.prizes.length} prize{raffle.prizes.length > 1 && 's'}
            </div> */}
            </div>
          </div>
        </div>

        <div className={classes.detailsRow3} style={{marginLeft:'0px'}}>
          <div className={classes.label}>
            <BsStopwatch size="24" style={{ marginRight: '8px', marginTop: '-2px',color:'#81d4f2' }} />

            {isEnded ? <><span style={{ whiteSpace: 'nowrap', fontFamily: 'Inter' }}>  Ends in :&nbsp; {' '}</span><Countdown endTimestamp={raffle.endTimestamp} /></>
              :
              <span style={{ fontFamily: 'Inter',whiteSpace:'nowrap' }}>Raffle closed</span>}
          </div>
        </div>

        <div className={classes.detailsRow3} style={{ display: "flex", justifyContent: 'center' }}>
          <div style={{ display: "flex", justifyContent: 'center' }}>

            {isEnded ?
              <Button variant='contained' onClick={() => {
                push(`${routes.RAFFLES}/${raffle.publicKey}`);
              }} 
              style={{ backgroundColor: 'white', color: "black", fontFamily: 'Poppins', marginTop:'34px', borderRadius: "30px" }}>
                
                Join Raffle</Button>
              :
              <Button variant='contained' onClick={() => {
                push(`${routes.RAFFLES}/${raffle.publicKey}`);
              }}
               
                style={{ backgroundColor: 'white', fontFamily: 'Poppins' ,color:"black", marginTop:'34px',
                borderRadius: '30px'}}>
                View winners</Button>}

          </div>
        </div>
      </CardActions>
    </Card>
  );
};

export default RaffleCard;
