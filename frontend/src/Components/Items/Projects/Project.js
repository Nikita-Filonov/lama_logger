import React from "react";
import {Card, CardActions, CardContent, CardHeader, Grid, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import {setProject} from "../../../Redux/Projects/projectActions";
import {useHistory} from "react-router-dom";
import moment from "moment";

const Project = ({project, setProject}) => {
  const history = useHistory();
  const {palette} = useTheme();

  const onOpenProject = () => {
    setProject(project);
    history.push(`projects/${project.id}/requests`);
  };
  const onOpenSettings = () => {
    setProject(project);
    history.push(`projects/${project.id}/settings/general`);
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardHeader
          title={<Typography variant={'subtitle2'}>{project.title}</Typography>}
          subheader={`requests: ${project.requestsCount} | members: ${project.membersCount}`}
        />
        <CardContent>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={project.stats}>
              <CartesianGrid strokeDasharray="3 3"/>
              {project?.stats?.length > 0 && <YAxis tick={{fill: palette.text.primary, fontSize: 10}} width={15}/>}
              {project?.stats?.length > 0 &&
              <XAxis height={10} dataKey="name" tick={{fill: palette.text.primary, fontSize: 10}}/>}
              <Tooltip
                contentStyle={{
                  backgroundColor: palette.mode === 'dark' ? '#3C3C3C' : '#FFFFFF',
                  borderColor: palette.mode === 'dark' ? '#2B2B2B' : '#BDBDBD',
                  borderRadius: 3,
                }}
                cursor={false}
              />
              <Bar dataKey="Created" fill="#8884d8"/>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
        <CardActions>
          <Button onClick={onOpenProject} size="small">Open</Button>
          <Button onClick={onOpenSettings} size="small">Settings</Button>
          <div className={'flex-grow-1'}/>
          <Typography variant={'caption'}>
            Updated {moment.utc(project.lastUpdated).local().startOf('seconds').fromNow()}
          </Typography>
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
