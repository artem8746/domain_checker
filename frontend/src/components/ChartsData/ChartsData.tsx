import { Box } from "@mui/material";
import { LineChart, PieChart } from "@mui/x-charts";
import { useMemo, useRef } from "react";
import { preparePieChartData } from "../../services/preparePieChartData";
import { prepareLineChartData } from "../../services/prepareLineChartData";
import { DomainInfoResponse, LineChartData, PieChartData } from "../../types";
import useResize from "../../hooks/useResize";
import { breakpoints } from "../../constants/UIBreakpoints";

const lineChartSettings = {
  height: 300,
  legend: { hidden: true },
  margin: { top: 5 },
  stackingOrder: 'descending',
} as const;

const stackStrategy = {
  stack: 'total',
  stackOffset: 'none', // To stack 0 on top of others
} as const;

interface ChartsDataProps {
  domainData: DomainInfoResponse;
  marginBotom?: number;
}

export function ChartsData({
  domainData,
  marginBotom
}: ChartsDataProps) {
  const [pieChartData, lineChartData] = useMemo<[PieChartData[], LineChartData]>(() => {
    if (!domainData) {
      return [[], {} as LineChartData];
    }

    return [
      preparePieChartData(domainData),
      prepareLineChartData(domainData)
    ];
  }, [domainData]);

  const [width] = useResize();

  const continerRef = useRef<HTMLDivElement>(null);

  const pieChartHeight = width > breakpoints.sm ? 250 : 270 + (Math.ceil(pieChartData.length / 2)) * 30;
  /*
    270px - base height
    30px - height of each row
    Math.ceil(pieChartData.length / 2 ) - number of rows (divided by 2 because we have 2 columns)
  */

  const xAxisSettings = lineChartData.maxYear - lineChartData.minYear > 1
    ? {
      min: Math.min(...lineChartData.data.map(item => item.date)),
      max: Math.max(...lineChartData.data.map(item => item.date)),
    }
    : {
      data: [
        ...Array.from(Array(12).keys())
          .map(monthNumber => lineChartData.minYear + (monthNumber + 1) / 10),
        ...Array.from(Array(12).keys())
          .map(monthNumber => lineChartData.minYear + (monthNumber + 1) / 10),
      ],
    }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        marginBottom: marginBotom,
      }}
    >
      <Box
        ref={continerRef}
        sx={theme => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          backgroundColor: '#d3d6db',
          borderRadius: '10px',
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            alignItems: 'flex-start',
          },
        })}
      >
        <PieChart
          series={[{
            data: pieChartData,
            cy: '130px',
            cx: '125px'
          }]}
          width={width > breakpoints.sm ? continerRef.current?.clientWidth : 250}
          height={pieChartHeight}
          margin={{ right: 0, top: 0 }}
          slotProps={width < breakpoints.sm
            ? {
              legend: {
                labelStyle: {
                  tableLayout: 'fixed',
                },
                direction: 'row',
                position: {
                  horizontal: 'middle',
                  vertical: 'bottom',
                },

              },
            }
            : undefined
          }
        />

        <LineChart
          xAxis={[
            {
              dataKey: 'date',
              valueFormatter: (value) => value.toString(),
              ...xAxisSettings,
            },
          ]}
          series={pieChartData.map((item) => ({
            dataKey: item.label,
            label: item.label,
            showMark: false,
            ...stackStrategy,
          }))}
          dataset={lineChartData.data}
          {...lineChartSettings}
        />
      </Box>
    </Box>
  )
}