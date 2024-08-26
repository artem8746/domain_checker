import { Box, Typography } from "@mui/material";
import { DomainInfoResponse } from "../../types";
import { ExtraInfoCard } from "../ExtraInfoCard/ExtraInfoCard";
import { useMemo } from "react";
import { prepareExtraInfoData } from "../../services/prepareExtraInfoData";

interface ExtraInfoProps {
  domainInfo: DomainInfoResponse;
}

export function ExtraInfo({
  domainInfo
}: ExtraInfoProps) {
  const extraInfo = useMemo(() => prepareExtraInfoData(domainInfo.domainData), [domainInfo]);

  return (
    <Box
      sx={{
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: "30px",
      }}
    >
      <Typography
        variant="h2"
        sx={theme => ({
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
          [theme.breakpoints.up('md')]: {
            fontSize: "3rem",
          }
        })}
      >
        Domain: {domainInfo.domain}
      </Typography>

      <Box
        sx={theme => ({
          display: 'grid',
          gap: "30px",
          rowGap: "30px",
          gridTemplateColumns: "1fr",
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          [theme.breakpoints.up('xl')]: {
            gridTemplateColumns: "repeat(3, 1fr)",
          },
          boxSizing: "border-box",
        })}
      >
        <ExtraInfoCard
          title="Most popular stealer types"
          data={extraInfo.stealerTypes}
        />

        <ExtraInfoCard
          title="Most infected operation systems"
          data={extraInfo.operationSystems}
        />

        <ExtraInfoCard
          title="Most infected years"
          data={extraInfo.infectionYears}
        />

        <ExtraInfoCard
          title="Most infected countries"
          data={extraInfo.infectionCountries}
        />
      </Box>
    </Box>
  )
}