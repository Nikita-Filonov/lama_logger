import React, {useState} from "react";
import {Container, Grid} from "@mui/material";
import {ProjectsToolbar} from "../../Components/Blocks/Projects/ProjectsToolbar";
import {AVAILABLE_LANGUAGES} from "../../Utils/Constants";
import {SdkLang} from "../../Components/Items/Integrations/SdkLang";

export const Integrations = () => {
  const [search, setSearch] = useState('');

  return (
    <Container maxWidth={'xl'}>
      <ProjectsToolbar
        title={'Integrations'}
        search={search}
        setSearch={setSearch}
      />
      <div className={'d-flex mt-3 mb-3'}>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {AVAILABLE_LANGUAGES.map((lang, index) => <SdkLang key={index} lang={lang}/>)}
        </Grid>
      </div>
    </Container>
  )
}
