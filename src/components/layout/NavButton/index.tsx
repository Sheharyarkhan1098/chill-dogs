import React, { FC } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { useHistory } from 'react-router';
import { ButtonGroup, Stack } from '@mui/material';
import { useStyles } from './styles';
import { routes } from '../../../router/routes';

export interface NavButtonProps extends ButtonProps {
  label: string;
   target: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: 'medium' | 'large' | 'small' | undefined;
  isCurrent?: boolean;
}

const NavButton: FC<NavButtonProps> = ({
  label,
  target,
   onClick,
   size,
  isCurrent = false,
   className,
  ...otherProps
}) => {
  const classes = useStyles({ isCurrent });
  const { push } = useHistory();

  return (
    <>
      <Stack justifyContent="center" >
        <ButtonGroup>
          <Button 
            onClick={(event) => {
              if(label === "Auction"){
                return
              }
              push(target);
              if (onClick) onClick(event);
            }}
            variant="text"
            disabled={target === routes.AUCTIONS}

            disableRipple
            size={size}
            className={`${classes.navButtons}`}
            {...otherProps}
          >
            {label}
          </Button>
        </ButtonGroup>
      </Stack>


    </>
  );
};

export default NavButton;
