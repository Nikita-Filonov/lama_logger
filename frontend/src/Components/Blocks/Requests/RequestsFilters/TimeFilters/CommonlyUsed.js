import React from "react";
import {ButtonGroup, Typography} from "@mui/material";
import Button from "@mui/material/Button";

export const CommonlyUsed = ({onSelectCommonRange, onSelectCommonLast}) => {
  return (
    <div>
      <Typography variant={'subtitle1'} className={'mt-3'}>Commonly used</Typography>
      <ButtonGroup variant="text" size={'small'} orientation={'vertical'}>
        <Button
          className={'justify-content-start'}
          onClick={() => onSelectCommonRange('day')}
        >
          Today
        </Button>
        <Button
          className={'justify-content-start'}
          onClick={() => onSelectCommonRange('week')}
        >
          This week
        </Button>
        <Button
          className={'justify-content-start'}
          onClick={() => onSelectCommonLast(15, 'minutes')}
        >
          Last 15 minutes
        </Button>
        <Button
          className={'justify-content-start'}
          onClick={() => onSelectCommonLast(30, 'minutes')}
        >
          Last 30 minutes
        </Button>
        <Button
          className={'justify-content-start'}
          onClick={() => onSelectCommonLast(1, 'hours')}
        >
          Last 1 hour
        </Button>
      </ButtonGroup>
      <ButtonGroup variant="text" size={'small'} orientation={'vertical'} className={'ms-5'}>
        <Button
          className={'justify-content-start'}
          onClick={() => onSelectCommonLast(24, 'hours')}
        >
          Last 24 hours
        </Button>
        <Button
          className={'justify-content-start'}
          onClick={() => onSelectCommonLast(7, 'days')}
        >
          Last 7 days
        </Button>
        <Button
          className={'justify-content-start'}
          onClick={() => onSelectCommonLast(14, 'days')}
        >
          Last 14 days
        </Button>
        <Button
          className={'justify-content-start'}
          onClick={() => onSelectCommonLast(30, 'days')}
        >
          Last 30 days
        </Button>
        <Button
          className={'justify-content-start'}
          onClick={() => onSelectCommonLast(5, 'minutes')}
        >
          Last 5 minutes
        </Button>
      </ButtonGroup>
    </div>
  )
}
