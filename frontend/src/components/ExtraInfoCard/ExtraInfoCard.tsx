import { Box, Typography } from "@mui/material";
import { ExtraInfoCardData } from "../../types";

interface ExtraInfoCardProps {
  data: ExtraInfoCardData[];
  title: string;
  backgroundColor?: string;
}

export function ExtraInfoCard({
  data,
  title,
  backgroundColor = "#79c4d1",
}: ExtraInfoCardProps) {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: "15px",
        backgroundColor: backgroundColor,
        padding: "20px",
      }}
    >
      <Typography
        variant="h5"
        sx={theme => ({
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          [theme.breakpoints.up('md')]: {
            fontSize: "2rem",
          }
        })}
      >
        {title}
      </Typography>

      {data.map(({ title, value }) => {
        if (!title
          || !value
          || !title.trim()
          || !value.toString().trim()) {
          return '';
        }

        return (
          <Box
            key={title}
            sx={{
              display: 'flex',
              gap: "10px",
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              justifyContent: "space-between"
            }}
          >
            <Typography
              variant="h6"
              sx={theme => ({
                fontSize: "1rem",
                [theme.breakpoints.up('md')]: {
                  fontSize: "1.5rem",
                }
              })}
            >
              {title}:
            </Typography>

            <Typography
              variant="h6"
              sx={theme => ({
                fontSize: "1rem",
                [theme.breakpoints.up('md')]: {
                  fontSize: "1.5rem",
                }
              })}
            >
              {value}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}