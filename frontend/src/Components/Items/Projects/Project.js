import React from "react";
import {Card, CardActions, CardContent, CardHeader, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip} from "recharts";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import {setProject} from "../../../Redux/Projects/projectActions";
import {useHistory} from "react-router-dom";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Project = ({project, setProject}) => {
  const history = useHistory();

  const onOpenProject = () => {
    setProject(project);
    history.push(`projects/${project.id}/requests`)
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardHeader
          title={<Typography variant={'subtitle2'}>{project.title}</Typography>}
          subheader={`requests: ${project.requestsCount} | members: ${project.membersCount}`}
        />
        <CardContent>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Bar dataKey="pv" stackId="a" fill="#8884d8"/>
              <Bar dataKey="uv" stackId="a" fill="#82ca9d"/>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        <CardActions>
          <Button onClick={onOpenProject} size="small">Open</Button>
          <Button size="small">Settings</Button>
          <div className={'flex-grow-1'}/>
          <Typography variant={'caption'}>Updated 2 min ago</Typography>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default connect(
  null,
  {
    setProject
  },
)(Project);
