import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
    return (
        <Box sx={{width: 400}} spacing={1}>
            <Skeleton/>
            <Skeleton animation="wave"/>
            <Skeleton variant="rounded" width={350} height={70} animation="wave"/>
            <Skeleton animation={false}/>
        </Box>
    );
}