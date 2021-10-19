import React, {useState} from "react";
import {Container} from "@mui/material";
import {ProjectsToolbar} from "../../Components/Blocks/Projects/ProjectsToolbar";

export const Integrations = () => {
  const [search, setSearch] = useState('');

  return (
    <Container maxWidth={'xl'}>
      <ProjectsToolbar
        title={'Integrations'}
        search={search}
        setSearch={setSearch}
      />
    </Container>
  )
}
