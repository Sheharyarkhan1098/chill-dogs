import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Typography,Stack
} from '@mui/material';
import { FC, useState } from 'react';
import CountUp from 'react-countup';
import { MdOutlineMilitaryTech } from "react-icons/md";
import { getDisplayAmount } from '../../lib/accounts';
import { Raffle } from '../../lib/types';
import useCommonStyles from '../../assets/styles';
import { useStyles } from './styles';
import { useViewport } from '../../hooks/useViewport';
import { ConfirmationNumberOutlined } from '@material-ui/icons';

type UserTicketsDialogProps = DialogProps & {
  setOpen: (isOpen: boolean) => void;
  userTickets?: number[];
};

const UserTicketsDialog: FC<UserTicketsDialogProps> = ({
  setOpen,
  userTickets,
  ...props
}) => {
  return (
    <Dialog {...props} onClose={() => setOpen(false)} fullWidth={true}>
      <DialogTitle>My tickets</DialogTitle>
      <DialogContent>
        {userTickets?.map((userTicket) => (
          <div key={userTicket}>#{userTicket + 1}</div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

interface RaffleInfoSectionProps {
  raffle: Raffle;
  userConnected: boolean;
  userTickets?: number[];
}

const RaffleInfoSection: FC<RaffleInfoSectionProps> = ({
  userConnected,
  raffle,
  userTickets,
}) => {
  const { device } = useViewport();
  const classes = { ...useCommonStyles(), ...(useStyles({ device }) as any) };
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.ticketsSection}>
        <div className={classes.totalTickets}>
          <Stack style={{flexDirection:'row',fontFamily:'Poppins'}} >
    
            <ConfirmationNumberOutlined style={{ marginRight:'10px',color: "#81d4f2 ",marginTop:'5px' }} /> 
            <span  style={{color:'#81d4f2',fontFamily:'Poppins'}}>
              {raffle.totalTickets} sold
              </span>
            

          </Stack>

          {/* <div className={classes.value}>
            <CountUp
              start={0}
              end={raffle.totalTickets}
              delay={0}
              duration={0.8}
              preserveValue
              useEasing
            >
              {({ countUpRef }) => <Typography variant="h4" ref={countUpRef} />}
            </CountUp>
            <Typography variant="h4" className={classes.separator}>
              /
            </Typography>
            <Typography variant="h4">{`${raffle.entrantsCap}`}</Typography>
          </div> */}
        </div>
        <div className={classes.ticketPrice} >
          <Stack  style={{flexDirection:'row'}}>
        <MdOutlineMilitaryTech size="24" style={{marginRight:'1px',color: "#81d4f2",marginTop:'5px' }} />
        <span  style={{color:'#81d4f2',fontFamily:'Poppins'}}>{raffle.prizes.length} winner{raffle.prizes.length > 1 && 's'}</span>
        </Stack></div>
      </div>
      {userConnected && (
        <div className={classes.ticketsSection}>
          {/* <div className={classes.myTickets}>
          <Button
                variant="text"
                size="small"
                disableRipple
                onClick={() => {
                  setOpen(true);
                }}
                className={classes.ticketButton}
              >
            <Typography variant="overline" className={classes.label}>
              My tickets
            </Typography>
            </Button>
            <div className={classes.value}>
              <CountUp
                start={0}
                end={userTickets?.length ?? 0}
                delay={0}
                duration={0.8}
                preserveValue
                useEasing
              >
                {({ countUpRef }) => (
                  <Typography variant="h4" ref={countUpRef} />
                )}
              </CountUp>
            </div>
          </div> */}
          {userTickets?.length && (
            <div className={classes.showMyTickets}>
              <Button
                variant="text"
                size="small"
                disableRipple
                onClick={() => {
                  setOpen(true);
                }}
                className={classes.ticketButton}
              >
                My Tickets
              </Button>
              <UserTicketsDialog
                userTickets={userTickets}
                open={open}
                setOpen={setOpen}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RaffleInfoSection;
