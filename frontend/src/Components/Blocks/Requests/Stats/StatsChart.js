import React, {useState} from "react";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {Button, Menu, Paper, Typography, useTheme} from "@mui/material";
import {StatsChartStyles} from "../../../../Styles/Blocks";
import {useRequestsStats} from "../../../../Providers/Requests/RequestsStatsProvider";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Spinner} from "../../Common/Spinner";

export const StatsChart = ({groupBy, setGroupBy}) => {
  const {palette} = useTheme();
  const {load, requestsStats} = useRequestsStats();
  const [groupByMenu, setGroupByMenu] = useState(null);

  const onOpenGroupMenu = (event) => setGroupByMenu(event.currentTarget);
  const onCloseGroupMenu = () => setGroupByMenu(null);
  const onSelectGroupType = (type) => {
    setGroupBy(type);
    onCloseGroupMenu();
  }


  return (
    <Paper elevation={3} className={'mt-4'}>
      <Typography variant={'subtitle1'} className={'ms-2'}>General stats</Typography>
      {load
        ? <Spinner top={'60%'}/>
        : <BarChart
          width={window.innerWidth / 2.2}
          height={window.innerHeight / 2.6}
          data={requestsStats?.data}
          margin={StatsChartStyles.lineChartMargin}
          style={{
            backgroundColor: palette.mode === 'dark' ? '#3C3C3C' : '#FFFFFF',
            borderRadius: 10
          }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name" tick={{fill: palette.text.primary, fontSize: 14}}/>
          <YAxis tick={{fill: palette.text.primary, fontSize: 14}} width={35}/>
          <Tooltip
            contentStyle={{
              backgroundColor: palette.mode === 'dark' ? '#3C3C3C' : '#FFFFFF',
              borderColor: palette.mode === 'dark' ? '#2B2B2B' : '#BDBDBD',
              borderRadius: 3,
            }}
            cursor={false}
          />
          <Legend height={5}/>
          <Bar dataKey="Create" stackId="Create" fill="#8884d8"/>
          <Bar dataKey="Delete" stackId="Create" fill="#82ca9d"/>
          <Bar dataKey="Filter" stackId="Create" fill="#FFEB67"/>
        </BarChart>
      }
      {!load && <div className={'d-flex'}>
        <div className={'flex-grow-1'}/>
        <Button
          disabled={load}
          sx={{mr: 1, mb: 1}}
          onClick={onOpenGroupMenu}
          color={'inherit'}
          endIcon={<KeyboardArrowDownIcon/>}
        >
          Group: {groupBy}
        </Button>
        <Menu
          anchorEl={groupByMenu}
          open={Boolean(groupByMenu)}
          onClose={onCloseGroupMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <MenuItem onClick={() => onSelectGroupType('hours')}>By hours</MenuItem>
          <MenuItem onClick={() => onSelectGroupType('days')}>By days</MenuItem>
        </Menu>
      </div>}
    </Paper>
  )
}

