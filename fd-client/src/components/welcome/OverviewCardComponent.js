import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function OverviewCardComponent(props) {
  return (
    <Card sx={{ minWidth: 200, backgroundColor: '#004BA8 ' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="#FFD700 " gutterBottom>
          {props.text}
        </Typography>
        <Typography variant="h5" color="#EFEFEF" component="div">
          {props.amount} zł
        </Typography>
      </CardContent>
    </Card>
  );
}