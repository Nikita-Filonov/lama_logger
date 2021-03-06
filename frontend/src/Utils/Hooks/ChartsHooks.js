import React from "react";
import {useTheme} from "@mui/material";

export const useBarChartOptions = () => {
  const {palette} = useTheme();

  const barChartOptions = {
    animation: false,
    layout: {
      padding: {
        right: 10,
        left: 10
      }
    },
    scales: {
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true,
          color: palette.text.primary,
        }
      },
      x: {
        stacked: true,
        ticks: {
          color: palette.text.primary,
          maxRotation: 0,
          minRotation: 0,
          autoSkipPadding: 10,
          // labelOffset: 35
        }
      },
    },
    plugins: {  // 'legend' now within object 'plugins {}'
      legend: {
        labels: {
          color: palette.text.primary,  // not 'fontColor:' anymore
          usePointStyle: true,
          boxWidth: 7,
        },
      },
      tooltip: {
        callbacks: {
          title: (context) => context[0]?.label
        }
      }
    },
  };

  return {barChartOptions};
};

export const useLineChartOptions = () => {
  const {palette} = useTheme();

  const lineChartOptions = {
    animation: false,
    layout: {
      padding: {
        right: 10,
        left: 10
      }
    },
    scales: {
      y: {
        stacked: false,
        ticks: {
          beginAtZero: true,
          color: palette.text.primary,
        }
      },
      x: {
        stacked: false,
        ticks: {
          color: palette.text.primary,
          maxRotation: 0,
          minRotation: 0,
          autoSkipPadding: 10,
          // labelOffset: 35
        }
      },
    },
    plugins: {  // 'legend' now within object 'plugins {}'
      legend: {
        labels: {
          color: palette.text.primary,  // not 'fontColor:' anymore
          usePointStyle: true,
          boxWidth: 7,
        },
      },
      tooltip: {
        callbacks: {
          title: (context) => context[0]?.label
        }
      }
    },
  };

  return {lineChartOptions};
}


export const useProjectChartOptions = () => {
  const {palette} = useTheme();

  const projectChartOptions = {
    animation: false,
    scales: {
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true,
          color: palette.text.primary,
        }
      },
      x: {
        stacked: true,
        ticks: {
          color: palette.text.primary,
          maxRotation: 0,
          minRotation: 0,
          autoSkipPadding: 10,
        }
      },
    },
    plugins: {  // 'legend' now within object 'plugins {}'
      legend: {
        display: false,
        labels: {
          color: palette.text.primary,  // not 'fontColor:' anymore
          usePointStyle: true,
          boxWidth: 7,
        },
      },
      tooltip: {
        callbacks: {
          title: (context) => context[0]?.label
        }
      }
    },
  };

  return {projectChartOptions};
}
