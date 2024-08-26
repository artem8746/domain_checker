import { Box, Button, TextField, Typography } from "@mui/material";

interface HeaderProps {
  domain: string;
  error?: string;
  onSearch: () => void;
  onDomainChange: (domain: string) => void;
  isSearchDisabled: boolean;
  isFetchNext?: boolean;
}

export function Header({
  domain,
  error,
  isSearchDisabled,
  onSearch,
  onDomainChange,
  isFetchNext,
}: HeaderProps) {
  return (
    <>
      <Typography
        variant="h1"
        sx={theme => ({
          fontSize: "3rem",
          fontWeight: "bold",
          textAlign: "center",
          [theme.breakpoints.up('md')]: {
            fontSize: "4rem",
          }
        })}
      >
        Domain Checker
      </Typography>

      <Box
        sx={theme => ({
          display: 'flex',
          flexDirection: 'column',
          gap: "20px",
          width: "100%",
          marginBottom: "40px",
          alignItems: "center",
          [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'flex-start',
          }
        })}
      >
        <TextField
          fullWidth
          placeholder="Enter domain"
          variant="outlined"
          value={domain}
          onChange={e => onDomainChange(e.target.value)}
          error={!!error}
          helperText={error}
          onKeyDown={e => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
        />

        <Button
          disabled={isSearchDisabled && !isFetchNext}
          onClick={onSearch}
          variant="contained"
          sx={theme => ({
            width: "50%",
            [theme.breakpoints.up('md')]: {
              width: '150px',
              height: '55px',
            },
            [theme.breakpoints.up('sm')]: {
              height: '45px',
            },
          })}
        >
          {isFetchNext ? 'Fetch more data' : 'Search'}
        </Button>
      </Box>
    </>
  )
}