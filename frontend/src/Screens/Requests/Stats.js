import React from "react";
import {Container, Grid, Paper, Typography} from "@mui/material";
import clsx from "clsx";
import {ViewRequestStyles} from "../../Styles/Blocks";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export const Stats = () => {
  const classes = ViewRequestStyles();


  return (
    <Container maxWidth={'xl'}>
      <Paper
        elevation={3}
        className={clsx('mt-3 d-flex', classes.toolbarContainer)}
      >
      </Paper>

      <Grid container spacing={2} className={'mt-3'}>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.toolbarContainer}>
            <Typography>Total requests</Typography>
            <Typography className={'mt-2'} variant={'h5'}>5678</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.toolbarContainer}>
            <Typography>Removed</Typography>
            <Typography className={'mt-2'} variant={'h5'}>5678</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} className={classes.toolbarContainer}>
            <Typography>Filtered</Typography>
            <Typography className={'mt-2'} variant={'h5'}>5678</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} className={'mt-4'}>
        <ResponsiveContainer width="99%" aspect={3}>
          <LineChart
            width={window.innerWidth / 1.085}
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10
            }}
            style={{backgroundColor: '#3C3C3C', borderRadius: 10}}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip contentStyle={{backgroundColor: '#3C3C3C', borderRadius: 3, borderColor: '#2B2B2B'}}/>
            <Legend/>
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{r: 8}}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d"/>
          </LineChart>
        </ResponsiveContainer>
      </Paper>

    </Container>
  )
}
