import React, {useEffect} from "react";
import {useRequests} from "../../Providers/RequestsProvider";
import {connect} from "react-redux";
import {useUsers} from "../../Providers/UsersProvider";

const Requests = ({project, requests}) => {
  const {token} = useUsers()
  const {getRequests} = useRequests()

  useEffect(() => {
    (async () => {
      (project.id && token) && await getRequests(project.id)
    })()
  }, [project.id, token])

  return (
    <div>
      asdasdasdas
    </div>
  )
}


const getState = (state) => ({
  project: state.projects.project,
  requests: state.requests.requests
})

export default connect(
  getState,
  null,
)(Requests);
