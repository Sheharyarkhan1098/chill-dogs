// import { Card, Grid, IconButton, Typography } from '@material-ui/core';
import { useWallet } from '@solana/wallet-adapter-react';
import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Add } from '@material-ui/icons';
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import BN from 'bn.js';
import { useTheme } from "@mui/material/styles";

import Screen from '../../../components/layout/Screen';
import WalletButton from '../../../components/layout/WalletButton';
import Spacer from '../../../components/Spacer';
import { useRafflesStore } from '../../../hooks/useRafflesStore';
import { useProgramApis } from '../../../hooks/useProgramApis';
import { DispenserRegistryRaw } from '../../../providers/ProgramApisProvider';
import { routes } from '../../../router/routes';
import { useStyles } from './styles';
import {
  DISPENSER_REGISTRY_ADDRESS,
  DISPENSER_REGISTRY_KEYPAIR,
} from '../../../config/programIds';
import { shortenPubkeyString } from '../../../lib/utils';
import { VAULT_TOKEN_IN, VAULT_TOKEN_OUT } from '../../../config/accounts';
import axios from "axios";
import { TextField, Button, Box, Card, Grid, IconButton, Typography, Tab, Tabs, AppBar, Pagination, Stack, } from '@mui/material';
import moment from "moment-timezone";



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




