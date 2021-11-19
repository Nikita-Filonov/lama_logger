import React, {useMemo} from "react";
import {Container, Divider, IconButton, Tooltip, Typography, useTheme} from "@mui/material";
import {useParams} from "react-router-dom";
import {AVAILABLE_LANGUAGES} from "../../Utils/Constants";
import {a11yLight, darcula} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import SyntaxHighlighter from "react-syntax-highlighter";
import {GitHub} from "@mui/icons-material";

export const ViewSdkIntegration = () => {
  const {language} = useParams();
  const {palette} = useTheme();

  const selectedLang = useMemo(
    () => AVAILABLE_LANGUAGES.find(l => l.language === language),
    [language]
  )
  const onGitHub = () => window.open(selectedLang?.github, '_blank');

  return (
    <Container maxWidth={'md'}>
      <div className={'mt-5 mb-5'}>
        <div className={'d-flex align-items-center'}>
          <Typography variant={'h5'}>
            {selectedLang.label}
            <img className={'ms-2'} src={selectedLang.image} style={{width: 30, height: 30}}/>
          </Typography>
          <div className={'flex-grow-1'}/>
          <Tooltip title={'View on GitHub'} arrow placement={'left'}>
            <IconButton onClick={onGitHub}>
              <GitHub/>
            </IconButton>
          </Tooltip>
        </div>
        <Divider sx={{mt: 1, mb: 1}}/>
        <Typography className={'mt-3'}>
          First of all we have to define sdk to send logs to LamaLogger. So some where in your
          utils/settings/integrations folder create logger.py and past following code:
        </Typography>
        <div className={'mt-3'}>
          <SyntaxHighlighter
            language={language}
            style={palette.mode === 'dark' ? darcula : a11yLight}
            showLineNumbers
          >
            {selectedLang?.template?.sdk}
          </SyntaxHighlighter>
        </div>
        <Typography>
          Some where in your project root initialize logger
        </Typography>
        <div className={'mt-3'}>
          <SyntaxHighlighter
            language={language}
            style={palette.mode === 'dark' ? darcula : a11yLight}
            showLineNumbers
          >
            {selectedLang?.template?.logger}
          </SyntaxHighlighter>
        </div>
        <Typography>
          And finally you can define api methods that you need. And also do not
          forget about allure template, because we want to see our logs in allure too.
          For example api methods might look like:
        </Typography>
        <div className={'mt-3'}>
          <SyntaxHighlighter
            language={language}
            style={palette.mode === 'dark' ? darcula : a11yLight}
            showLineNumbers
          >
            {selectedLang?.template?.methods}
          </SyntaxHighlighter>
        </div>
        <Typography>
          That's all, now your logs will appear in your project
        </Typography>
      </div>
    </Container>
  )
}
