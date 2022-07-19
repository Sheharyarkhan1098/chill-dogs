import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, IconButton, Tooltip, Typography, Modal, Box, Container, Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { sleep } from '@project-serum/common';
import toast from 'react-hot-toast';
import { getDisplayAmount } from '../../lib/accounts';
import { useHistory } from 'react-router';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { ArrowBack, ContactsOutlined, DoubleArrow } from '@material-ui/icons';
import { BsStopwatch, BsDiscord, BsTwitter } from "react-icons/bs";
import { useProgramApis } from '../../hooks/useProgramApis';
import { claimPrize as claimPrizeQuery } from '../../lib/actions/claimPrize';
import { Raffle } from '../../lib/types';
import { routes } from '../../router/routes';
import Screen from '../../components/layout/Screen';
import { expand } from '../../lib/randomnessTools';
import EndedRaffleActionSection from './components/EndedRaffleActionsSection';
import RaffleInfoSection from '../../components/RaffleInfoSection';
import PrizeGalleryEnded from './components/PrizeGalleryEnded';
import { PrizeShowcaseEnded } from './components/PrizeShowcaseEnded';
import useCommonStyles from '../../assets/styles';
import { useStyles } from './styles';
import MuiTableCell from "@material-ui/core/TableCell";

import PrizeShowcaseOngoing from '../RaffleOngoingScreen/components/PrizeShowcaseOngoing';
import { useViewport } from '../../hooks/useViewport';
import { DeviceType } from '../../providers/ViewportProvider';
import useMediaQuery from '@mui/material/useMediaQuery';
import Footer from '../../components/layout/Footer/index';
interface IRaffleEndedScreenProps {
  raffle: Raffle;
  updateRaffle: () => void;
}

