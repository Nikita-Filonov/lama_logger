import React from "react";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Paper, useTheme} from "@mui/material";
import {StatsChartStyles} from "../../../../Styles/Blocks";
import {useRequestsStats} from "../../../../Providers/Requests/RequestsStatsProvider";
import {Spinner} from "../../Common/Spinner";

export const StatsChart = () => {
  const {palette} = useTheme();
  const {load, requestsStats} = useRequestsStats();

  return (
    <Paper elevation={3} className={'mt-4'}>
      <ResponsiveContainer width="99%" aspect={3.5}>
        {load
          ? <Spinner/>
          : <BarChart
            width={window.innerWidth / 1.085}
            data={requestsStats?.data}
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
            <Bar dataKey="Create" stackId="Create" fill="#8884d8"/>
            <Bar dataKey="Delete" stackId="Create" fill="#82ca9d"/>
            <Bar dataKey="Filter" stackId="Create" fill="#FFEB67"/>
          </BarChart>
        }
      </ResponsiveContainer>
    </Paper>
  )
}
