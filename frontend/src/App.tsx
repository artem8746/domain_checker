import { Box, CircularProgress } from "@mui/material"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { DomainInfoResponse } from "./types";
import { Header } from "./components/Header/Header.tsx";
import { ChartsData } from "./components/ChartsData/ChartsData.tsx";
import { ExtraInfo } from "./components/ExtraInfo/ExtraInfo.tsx";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;



function App() {
  const [domain, setDomain] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [domainData, setDomainData] = useState<DomainInfoResponse>();

  const handleSearch = async () => {
    if (loading
      || !domain
      || (domainData?.domain === domain && !domainData?.newNext)) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response: AxiosResponse<DomainInfoResponse> = await axios.post(`${BASE_API_URL}/twilight/search`, {
        domain: domain,
        next: domainData?.newNext,
      });

      setLoading(false);

      if (response.data.domain !== domain) {
        setDomainData(response.data);

        return;
      }

      const newDomainData = {
        domain: response.data.domain,
        newNext: response.data.newNext,
        domainData: [
          ...domainData?.domainData || [],
          ...response.data.domainData,
        ],
      };

      setDomainData(newDomainData);
    } catch (ex) {
      console.log(ex, 'error');

      setDomainData(undefined);
      setError((ex as AxiosError).response?.data as string || 'An error occurred');
      setLoading(false);

      return;
    }
  }

  return (
    <Box
      sx={theme => ({
        display: 'flex',
        flexDirection: 'column',
        marginInline: "auto",
        gap: "20px",
        width: "100%",
        paddingInline: "10%",
        paddingTop: "50px",
        alignItems: "center",
        boxSizing: 'border-box',
        maxWidth: "1920px",
        [theme.breakpoints.up('xl')]: {
          paddingInline: "200px",
        },
      })}
    >

      <Header
        domain={domain}
        isFetchNext={!!domainData?.newNext && domain === domainData.domain}
        onDomainChange={setDomain}
        onSearch={handleSearch}
        error={error}
        isSearchDisabled={
          loading
          || domain === ""
          || domainData?.domain === domain
        }
      />

      {loading && (<CircularProgress />)}

      {!loading
        && domainData
        && (
          <>
            <ChartsData
              domainData={domainData}
              marginBotom={5}
            />

            <ExtraInfo
              domainInfo={domainData}
            />
          </>
        )}
    </Box>
  )
}

export default App 