const RaffleEndedScreen: FC<IRaffleEndedScreenProps> = ({
  raffle,
  updateRaffle,
}) => {
  const { device } = useViewport();
  const classes = { ...useCommonStyles(), ...(useStyles({ device }) as any) };
  const { push } = useHistory();
  const { draffleClient } = useProgramApis();
  const [open, setOpen] = useState(false);
  const [winnerResult, setWinnerResult] = useState<any>([]);
  const handleOpen = () => setOpen(false);
  const handleClose = () => setOpen(true);
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'white',
    //border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // console.log(raffle, "raflle")

  const TableCell = withStyles({
    root: {
      borderBottom: "none"
    }
  })(MuiTableCell);

  const prizeGalleryRef = useRef<HTMLDivElement>(null);

  const entrant = useMemo(() => {
    if (!draffleClient.provider.wallet.publicKey) return;
    return raffle?.entrants.get(
      draffleClient.provider.wallet.publicKey.toString()
    );
  }, [raffle, draffleClient.provider.wallet.publicKey]); // "Unnecessary" dependency required due to React not picking up change in publicKey subfield

  // Each winning ticket index for each prize
  const winningTickets = useMemo(() => {
    if (!raffle.randomness || !raffle.entrants || raffle.entrants.size === 0)
      return [];

    const secret = raffle.randomness;
    return raffle.prizes.map((_, prizeIndex) => {
      const rand = expand(secret, prizeIndex);
      return rand % raffle.totalTickets;
    });
  }, [raffle]);

  const checkWinner = () => {
    let entrantsAll = new Array();
    raffle.entrants.forEach((value) => entrantsAll.push({ address: value.publicKey.toString(), tickets: value.tickets }));
    let winners = new Array();
    entrantsAll.map(obj => {
      obj.tickets.map((ticket: any) => {
        winningTickets.map((winTick, key) => {
          if (winTick === ticket) {
            winners.push({ address: obj.address, winnerOfTick: winTick, prizeNo: key + 1 })
          }
        })
      })
    });
    setWinnerResult(winners)
    handleOpen();
  }

  useEffect(() => {
    checkWinner();
  }, [])


  // console.log(winningTickets, "winningTickets")

  const claimPrize = useCallback(
    async (prizeIndex: number, ticketIndex: number) => {
      try {
        await claimPrizeQuery(draffleClient, raffle, prizeIndex, ticketIndex);
        await sleep(500);
        updateRaffle();
        toast.success('Prize claimed, check your wallet!');
      } catch (error: any) {
        if (error.msg) {
          toast.error(`Transaction failed: ${error.msg}`);
        } else {
          toast.error('Unexpected error');
        }
      }
    },
    [draffleClient, raffle, updateRaffle]
  );
  const matches = useMediaQuery('(max-width:600px)');

  const entrantWinningTickets = useMemo(() => {
    if (!entrant || !winningTickets) return [];
    return winningTickets.reduce<{ prizeIndex: number; ticketIndex: number }[]>(
      (acc, ticketIndex, prizeIndex) => {
        if (entrant?.tickets.includes(ticketIndex)) {
          return [...acc, { prizeIndex, ticketIndex }];
        } else {
          return acc;
        }
      },
      []
    );
  }, [entrant, winningTickets]);
  // console.log(raffle.randomness, "gekk")

  if (!raffle) return null;

  return (
    <>

      <div className={classes.root}>


        <Container fixed style={{ backgroundColor: 'rgba(0,0,0,0.8)', border: "12px solid #81d4f2", borderRadius: '20px', padding: '50px' ,marginBottom:'81px'}}>
          {matches

            ?



            <Grid container style={{ width: 'auto', justifyContent: "center" }}>
              <Grid item xs={12} sm={12} md={6} lg={4} style={{ justifyContent: "center" }}>
                <PrizeShowcaseOngoing prizes={raffle.prizes} />

              </Grid>




              <Grid item xs={12} sm={12} md={6} lg={8} style={{ height: 'max-content', justifyContent: 'space-between' }}>

                <Typography component="div" style={{ display: "block", alignItems: "center", margin: "0 0 10px" }} >
                  <span style={{display:"flex",justifyContent:'center'}}>
                  <div className={classes.middleTitleSection}>
                    <Typography variant="h4" style={{ fontFamily: "Angkor", color: '#81d4f2 !important', marginBottom: '10px' }}>
                      {` ${raffle.metadata.name}`}</Typography>

                  </div>
                  </span>
                  <span  style={{display:"flex",justifyContent:'center'}}>
                  <div className={classes.countdown} style={{width:'250px',display:'flex',justifyContent:'center'}}>


                    <BsStopwatch size="24" style={{ marginRight: '8px', marginTop: '3px', color: "#81d4f2" }} />
                    <Tooltip
                      title={raffle.endTimestamp.toString()}
                      placement="bottom"
                    >
                      <Typography variant="h1" className={classes.raffleSubtitle}>
                        Raffle closed
                      </Typography>
                    </Tooltip>
                  </div>
                  </span>
                </Typography>

                {/* {raffle?.randomness ? <Button style={{ color: '#227224', fontSize: '16px', fontWeight: 'normal' }} variant="outlined" onClick={() => checkWinner()}>Show winner/s</Button>
                    :
                    <>
                      <BsStopwatch size="24" style={{ marginRight: '8px', marginTop: '3px' }} />
                      <Tooltip
                        title={raffle.endTimestamp.toString()}
                        placement="bottom"
                      >
                        <Typography variant="h1" className={classes.raffleSubtitle}>
                          Raffle closed
                        </Typography>
                      </Tooltip>
                    </>
                  } */}

                <Typography style={{ display: "block", justifyContent: "space-around", margin: "0 0 10px" }} >
                  <span style={{ justifyContent: 'space-around', display: 'flex', marginBottom: '15px' }}>
                    <div className={classes.middleTitleSection}>
                      <RaffleInfoSection
                        raffle={raffle}
                        userConnected={!!draffleClient.provider.wallet.publicKey}
                        userTickets={entrant?.tickets}
                      />
                    </div>
                  </span>
                  <span style={{ justifyContent: 'space-around', display: 'flex', marginBottom: '15px' }}>
                    {/* <div className={classes.countdown2}>
                      <BsTwitter size={24} style={{ marginRight: '10px' }} />
                      <BsDiscord size={24} />

                    </div> */}
                    </span>
                </Typography>

                {raffle?.randomness ?
                  <>

                    {typeof entrant !== "undefined" ? winnerResult[0].address === entrant.publicKey.toString() ?
                      <Typography variant='h4' style={{ fontFamily: 'Poppins', color: '#81d4f2' }}>Congratulations, you're the winner</Typography> :
                      <></> : <></>
                    }


                    <TableContainer style={{ color: '#81d4f2', fontFamily: 'Poppins', fontWeight: 'bold', marginLeft:'-10px'}}>
                      <Table style={{
                        border: "0 px",
                      }}>
                        <TableHead style={{ color: 'black' }}>
                          <TableRow style={{ border: "0 px", color: 'black' }}>
                            <TableCell style={{ color: '#81d4f2', fontFamily: 'Poppins' }}><Typography id="modal-modal-title" style={{ fontFamily: 'Poppins' }} variant="h2" >Wallet </Typography></TableCell>
                            <TableCell style={{ color: '#81d4f2', fontFamily: 'Poppins' }} align="center"> <Typography id="modal-modal-title" style={{ fontFamily: 'Poppins' }} variant="h2" >Entries</Typography></TableCell>
                            <TableCell style={{ color: '#81d4f2', fontFamily: 'Poppins' }} align="center"> <Typography id="modal-modal-title" style={{ fontFamily: 'Poppins' }} variant="h2" >Claim</Typography></TableCell>

                          </TableRow>
                        </TableHead>
                        <TableBody style={{ color: '#81d4f2' }}>
                          {winnerResult.map((obj: any) => (
                            <>
                              <TableRow style={{ border: "0 px", color: 'white' }}>
                                <TableCell style={{ color: '#81d4f2' }} component="th" scope="row">
                                  <Typography id="modal-modal-title" style={{ fontFamily: 'Poppins' }} variant="body1" >
                                    {obj.address}
                                  </Typography>
                                </TableCell>

                                <TableCell style={{ color: '#81d4f2', fontFamily: 'Poppins' }} align="center">{obj.prizeNo}</TableCell>
                                <TableCell align="center">

                                  <PrizeGalleryEnded
                                    raffle={raffle}
                                    prizeNo={obj.prizeNo}
                                    entrantWinningTickets={entrantWinningTickets}
                                    winningTickets={winningTickets}
                                    claimPrize={claimPrize}
                                    scrollRef={prizeGalleryRef}
                                  />
                                </TableCell>




                                {/* <hr /> */}
                                <br />

                              </TableRow>
                            </>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>


                    {/* {winnerResult.address ===entrant ? <></> : <Typography variant='body1'>Congratulations, you're the winner</Typography>} */}












                    {/* <Typography id="modal-modal-title" variant="body1" >
                    Address:
                    Ticket No:
                    </Typography>
                  <Typography id="modal-modal-title" variant="h4" >
                    Prize No:
                  </Typography>

                  {winnerResult.map((obj: any) => (
                    <>
                      <Typography id="modal-modal-title" variant="body1" >
                        {obj.address}

                        {1 + obj.winnerOfTick}
                      </Typography>
                      <Typography id="modal-modal-title" variant="h4" >
                        {obj.prizeNo}
                      </Typography>

                      <br />
                    </>
                  ))} */}

                  </>
                  :
                  <>

                    <Typography component="div" style={{ backgroundColor: 'black', fontFamily: 'Poppins', borderRadius: '20px', padding: '20px', display: "flex", alignItems: "center", justifyContent: "space-around", width: "70%", margin: "0 0 10px" }} >
                      <Typography variant="body2" style={{ fontFamily: 'Poppins', color: '#81d4f2' }}><span style={{ fontSize: 'large' }}>Whitelist spots</span><br />
                        <span style={{ fontSize: '22px', fontWeight: 'bolder' }}>
                          {raffle.prizes.length}</span>
                      </Typography>
                      <Typography variant="body2" style={{ fontFamily: 'Poppins', color: '#81d4f2' }}><span style={{ fontSize: 'large' }}>Collection Size</span><br />
                        <span style={{ fontSize: '22px', fontWeight: 'bolder' }}>{`${raffle.entrantsCap}`}</span>
                      </Typography>
                      <Typography variant="body2" style={{ fontFamily: 'Poppins', color: '#81d4f2' }}><span style={{ fontSize: 'large' }}>Price</span><br />
                        <span style={{ fontSize: '22px', fontWeight: 'bolder' }}>
                          {getDisplayAmount(
                            raffle.proceeds.ticketPrice,
                            raffle.proceeds.mint
                          )}{' '}
                          {raffle.proceeds.mint.symbol}</span>
                      </Typography>
                    </Typography>


                  </>


                }

              </Grid>


            </Grid>



            :


            // ------------------when screen is larger then 600  --------------------

            <Grid container style={{ width: 'auto', justifyContent: "center" }}>
              <Grid item xs={12} sm={12} md={6} lg={4} style={{ justifyContent: "center" }}>
                <PrizeShowcaseOngoing prizes={raffle.prizes} />

              </Grid>




              <Grid item xs={12} sm={12} md={6} lg={8} style={{ height: 'max-content', justifyContent: 'space-between' }}>

                <Typography component="div" style={{ display: "flex", alignItems: "center", margin: "0 0 10px" }} >
                  <div className={classes.middleTitleSection}>
                    <Typography variant="h2" style={{ fontFamily: "Angkor", color: '#81d4f2', marginBottom: '0px', fontSize: '34px' }}>
                      {` ${raffle.metadata.name}`}</Typography>

                  </div>
                  <div className={classes.countdown} style={{ marginTop: '20px' }}>


                    <BsStopwatch size="24" style={{ marginRight: '8px', marginTop: '3px', color: "#81d4f2" }} />
                    <Tooltip
                      title={raffle.endTimestamp.toString()}
                      placement="bottom"
                    >
                      <Typography variant="h2" className={classes.raffleSubtitle}>
                        Raffle closed
                      </Typography>
                    </Tooltip>
                  </div>
                </Typography>

                {/* {raffle?.randomness ? <Button style={{ color: '#227224', fontSize: '16px', fontWeight: 'normal' }} variant="outlined" onClick={() => checkWinner()}>Show winner/s</Button>
                    :
                    <>
                      <BsStopwatch size="24" style={{ marginRight: '8px', marginTop: '3px' }} />
                      <Tooltip
                        title={raffle.endTimestamp.toString()}
                        placement="bottom"
                      >
                        <Typography variant="h1" className={classes.raffleSubtitle}>
                          Raffle closed
                        </Typography>
                      </Tooltip>
                    </>
                  } */}

                <Typography component="div" style={{ display: "flex", alignItems: "center", margin: "0 0 10px" }} >
                  <div className={classes.middleTitleSection}>
                    <RaffleInfoSection
                      raffle={raffle}
                      userConnected={!!draffleClient.provider.wallet.publicKey}
                      userTickets={entrant?.tickets}
                    />
                  </div>
                  {/* <div className={classes.countdown1}>
                    <BsTwitter size={24} style={{ marginRight: '10px' }} />
                    <BsDiscord size={24} />
                  </div> */}
                </Typography>

                {raffle?.randomness ?
                  <>
                  
                    
                    {typeof entrant !== "undefined" ? winnerResult[0]?.address === entrant.publicKey.toString() ? <Typography variant='h4' style={{ fontFamily: 'Inter', color: '#81d4f2' }}>  Congratulations, you're the winner</Typography> : <></> : <></>}


                    <TableContainer style={{ color: '#81d4f2', fontFamily: 'Poppins', fontWeight: 'bold',marginLeft:'-10px' }}>
                      <Table style={{
                        border: "0px",
                      }}>
                        <TableHead style={{ color: '#81d4f2' }}>
                          <TableRow style={{ border: "0px", color: '#81d4f2' }}>
                            <TableCell style={{ color: '#81d4f2', fontFamily: 'Poppins' }}><Typography id="modal-modal-title" style={{ fontFamily: 'Poppins' }} variant="h2" >Wallet </Typography></TableCell>
                            <TableCell style={{ color: '#81d4f2', fontFamily: 'Poppins' }} align="center"> <Typography id="modal-modal-title" style={{ fontFamily: 'Poppins' }} variant="h2" >Entries</Typography></TableCell>
                            <TableCell style={{ color: '#81d4f2', fontFamily: 'Poppins' }} align="center"> <Typography id="modal-modal-title" style={{ fontFamily: 'Poppins' }} variant="h2" >Claim</Typography></TableCell>

                          </TableRow>
                        </TableHead>
                        <TableBody style={{ color: '#81d4f2' }}>
                          {winnerResult.map((obj: any) => (
                            <>
                              <TableRow style={{ border: "0px", color: '#81d4f2' }}>
                                <TableCell style={{ color: '#81d4f2' }} component="th" scope="row">
                                  <Typography id="modal-modal-title" style={{ fontFamily: 'Poppins' }} variant="body1" >
                                    {obj.address}
                                  </Typography>
                                </TableCell>

                                <TableCell style={{ color: '#81d4f2', fontFamily: 'Poppins' }} align="center">{obj.prizeNo}</TableCell>
                                <TableCell align="center">

                                  <PrizeGalleryEnded
                                    raffle={raffle}
                                    prizeNo={obj.prizeNo}
                                    entrantWinningTickets={entrantWinningTickets}
                                    winningTickets={winningTickets}
                                    claimPrize={claimPrize}
                                    scrollRef={prizeGalleryRef}
                                  />
                                </TableCell>




                                {/* <hr /> */}
                                <br />

                              </TableRow>
                            </>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>


                    {/* {winnerResult.address ===entrant ? <></> : <Typography variant='body1'>Congratulations, you're the winner</Typography>} */}












                    {/* <Typography id="modal-modal-title" variant="body1" >
                    Address:
                    Ticket No:
                    </Typography>
                  <Typography id="modal-modal-title" variant="h4" >
                    Prize No:
                  </Typography>

                  {winnerResult.map((obj: any) => (
                    <>
                      <Typography id="modal-modal-title" variant="body1" >
                        {obj.address}

                        {1 + obj.winnerOfTick}
                      </Typography>
                      <Typography id="modal-modal-title" variant="h4" >
                        {obj.prizeNo}
                      </Typography>

                      <br />
                    </>
                  ))} */}

                  </>
                  :
                  <>

                    <Typography component="div" style={{ backgroundColor: 'black', fontFamily: 'Poppins', borderRadius: '20px', padding: '20px', display: "flex", alignItems: "center", justifyContent: "space-around", width: "70%", margin: "0 0 10px" }} >
                      <Typography variant="body2" style={{ fontFamily: 'Poppins', color: '#81d4f2' }}><span style={{ fontSize: 'large' }}>Whitelist spots</span><br />
                        <span style={{ fontSize: '22px', fontWeight: 'bolder' }}>
                          {raffle.prizes.length}</span>
                      </Typography>
                      <Typography variant="body2" style={{ fontFamily: 'Poppins', color: '#81d4f2' }}><span style={{ fontSize: 'large' }}>Collection Size</span><br />
                        <span style={{ fontSize: '22px', fontWeight: 'bolder' }}>{`${raffle.entrantsCap}`}</span>
                      </Typography>
                      <Typography variant="body2" style={{ fontFamily: 'Poppins', color: '#81d4f2' }}><span style={{ fontSize: 'large' }}>Price</span><br />
                        <span style={{ fontSize: '22px', fontWeight: 'bolder' }}>
                          {getDisplayAmount(
                            raffle.proceeds.ticketPrice,
                            raffle.proceeds.mint
                          )}{' '}
                          {raffle.proceeds.mint.symbol}</span>
                      </Typography>
                    </Typography>


                  </>


                }

              </Grid>


            </Grid>
          }

        </Container>








        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h2" >
              Winners:
            </Typography>
            {winnerResult.map((obj: any) => (
              <>
                <Typography id="modal-modal-title" variant="h4" >
                  Prize No: {obj.prizeNo}
                </Typography>
                <Typography id="modal-modal-title" variant="body1" >
                  address: {obj.address}
                  <br />
                  ticket No: {1 + obj.winnerOfTick}
                </Typography>
                <hr />
                <br />
              </>
            ))}
          </Box>
        </Modal>
        {/* {device === DeviceType.Phone ? (
          <>
            <Typography variant="h1">
              {`> ${raffle.metadata.name}`}
              <span className={classes.raffleSubtitle}>[ended]</span>
            </Typography>
            <div className={classes.spacer} />
            <RaffleInfoSection
              raffle={raffle}
              userConnected={!!draffleClient.provider.wallet.publicKey}
              userTickets={entrant?.tickets}
            />
            <div className={classes.spacer} />
            <div className={classes.actionSectionContainer}>
              <div className={classes.actionSection}>
                <EndedRaffleActionSection
                  raffle={raffle}
                  userPubkey={draffleClient.provider.wallet.publicKey}
                  entrant={entrant}
                  entrantWinningTickets={entrantWinningTickets}
                  scrollRef={prizeGalleryRef}
                />
              </div>
            </div>
            <div className={classes.spacer} />
            <Typography variant="overline">Results</Typography>
            <PrizeGalleryEnded
              raffle={raffle}
              entrantWinningTickets={entrantWinningTickets}
              winningTickets={winningTickets}
              claimPrize={claimPrize}
              scrollRef={prizeGalleryRef}
            />
            <div className={classes.spacer} />
          </>
        ) : (
          <>
            <div className={classes.topSection}>
              <div className={classes.raffleTitle}>
                <div className={classes.leftTitleSection}>
                  <IconButton
                    size="medium"
                    className={classes.backButton}
                    onClick={() => push(routes.RAFFLES)}
                  >
                    <ArrowBack className={classes.backButtonIcon} />
                  </IconButton>
                </div>
                <div className={classes.middleTitleSection}>
                  <Typography variant="h1">{`> ${raffle.metadata.name}`}</Typography>
                  <Tooltip
                    title={raffle.endTimestamp.toString()}
                    placement="bottom"
                  >
                    <Typography variant="h1" className={classes.raffleSubtitle}>
                      [ended]
                    </Typography>
                  </Tooltip>
                  {raffle?.randomness && <Button variant="contained" onClick={() => checkWinner()}>Show winner/s</Button>}
                </div>
                <div className={classes.rightTitleSection}></div>
              </div>
            </div>
            <div className={classes.mainContent}>
              <div className={classes.prizesSection}>
                <Typography variant="overline">
                  Prizes
                  {raffle.prizes.length > 3 && (
                    <>
                      {' -'}
                      <Button
                        variant="text"
                        disableRipple
                        className={classes.seeAllPrizesButton}
                        onClick={() =>
                          prizeGalleryRef.current?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          })
                        }
                      >
                        See all {raffle.prizes.length}
                      </Button>
                    </>
                  )}
                </Typography>
                <PrizeShowcaseEnded
                  raffle={raffle}
                  winningTickets={winningTickets}
                />
              </div>
              <div className={classes.detailsSection}>
                <RaffleInfoSection
                  raffle={raffle}
                  userConnected={!!draffleClient.provider.wallet.publicKey}
                  userTickets={entrant?.tickets}
                />
                <div className={classes.actionSectionContainer}>
                  <div className={classes.actionSection}>
                    <EndedRaffleActionSection
                      raffle={raffle}
                      userPubkey={draffleClient.provider.wallet.publicKey}
                      entrant={entrant}
                      entrantWinningTickets={entrantWinningTickets}
                      scrollRef={prizeGalleryRef}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.prizeGallerySection}>
              <DoubleArrow className={classes.scrollIcon} />
              <PrizeGalleryEnded
                raffle={raffle}
                entrantWinningTickets={entrantWinningTickets}
                winningTickets={winningTickets}
                claimPrize={claimPrize}
                scrollRef={prizeGalleryRef}
              />
            </div>
          </>
        )}
        <div className={classes.spacer} /> */}
      </div>
    </>
  );
};

interface IRaffleEndedDetailsProps {
  raffle: Raffle;
  updateRaffle: () => void;
}

const RaffleEndedScreenWithLayout: FC<IRaffleEndedDetailsProps> = (props) => {
  const { push } = useHistory();

  //  console.log("raffle ended screen")

  return (
    <Screen onBackNavigation={() => push(routes.RAFFLES)}>
      <RaffleEndedScreen {...props} />
      {/* <Footer/> */}
    </Screen>
  );
};

export default RaffleEndedScreenWithLayout;