const AdminHomeScreen: FC = () => {
  const classes = useStyles();
  const { connected } = useWallet();
  const { push } = useHistory();
  const { raffles, fetchAllRaffles } = useRafflesStore();
  const { dispenserClient } = useProgramApis();

  const [dispensers, setDispensers] = useState<
    { account: DispenserRegistryRaw; publicKey: PublicKey }[]
  >([]);
  const [raffleId, setRaffleId] = useState<String>("");
  const [checkRaffleRes, setCheckRaffleRes] = useState<String>("");
  const [targetTokenAccount, setTargetTokenAccount] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [raffleName, setRaffleName] = useState<String>("");
  const [splTokenAdd, setSplTokenAdd] = useState<String>("");
  const [ticketPrice, setTicketPrice] = useState<String>("");
  const [endDate, setEndDate] = useState<String>("");
  const [maxEntrants, setMaxEntrants] = useState<String>("");
  const [cluster, setCluster] = useState<String>("");
  const [clusterCheck, setClusterCheck] = useState<String>("");
  const [programId, setProgramId] = useState<String>("");
  const [createRaffleRes, setCreateRaffleRes] = useState<String>("");
  const [days, setDays] = useState<number>(1);



  const [prizeAmount, setPrizeAmount] = useState<String>("");
  const [prizeIndex, setPrizeIndex] = useState<String>("");
  const [prizeAddress, setPrizeAddress] = useState<String>("");
  const [addPrizeRes, setAddPrizeRes] = useState<String>("");
  const [addWithdraw2, setAddWithdraw] = useState<String>("");

  const [showCheck, setShowCheck] = useState<Boolean>(false);
  const [showCreate, setShowCreate] = useState<Boolean>(false);
  const [showAdd, setShowAdd] = useState<Boolean>(false);
  const [showWith, setShowWith] = useState<Boolean>(false);

  // constanst_config

  const PROGRAM_ID = "EKKrfGqarrKykjBfsDoetezDXtuzMoYGb4rvtd629oms";
  // const CLUSTER = "mainnet";
  const CLUSTER = "devnet";


  // const base_url = "http://localhost:8000";
  // const base_url = "http://138.197.73.202:8000";
  const base_url = "https://raffles.chilldogsclub.com";
  // const base_url = "https://house.mellowmen.io";
  // const base_url = "https://defi-games.io";


  useEffect(() => {
    if (days > 0) {
      const date = moment.now() + (days * 60 * 60 * 24 * 1000)
      // console.log(date, "lopipo")
      // console.log(moment(date).tz('America/Danmarkshavn').format('YYYY-MM-DD h:mm'), "lopipo")
      const endingDate = moment(date).tz('America/Danmarkshavn').format('YYYY-MM-DD HH:mm');
      setEndDate(endingDate)
    }
  }, [days])

  useEffect(() => {
    fetchAllRaffles(true);
  }, [fetchAllRaffles]);

  async function checkRaffle() {
    const result = await axios(`${base_url}/check-raffle?raffleId=${raffleId}&cluster=${CLUSTER}`);
    console.log(result.data, "asdasdasds")
    setCheckRaffleRes(result.data);
  }

  async function createRaffle() {
    // const result = await axios(`${base_url}/create-raffle?password=${password}&raffleName=${raffleName}&splToken=${splTokenAdd}&ticketPrice=${ticketPrice}&endDate=${endDate}&maxEntrants=${maxEntrants}&cluster=${CLUSTER}&programId=${PROGRAM_ID}`);
    const body = {
      password,
      raffleName,
      splToken: splTokenAdd,
      ticketPrice,
      endDate,
      maxEntrants,
      cluster: CLUSTER,
      programId: PROGRAM_ID
    }
    const result = await axios.post(`${base_url}/create-raffle`, body);
    console.log(result.data, "asdasdasds")
    setCreateRaffleRes(result.data);
  }

  async function addPrize() {
    const result = await axios(`${base_url}/add-prize?raffleId=${raffleId}&NFTAddress=${prizeAddress}&prizeAmount=${prizeAmount}&prizeIndex=${prizeIndex}&cluster=${CLUSTER}&programId=${PROGRAM_ID}`);
    console.log(result.data, "asdasdasds")
    setAddPrizeRes(result.data);
  }

  // this is withdraw

  async function addWithdraw() {
    const result = await axios(`${base_url}/withdraw?raffleId=${raffleId}&targetTokenAccount=${targetTokenAccount}&cluster=${CLUSTER}&programId=${PROGRAM_ID}`);
    console.log(result.data, "withdraw")
    setAddWithdraw(result.data);
  }



  function handleCheck() {
    setShowCheck(!showCheck);
    setShowCreate(false);
    setShowAdd(false);
    setShowWith(false);
    setRaffleId("");
    setCheckRaffleRes("");
  }

  function handleCreate() {
    setShowCheck(false);
    setShowCreate(!showCreate);
    setShowAdd(false);
    setShowWith(false);
    setCluster("");
    setProgramId("");
    setCreateRaffleRes("");
  }

  function handleAdd() {
    setShowCheck(false);
    setShowCreate(false);
    setShowAdd(!showAdd);
    setShowWith(false);
    setRaffleId("");
    setCluster("");
    setProgramId("");
    setAddPrizeRes("");
  }

  function handleWithdraw() {
    setShowCheck(false);
    setShowCreate(false);
    setShowAdd(false);
    setShowWith(!showWith);
    setRaffleId("");
    setCluster("");
    setTargetTokenAccount("");
    setProgramId("");
  }

  useEffect(() => {
    dispenserClient.account.registry.all().then(setDispensers);
  }, [dispenserClient, setDispensers]);


  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };




  return (
    <div className={classes.root}>
      {connected ? (
        <>
          {/* <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h3">Dispensers</Typography>
            <IconButton
              size={'small'}
              onClick={() => {
                dispenserClient.rpc
                  .createRegistry(new BN(500_000_000), new BN(1_000_000), {
                    accounts: {
                      registry: DISPENSER_REGISTRY_ADDRESS,
                      vaultTokenIn: VAULT_TOKEN_IN,
                      vaultTokenOut: VAULT_TOKEN_OUT,
                      admin: dispenserClient.provider.wallet.publicKey,
                      mintTokenIn: new PublicKey(
                        'So11111111111111111111111111111111111111112'
                      ),
                      mintTokenOut: new PublicKey(
                        'zRpVjG5wMWrNhpTtSiGMz9iBaMTQDdaVGCFLmYqCs4U'
                      ),
                      tokenProgram: TOKEN_PROGRAM_ID,
                      systemProgram: SystemProgram.programId,
                      rent: SYSVAR_RENT_PUBKEY,
                    },
                    signers: [DISPENSER_REGISTRY_KEYPAIR],
                  })
                  .then((res) => console.log(res));
              }}
            >
              <Add className={classes.scrollButtonIcon} />
            </IconButton>
          </div>
          <Spacer height={'20px'} />
          {dispensers.length === 0 ? (
            <>No dispenser found.</>
          ) : (
            <Grid container spacing={1} className={classes.raffleGrid} style={{ cursor: "pointer" }}>
              {dispensers.map((dispenser) => (
                <Grid
                  key={dispenser.publicKey.toString()}
                  item
                  xs={3}
                  spacing={3}
                  className={classes.raffleGridItem}
                >
                  <Card className={classes.raffleCard}>
                    <Typography>
                      Admin: {shortenPubkeyString(dispenser.account.admin)}
                    </Typography>
                    <Typography>
                      In: {shortenPubkeyString(dispenser.account.mintTokenIn)}
                    </Typography>
                    <Typography>
                      {'->'} Vault:{' '}
                      {shortenPubkeyString(dispenser.account.vaultTokenIn)}
                    </Typography>
                    <Typography>
                      Out: {shortenPubkeyString(dispenser.account.mintTokenOut)}
                    </Typography>
                    <Typography>
                      {'->'} Vault:{' '}
                      {shortenPubkeyString(dispenser.account.vaultTokenOut)}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )} */}




          <Box sx={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.8)', border: "12px solid #81d4f2", padding: '50px', borderRadius: '25px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor="secondary" centered >

                <Tab label="Check Raffle" {...a11yProps(0)} style={{ fontFamily: 'Poppins', color:'#A7A7A7'}} />
                <Tab label="Create Raffle" {...a11yProps(1)} style={{ fontFamily: 'Poppins',color:'#A7A7A7' }} />
                <Tab label="Add prize to raffle" {...a11yProps(2)} style={{ fontFamily: 'Poppins',color:'#A7A7A7' }} />
                <Tab label="Withdraw" {...a11yProps(3)} style={{ fontFamily: 'Poppins',color:'#A7A7A7' }} />

              </Tabs>
            </Box>
            <TabPanel value={value} index={0} >
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.textFormStyle}>
                  <TextField className={classes.textFieldSx} label="Raffle Id" variant='outlined' color='secondary' onChange={(e) => { setRaffleId(e.target.value) }} InputProps={{style:{ color:'white'}}} InputLabelProps={{style:{color:'white'}}}/>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField className={classes.textFieldSx} label="Cluster" variant='outlined' onChange={(e) => { setClusterCheck(e.target.value) }} />
                </Grid> */}
                <br />
                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.textFormStyle2}>
                  <Button variant="outlined" onClick={checkRaffle} style={{ backgroundColor: "none", color: "white", border: "1px solid white", borderRadius: '5px', fontFamily: 'Poppins', padding: '10px 30px 10px 30px', marginTop: '20px' }}>Check Raffle</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.textFormStyle2}>
                  <p style={{ color: "white" }}>{checkRaffleRes}</p>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField color='secondary' className={classes.textFieldSx} label="Raffle Name" variant='outlined' onChange={(e) => { setRaffleName(e.target.value) }}  InputProps={{style:{ color:'white'}}} InputLabelProps={{style:{color:'white'}}}/>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField color='secondary' className={classes.textFieldSx} label="SPL Token address" variant='outlined' onChange={(e) => { setSplTokenAdd(e.target.value) }}  InputProps={{style:{ color:'white'}}} InputLabelProps={{style:{color:'white'}}}/>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField color='secondary' className={classes.textFieldSx} type="number" label="Price of Ticket" variant='outlined' onChange={(e) => { setTicketPrice(e.target.value) }}  InputProps={{style:{ color:'white'}}} InputLabelProps={{style:{color:'white'}}}/>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField color='secondary' type='number' className={classes.textFieldSx} label="Max Entrants" variant='outlined' onChange={(e) => { setMaxEntrants(e.target.value) }}  InputProps={{style:{ color:'white'}}} InputLabelProps={{style:{color:'white'}}}/>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <Stack spacing={2}  style={{color:'white'}}>
                    <Typography variant="h6">
                      Ending Duration: (in days)
                    </Typography>
                    <Pagination onChange={(e, value) => { setDays(value) }} count={31} variant="outlined" />

                  </Stack>
                  {/* <TextField className={classes.textFieldSx} label="Ending Date (i.e. 2022-05-23 14:30)" variant='outlined' onChange={(e) => { setEndDate(e.target.value) }} /> */}
                </Grid>
                {/* <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField className={classes.textFieldSx} label="Cluster" variant='outlined' onChange={(e) => { setCluster(e.target.value) }} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField className={classes.textFieldSx} label="Program Id" variant='outlined' onChange={(e) => { setProgramId(e.target.value) }} />
                </Grid> */}
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField color='secondary' className={classes.textFieldSx} label="Password" variant='outlined' onChange={(e) => { setPassword(e.target.value) }} InputProps={{style:{ color:'white'}}} InputLabelProps={{style:{color:'white'}}} />
                </Grid>
                <br />
                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.textFormStyle2}>
                  <Button variant="outlined" onClick={createRaffle}  style={{ backgroundColor: "none", color: "white", border: "1px solid white", borderRadius: '5px', fontFamily: 'Poppins', padding: '10px 30px 10px 30px', marginTop: '20px' }}>Create Raffle</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.textFormStyle2}>
                  <p style={{ color: "white" }}>{createRaffleRes}</p>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid container>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField color='secondary' className={classes.textFieldSx} label="Raffle Id" variant='outlined' onChange={(e) => { setRaffleId(e.target.value) }} InputProps={{style:{ color:'white'}}} InputLabelProps={{style:{color:'white'}}}/>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField color='secondary' className={classes.textFieldSx} label="Prize token Address" variant='outlined' onChange={(e) => { setPrizeAddress(e.target.value) }} InputProps={{style:{ color:'white'}}} InputLabelProps={{style:{color:'white'}}} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField color='secondary' className={classes.textFieldSx} type="number" label="Prize Amount in lamports" variant='outlined' onChange={(e) => { setPrizeAmount(e.target.value) }}  InputProps={{style:{ color:'white'}}} InputLabelProps={{style:{color:'white'}}}/>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField color='secondary' className={classes.textFieldSx} type="number" label="Prize Number" variant='outlined' onChange={(e) => { setPrizeIndex(e.target.value) }} InputProps={{style:{ color:'white'}}} InputLabelProps={{style:{color:'white'}}}/>

                </Grid>
                {/* <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField className={classes.textFieldSx} label="Cluster" variant='outlined' onChange={(e) => { setCluster(e.target.value) }} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField className={classes.textFieldSx} label="Program Id" variant='outlined' onChange={(e) => { setProgramId(e.target.value) }} />
                </Grid> */}
                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.textFormStyle2}>
                  <Button variant="outlined"  style={{ backgroundColor: "none", color: "white", border: "1px solid white", borderRadius: '5px', fontFamily: 'Poppins', padding: '10px 30px 10px 30px', marginTop: '20px' }} onClick={addPrize}>Add prize to Raffle</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.textFormStyle2}>
                  <p style={{ color: "white" }}>{addPrizeRes}</p>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Grid container>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField color='secondary' className={classes.textFieldSx} label="Raffle Id" variant='outlined' onChange={(e) => { setRaffleId(e.target.value) }} InputProps={{style:{ color:'white'}}} InputLabelProps={{style:{color:'white'}}} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField color='secondary' className={classes.textFieldSx} label="Token" variant='outlined' onChange={(e) => { setTargetTokenAccount(e.target.value) }} InputProps={{style:{ color:'white'}}} InputLabelProps={{style:{color:'white'}}}/>
                </Grid>
                {/* <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField className={classes.textFieldSx} label="Cluster" variant='outlined' onChange={(e) => { setCluster(e.target.value) }} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} className={classes.textFormStyle}>
                  <TextField className={classes.textFieldSx} label="Program Id" variant='outlined' onChange={(e) => { setProgramId(e.target.value) }} />
                </Grid> */}
                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.textFormStyle2}>
                  <Button variant="outlined" onClick={addWithdraw}  style={{ backgroundColor: "none", color: "white", border: "1px solid white", borderRadius: '5px', fontFamily: 'Poppins', padding: '10px 30px 10px 30px', marginTop: '20px' }}>Withdraw</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} className={classes.textFormStyle2}>
                  <p style={{ color: "white" }}>{addWithdraw2}</p>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>


          {/* <Spacer height={'20px'} />
          <Typography variant="h3" onClick={handleCheck} style={{ backgroundColor: '#227224', color: 'white', cursor: "pointer", border: "1px black solid", padding: 10, borderRadius: 10 }}>Check raffle</Typography>
          <Spacer height={'20px'} />
          {showCheck &&
            <div>
              <TextField label="Raffle Id" variant='outlined' onChange={(e) => { setRaffleId(e.target.value) }} /> <br />
              <TextField label="Cluster" variant='outlined' onChange={(e) => { setClusterCheck(e.target.value) }} /> <br />
              <br />
              <Button variant="contained" onClick={checkRaffle} >Check Raffle</Button>
              <p style={{ color: "black" }}>{checkRaffleRes}</p>

              <input type="text" placeholder="Raffle Id" onChange={(e) => { setRaffleId(e.target.value) }} /><br />
              <input type="text" placeholder="Cluster" onChange={(e) => { setClusterCheck(e.target.value) }} /><br />
              <br />
              <button onClick={checkRaffle} >Check Raffle</button>
              <p style={{ color: "black" }}>{checkRaffleRes}</p>
            </div>}
          <Spacer height={'20px'} />
          <Typography variant="h3" onClick={handleCreate} style={{ backgroundColor: '#227224', color: 'white', cursor: "pointer", border: "1px black solid", padding: 10, borderRadius: 10 }}>Create raffle</Typography>
          <Spacer height={'20px'} />
          {showCreate &&
            <div>
              <TextField label="Raffle Name" variant='outlined' onChange={(e) => { setRaffleName(e.target.value) }} /> <br />
              <TextField label="SPL Token address" variant='outlined' onChange={(e) => { setSplTokenAdd(e.target.value) }} /> <br />
              <TextField label="Price of Ticket" variant='outlined' onChange={(e) => { setTicketPrice(e.target.value) }} /> <br />
              <TextField label="Ending Date (i.e. 2022-05-23 14:30)" variant='outlined' onChange={(e) => { setEndDate(e.target.value) }} /> <br />
              <TextField label="Max Entrants" variant='outlined' onChange={(e) => { setMaxEntrants(e.target.value) }} /> <br />
              <TextField label="Cluster" variant='outlined' onChange={(e) => { setCluster(e.target.value) }} /> <br />
              <TextField label="Program Id" variant='outlined' onChange={(e) => { setProgramId(e.target.value) }} /> <br />
              <TextField label="Password" variant='outlined' onChange={(e) => { setPassword(e.target.value) }} /> <br />
              <br />
              <Button variant="contained" onClick={createRaffle}>Create Raffle</Button>
              <p style={{ color: "black" }}>{createRaffleRes}</p>

              <input type="text" placeholder="Raffle Name" onChange={(e) => { setRaffleName(e.target.value) }} /> <br />
              <input type="text" placeholder="SPL Token address" onChange={(e) => { setSplTokenAdd(e.target.value) }} /> <br />
              <input type="text" placeholder="Price of Ticket" onChange={(e) => { setTicketPrice(e.target.value) }} /> <br />
              <input type="text" placeholder="Ending Date (i.e. 2022-05-23 14:30)" onChange={(e) => { setEndDate(e.target.value) }} /> <br />
              <input type="text" placeholder="Max Entrants" onChange={(e) => { setMaxEntrants(e.target.value) }} /> <br />
              <input type="text" placeholder="Cluster" onChange={(e) => { setCluster(e.target.value) }} /> <br />
              <input type="text" placeholder="Program Id" onChange={(e) => { setProgramId(e.target.value) }} /> <br />
              <input type="text" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} /> <br />
              <button onClick={createRaffle}>Create Raffle</button>
              <p style={{ color: "black" }}>{createRaffleRes}</p>
            </div>}
          <Spacer height={'20px'} />
          <Typography variant="h3" onClick={handleAdd} style={{ backgroundColor: '#227224', color: 'white', cursor: "pointer", border: "1px black solid", padding: 10, borderRadius: 10 }}>Add prize to raffle</Typography>
          <Spacer height={'20px'} />
          {showAdd &&
            <div>
              <TextField label="Raffle Id" variant='outlined' onChange={(e) => { setRaffleId(e.target.value) }} /> <br />
              <TextField label="Prize token Address" variant='outlined' onChange={(e) => { setPrizeAddress(e.target.value) }} /> <br />
              <TextField label="Prize Amount in lamports" variant='outlined' onChange={(e) => { setPrizeAmount(e.target.value) }} /> <br />
              <TextField label="Prize Number" variant='outlined' onChange={(e) => { setPrizeIndex(e.target.value) }} /> <br />
              <TextField label="Cluster" variant='outlined' onChange={(e) => { setCluster(e.target.value) }} /> <br />
              <TextField label="Program Id" variant='outlined' onChange={(e) => { setProgramId(e.target.value) }} /> <br /> <br />
              <Button variant="contained" onClick={addPrize}>Add prize to Raffle</Button>
              <p style={{ color: "black" }}>{addPrizeRes}</p>

              <input type="text" placeholder="Raffle Id" onChange={(e) => { setRaffleId(e.target.value) }} /> <br />
              <input type="text" placeholder="Prize token Address" onChange={(e) => { setPrizeAddress(e.target.value) }} /> <br />
              <input type="text" placeholder="Prize Amount in lamports" onChange={(e) => { setPrizeAmount(e.target.value) }} /> <br />
              <input type="text" placeholder="Prize Number" onChange={(e) => { setPrizeIndex(e.target.value) }} /> <br />
              <input type="text" placeholder="Cluster" onChange={(e) => { setCluster(e.target.value) }} /> <br />
              <input type="text" placeholder="Program Id" onChange={(e) => { setProgramId(e.target.value) }} /> <br />
              <button onClick={addPrize}>Add prize to Raffle</button>
              <p style={{ color: "black" }}>{addPrizeRes}</p>
            </div>}
          <Spacer height={'20px'} />




          
          <Typography variant="h3" onClick={handleWithdraw} style={{ backgroundColor: '#227224', color: 'white', cursor: "pointer", border: "1px black solid", padding: 10, borderRadius: 10 }}>withdraw</Typography>
          <Spacer height={'20px'} />
          {showWith &&
            <div>
              <TextField label="Raffle Id" variant='outlined' onChange={(e) => { setRaffleId(e.target.value) }} /> <br />
              <TextField label="Token" variant='outlined' onChange={(e) => { setTargetTokenAccount(e.target.value) }} /> <br />
              <TextField label="Cluster" variant='outlined' onChange={(e) => { setCluster(e.target.value) }} /> <br />
              <TextField label="Program Id" variant='outlined' onChange={(e) => { setProgramId(e.target.value) }} /> <br /> <br />
              <Button variant="contained" onClick={addWithdraw}>Withdraw</Button>
              <p style={{ color: "black" }}>{addWithdraw2}</p>

              <input type="text" placeholder="Raffle Id" onChange={(e) => { setRaffleId(e.target.value) }} /> <br />
              <input type="text" placeholder="Token " onChange={(e) => { setTargetTokenAccount(e.target.value) }} /> <br />
              <input type="text" placeholder="Cluster" onChange={(e) => { setCluster(e.target.value) }} /> <br />
              <input type="text" placeholder="Program Id" onChange={(e) => { setProgramId(e.target.value) }} /> <br />
              <button onClick={addWithdraw}>Withdraw</button>
              <p style={{ color: "black" }}>{addWithdraw2}</p>
            </div>} */}

          <Spacer height={'20px'} />
          <Typography variant="h3" style={{color:'white'}}>Ongoing raffles</Typography>
          <Spacer height={'20px'} />
          <Grid container spacing={1} className={classes.raffleGrid} style={{ cursor: "pointer" ,color:'white'}}>
            {[...raffles.values()]
              .filter((raffle) => new Date() <= raffle.endTimestamp)
              .map((raffle) => (
                <Grid
                  item
                  xs={3}
                  spacing={3}
                  className={classes.raffleGridItem}
                >
                  <Card
                    className={classes.raffleCard}
                    style={{color:'white', background:'black'}}
                    onClick={() =>
                      push(`${routes.ADMIN.RAFFLES}/${raffle.publicKey}`)
                    }
                  >
                    <Typography>{raffle.metadata.name}</Typography>
                    <Typography>
                      <Typography>
                        {raffle.endTimestamp.toISOString()}
                      </Typography>
                    </Typography>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Spacer height={'50px'}  />
          <Typography variant="h3" style={{color:'white'}}>Ended raffles</Typography>
          <Spacer height={'20px'} />
          {console.log(raffles, "raffless")}
          <Grid container spacing={1} className={classes.raffleGrid} style={{ cursor: "pointer",color:'white' }}>
            {[...raffles.values()]
              .filter((raffle) => new Date() > raffle.endTimestamp)
              .map((raffle) => (
                <Grid
                  key={raffle.publicKey.toString()}
                  item
                  xs={3}
                  spacing={3}
                  className={classes.raffleGridItem}
                >
                  <Card
                    className={classes.raffleCard}
                    style={{color:'white', background:'black'}}
                    onClick={() =>
                      push(`${routes.ADMIN.RAFFLES}/${raffle.publicKey}`)
                    }
                  >
                    <Typography>{raffle.metadata.name}</Typography>
                    <Typography>{raffle.endTimestamp.toISOString()}</Typography>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </>
      ) : (
        <>
          <Typography variant="h3">
            Connect with an admin wallet to unlock admin panel
          </Typography>
          <div className={classes.walletButtonContainer}>
            <WalletButton />
          </div>
        </>
      )}
    </div>
  );
};

const AdminHomeScreenWithLayout = () => (
  <Screen>
    <AdminHomeScreen />
  </Screen>
);

export default AdminHomeScreenWithLayout;
