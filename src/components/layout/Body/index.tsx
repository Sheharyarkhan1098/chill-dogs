import { Box, Container } from '@material-ui/core';
import React, { FC } from 'react';
import { useViewport } from '../../../hooks/useViewport';
import bg from "../../../assets/city_bg.jpg";

import { useStyles } from './styles';

export interface BodyProps {}

export const Body: FC<BodyProps> = ({ children }) => {
  const { device } = useViewport();
  const classes = useStyles({ device });
  return (
    <Container
      maxWidth="xl"
      style={{
        width: '95%',

        // padding: '0 10px',
        // minHeight: 700,
        display: ' flex',
        alignItems: 'center',
        // background: `url("${bg}")`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Box className={classes.root}>{children}</Box>
    </Container>
  );
};

export default Body;
