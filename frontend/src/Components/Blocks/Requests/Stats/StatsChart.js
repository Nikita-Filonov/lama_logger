import React from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Paper, useTheme} from "@mui/material";
import {StatsChartStyles} from "../../../../Styles/Blocks";

const data = [
  {
    name: "Page A",
    Deleted: 4000,
    Removed: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    Deleted: 4000,
    Removed: 2400,
    amt: 2210
  },
  {
    name: "Page C",
    Deleted: 4000,
    Removed: 2400,
    amt: 2290
  },
  {
    name: "Page D",
    Deleted: 4000,
    Removed: 2400,
    amt: 2000
  },
  {
    name: "Page E",
    Deleted: 4000,
    Removed: 2400,
    amt: 2181
  },
  {
    name: "Page F",
    Deleted: 4000,
    Removed: 2400,
    amt: 2500
  },
  {
    name: "Page G",
    Deleted: 4000,
    Removed: 2400,
    amt: 2100
  },
  {
    name: "Page A",
    Deleted: 4000,
    Removed: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    Deleted: 4000,
    Removed: 2400,
    amt: 2210
  },
  {
    name: "Page C",
    Deleted: 4000,
    Removed: 2400,
    amt: 2290
  },
  {
    name: "Page D",
    Deleted: 4000,
    Removed: 2400,
    amt: 2000
  },
  {
    name: "Page E",
    Deleted: 4000,
    Removed: 2400,
    amt: 2181
  },
  {
    name: "Page F",
    Deleted: 4000,
    Removed: 2400,
    amt: 2500
  },
  {
    name: "Page G",
    Deleted: 4000,
    Removed: 2400,
    amt: 2100
  },
  {
    name: "Page A",
    Deleted: 4000,
    Removed: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    Deleted: 4000,
    Removed: 2400,
    amt: 2210
  },
  {
    name: "Page C",
    Deleted: 4000,
    Removed: 2400,
    amt: 2290
  },
  {
    name: "Page D",
    Deleted: 4000,
    Removed: 2400,
    amt: 2000
  },
  {
    name: "Page E",
    Deleted: 4000,
    Removed: 2400,
    amt: 2181
  },
  {
    name: "Page F",
    Deleted: 4000,
    Removed: 2400,
    amt: 2500
  },
  {
    name: "Page G",
    Deleted: 4000,
    Removed: 2400,
    amt: 2100
  },
  {
    name: "Page A",
    Deleted: 4000,
    Removed: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    Deleted: 4000,
    Removed: 2400,
    amt: 2210
  },
  {
    name: "Page C",
    Deleted: 4000,
    Removed: 2400,
    amt: 2290
  },
  {
    name: "Page D",
    Deleted: 4000,
    Removed: 2400,
    amt: 2000
  },
  {
    name: "Page E",
    Deleted: 4000,
    Removed: 2400,
    amt: 2181
  },
  {
    name: "Page F",
    Deleted: 4000,
    Removed: 2400,
    amt: 2500
  },
  {
    name: "Page G",
    Deleted: 4000,
    Removed: 2400,
    amt: 2100
  },
  {
    name: "Page A",
    Deleted: 4000,
    Removed: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    Deleted: 4000,
    Removed: 2400,
    amt: 2210
  },
  {
    name: "Page C",
    Deleted: 4000,
    Removed: 2400,
    amt: 2290
  },
  {
    name: "Page D",
    Deleted: 4000,
    Removed: 2400,
    amt: 2000
  },
  {
    name: "Page E",
    Deleted: 4000,
    Removed: 2400,
    amt: 2181
  },
  {
    name: "Page F",
    Deleted: 4000,
    Removed: 2400,
    amt: 2500
  },
  {
    name: "Page G",
    Deleted: 4000,
    Removed: 2400,
    amt: 2100
  }
];


export const StatsChart = () => {
  const {palette} = useTheme();

  return (
    <Paper elevation={3} className={'mt-4'}>
      <ResponsiveContainer width="99%" aspect={3.5}>
        <LineChart
          width={window.innerWidth / 1.085}
          data={data}
          margin={StatsChartStyles.lineChartMargin}
          style={{
            backgroundColor: palette.mode === 'dark' ? '#3C3C3C' : '#FFFFFF',
            borderRadius: 10
          }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name" tick={{fill: palette.text.primary, fontSize: 14}}/>
          <YAxis tick={{fill: palette.text.primary, fontSize: 14}}/>
          <Tooltip contentStyle={{
            backgroundColor: palette.mode === 'dark' ? '#3C3C3C' : '#FFFFFF',
            borderColor: palette.mode === 'dark' ? '#2B2B2B' : '#BDBDBD',
            borderRadius: 3,
          }}/>
          <Legend/>
          <Line
            type="monotone"
            dataKey="Deleted"
            stroke="#8884d8"
            activeDot={{r: 8}}
          />
          <Line type="monotone" dataKey="Filtered" stroke="#82ca9d"/>
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  )
}
