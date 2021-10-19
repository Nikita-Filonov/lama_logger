import React, {useState} from "react";
import {Avatar, Button, Grid, InputAdornment, TextField, useTheme} from "@mui/material";
import {CopyToClipboard} from "react-copy-to-clipboard";
import IconButton from "@mui/material/IconButton";
import {ContentCopy} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import SyntaxHighlighter from "react-syntax-highlighter";
import {darcula, a11yLight} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {AVAILABLE_LANGUAGES} from "../../../../Utils/Constants";


export const ApiTokenReadyModal = ({token, onCopy}) => {
  const {palette} = useTheme();
  const [langSelected, setLangSelected] = useState('python')

  return (
    <div>
      <TextField
        value={token}
        fullWidth
        size={'small'}
        label={'Your token'}
        className={'mt-3'}
        variant={'standard'}
        helperText={'Copy your token'}
        InputProps={{
          readOnly: true,
          endAdornment: <InputAdornment position="end">
            <CopyToClipboard text={token} onCopy={onCopy}>
              <IconButton size={'small'}>
                <ContentCopy fontSize={'small'}/>
              </IconButton>
            </CopyToClipboard>
          </InputAdornment>,
        }}
      />
      <Typography variant={'body2'} color={'inherit'} className={'mt-3'}>
        Now you are ready to integrate Lama Logger in your code. Go to integration section
      </Typography>
      <Grid container spacing={2} className={'mt-3'}>
        <Grid item xs={2} justify="center">
          {AVAILABLE_LANGUAGES.map((l, index) =>
            <Button
              key={index}
              color={langSelected === l.language ? 'primary' : 'inherit'}
              fullWidth
              onClick={() => setLangSelected(l.language)}
              className={'justify-content-start'}
              startIcon={<Avatar src={l.image} sx={{width: 24, height: 24}}/>}
            >
              {l.label}
            </Button>
          )}
        </Grid>
        <Grid item xs={10}>
          <SyntaxHighlighter
            language={langSelected}
            style={palette.mode === 'dark' ? darcula : a11yLight}
            showLineNumbers
          >
            {`import LamaLogger from utils.logger\nlogger = LamaLogger(token="${token}", project_id=1)`}
          </SyntaxHighlighter>
        </Grid>
      </Grid>
    </div>
  )
}
