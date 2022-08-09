import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
  Modal,
  Box,
  Container,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { sleep } from '@project-serum/common';
import toast from 'react-hot-toast';
import { getDisplayAmount } from '../../lib/accounts';
import { useHistory } from 'react-router';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ArrowBack, ContactsOutlined, DoubleArrow } from '@material-ui/icons';
import { BsStopwatch, BsDiscord, BsTwitter } from 'react-icons/bs';
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
import MuiTableCell from '@material-ui/core/TableCell';
import { MdOutlineMilitaryTech } from 'react-icons/md';
import { ConfirmationNumberOutlined } from '@material-ui/icons';
import PrizeShowcaseOngoing from '../RaffleOngoingScreen/components/PrizeShowcaseOngoing';
import { useViewport } from '../../hooks/useViewport';
import { DeviceType } from '../../providers/ViewportProvider';
import useMediaQuery from '@mui/material/useMediaQuery';
import Footer from '../../components/layout/Footer/index';
import magicicon from '../../assets/magiceden.svg';
import SocialMedia from '../../components/SocialMedia';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide from '../../assets/slide2.png';
import valut from '../../assets/valut.png';
import time from '../../assets/19.png';
import reward from '../../assets/reward.png';
import price from '../../assets/price.png';
import axios from "axios";
import Countdown from '../../components/Countdown';


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
  const [customRaffleData, setCustomRaffleData] = useState<any>({});
  const [winnerResult, setWinnerResult] = useState<any>([]);
  const [isWinner, setIsWinner] = useState<Boolean>(false)
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

  const base_url = "https://raffles.chilldogsclub.com";

  useEffect(() => {
    const getRaffles = async () =>  {
      const data = await axios.get(`${base_url}/get-Raffles`);
      console.log(data.data);
      let currntRaffle = data.data.filter((obj: any) => obj[0] === raffle.publicKey.toString())
      console.log(currntRaffle[0][1]);
      setCustomRaffleData(currntRaffle[0][1]);
    }
    getRaffles();

  },[])

  console.log(raffle, "raflle")

  const TableCell = withStyles({
    root: {
      borderBottom: 'none',
    },
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
    raffle.entrants.forEach((value) =>
      entrantsAll.push({
        address: value.publicKey.toString(),
        tickets: value.tickets,
      })
    );
    let winners = new Array();
    entrantsAll.map((obj) => {
      obj.tickets.map((ticket: any) => {
        winningTickets.map((winTick, key) => {
          if (winTick === ticket) {
            winners.push({
              address: obj.address,
              winnerOfTick: winTick,
              prizeNo: key + 1,
            });
          }
        });
      });
    });
    setWinnerResult(winners);
    handleOpen();
  };

  useEffect(() => {
    checkWinner();
  }, []);

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
      <div
        className="main"
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
            <div className="index-prize"></div>
            <Slider>
              {raffle?.prizes?.map((obj, i) => {
                return (
                  <>
                    <div
                      className="prize-tag"
                      style={{
                        color: '#000',
                        zIndex: '2',
                        fontWeight: '900',
                        textAlign: 'center',
                      }}
                    >
                      Prize {i + 1}
                    </div>
                    <div
                      style={{
                        width: '100%',
                        paddingLeft: '2rem ',
                        background: 'none',
                      }}
                    >
                      <img src={obj.meta.imageUri} alt="" style={{ width: '100%' }} />
                    </div>
                  </>
                );
              })}
            </Slider>
            <div className='description' style={{ textAlign: 'justify', color: 'white' }}>
                      <h2 style={{ textAlign: 'center' }}>Description</h2>
                      <h3>
                        {/* Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled. */}
                        {customRaffleData?.description}
                      </h3>
                    </div>
          </Grid>       
            <>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <Typography
                  variant="h1"
                  className="name-title"
                  style={{
                    fontFamily: 'Rubik Wet Paint',
                    color: '#81d4f2',
                    marginBottom: '0px',
                    textAlign: 'center',
                  }}
                >
                  {` ${raffle.metadata.name}`}
                </Typography>
                <Grid
                  item
                  xs={12}
                  style={{
                    margin: '0.5rem auto',
                  }}
                >
                  {customRaffleData && 
                  <SocialMedia customRaffleData={customRaffleData} />
                  }
                </Grid>

                <Grid
                  item
                  xs={12}
                  lg={8}
                  style={{ width: '100%', margin: 'auto' }}
                >
                  <table
                    style={{
                      color: '#81d4f2',
                      width: '100',
                      lineHeight: '50px'
                    }}
                  >
                  <tr>
                  <td>
                      <img src={valut} alt="" 
                         className="my-ticket-icon" />
                  </td>
                  <td className="td-2" style={{ width: '100%' }}>
                    {/* Sold */}
                    Total Entries: <span className='span-12'>{raffle.totalTickets} / {raffle.entrantsCap}</span>
                  </td>
                </tr>
        
                <tr>
                  <td>
                  <img src={valut} alt="" 
                         className="my-ticket-icon" />
                  </td>
                  <td className="td-2" style={{ width: '100%' }}>
                
                    My Ticket: <span className='span-12'>{entrant?.tickets?.length || 0}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                  <img src={price} alt="" className='price-icon' />
                  </td>
                  <td className="td-2">Price: <span className='span-12'>{getDisplayAmount(
                      raffle.proceeds.ticketPrice,
                      raffle.proceeds.mint
                    )}
                    {" "}
                    {raffle.proceeds.mint.symbol}</span></td>
                </tr>
                <tr>
                  <td>
                  <img src={reward} alt="" 
                         className="reward-icon"/>
                  </td>
                  <td className="td-2" style={{ width: '100%' }}>
                    {/* Collection Size: */}
                    Result:
                  
                  
                    {/* {`${raffle.entrantsCap}`} */}
                    <span className='span-12'>
                    {!isWinner ? "...N/A..." : "Congrats" }
                    </span>

                  </td>
                 
                </tr>
                    <tr>
                      <td>
                        <img src={time} alt=""  className="time-icon"  />
                      </td>
                      <td className="td-2"
                      // className='clock-btn'                      
                      >
                      End Time: <span className='span-12'>Raffle closed</span>
                      </td>
                    </tr>
                  </table>
                </Grid>
              </Grid>
            </>
            {raffle?.randomness && (
            <>
              {typeof entrant !== 'undefined' ? (
                winnerResult[0]?.address === entrant.publicKey.toString() ? (
                  <Typography
                    variant="h4"
                    style={{ fontFamily: 'Inter', color: '#81d4f2' }}
                  >
                    {/* Congratulations, you're the winner */}
                  </Typography>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}

              <TableContainer
                style={{
                  color: '#81d4f2',
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  marginLeft: '-10px',
                }}
              >
                <Table
                  style={{
                    border: '0px',
                  }}
                >
                  <TableHead style={{ color: '#81d4f2' }}>
                    <TableRow style={{ border: '0px', color: '#81d4f2' }}>
                      <TableCell
                        style={{
                          color: '#81d4f2',
                          fontFamily: 'Poppins',
                        }}
                      >
                        <Typography
                          id="modal-modal-title"
                          style={{ fontFamily: 'Poppins' }}
                          variant="h2"
                        >
                          Wallet{' '}
                        </Typography>
                      </TableCell>
                      <TableCell
                        style={{
                          color: '#81d4f2',
                          fontFamily: 'Poppins',
                        }}
                        align="center"
                      >
                        {' '}
                        <Typography
                          id="modal-modal-title"
                          style={{ fontFamily: 'Poppins' }}
                          variant="h2"
                        >
                          Entries
                        </Typography>
                      </TableCell>
                      <TableCell
                        style={{
                          color: '#81d4f2',
                          fontFamily: 'Poppins',
                        }}
                        align="center"
                      >
                        {' '}
                        <Typography
                          id="modal-modal-title"
                          style={{ fontFamily: 'Poppins' }}
                          variant="h2"
                        >
                          Claim
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ color: '#81d4f2' }}>
                    {winnerResult.map((obj: any) => (
                      <>
                        <TableRow style={{ border: '0px', color: '#81d4f2' }}>
                          <TableCell
                            style={{ color: '#81d4f2' }}
                            component="th"
                            scope="row"
                          >
                            <Typography
                              id="modal-modal-title"
                              style={{ fontFamily: 'Poppins' }}
                              variant="body1"
                            >
                              {obj.address}
                            </Typography>
                          </TableCell>

                          <TableCell
                            style={{
                              color: '#81d4f2',
                              fontFamily: 'Poppins',
                            }}
                            align="center"
                          >
                            {obj.prizeNo}
                          </TableCell>
                          <TableCell align="center">
                            <PrizeGalleryEnded
                              raffle={raffle}
                              prizeNo={obj.prizeNo}
                              entrantWinningTickets={entrantWinningTickets}
                              winningTickets={winningTickets}
                              claimPrize={claimPrize}
                              setIsWinner={setIsWinner}
                              scrollRef={prizeGalleryRef}
                            />
                          </TableCell>

                          <br />
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </> )}
        

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h2">
                Winners:
              </Typography>
              {winnerResult.map((obj: any) => (
                <>
                  <Typography id="modal-modal-title" variant="h4">
                    Prize No: {obj.prizeNo}
                  </Typography>
                  <Typography id="modal-modal-title" variant="body1">
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
        </Grid>
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
