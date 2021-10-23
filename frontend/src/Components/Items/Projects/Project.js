import React from "react";
import {Card, CardActions, CardContent, CardHeader, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import {setProject} from "../../../Redux/Projects/projectActions";
import {useHistory} from "react-router-dom";
import moment from "moment";
import {Bar} from 'react-chartjs-2';
import {common} from "../../../Styles/Blocks";
import {useProjectChartOptions} from "../../../Utils/Hooks/ChartsHooks";

const Project = ({project, setProject}) => {
  const history = useHistory();
  const {projectChartOptions} = useProjectChartOptions();

  const onOpenProject = () => {
    setProject(project);
    history.push(`/projects/${project.id}/requests`);
  };
  const onOpenSettings = () => {
    setProject(project);
    history.push(`/projects/${project.id}/settings/general`);
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardHeader
          title={<Typography variant={'subtitle2'}>{project.title}</Typography>}
          subheader={`requests: ${project.requestsCount} | members: ${project.membersCount}`}
        />
        <CardContent>
          <Bar data={project?.stats} options={projectChartOptions}/>
        </CardContent>
        <CardActions className={'d-flex'}>
          <Button onClick={onOpenProject} size="small">Open</Button>
          <Button onClick={onOpenSettings} size="small">Settings</Button>
          <div className={'flex-grow-1'}/>
          <Typography variant={'caption'} style={common.ellipsisText}>
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
