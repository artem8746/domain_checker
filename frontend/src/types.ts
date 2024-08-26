export interface DomainData {
  id: string;
  log_checksum: string;
  log_file_name: string;
  stealer_type: string;
  computer_information: ComputerInformation;
  credentials: Credential[];
}

export interface ComputerInformation {
  build_id: string;
  infection_date: Date;
  ip: string;
  malware_path: string;
  username: string;
  country: string;
  os: string;
  hwid: string;
}

export interface Credential {
  url: string;
  creds: Cred[];
}

export interface Cred {
  username: string;
  password: string;
}

export interface DomainInfoResponse {
  domain: string;
  newNext: string | undefined;
  domainData: DomainData[];
}

export interface ErrorDetail {
  loc: string[];
  msg: string;
  type: string;
}

export interface ErrorResponse {
  request_id: string;
  error_message: string;
  details: ErrorDetail[];
}

export interface PieChartData {
  id: number;
  value: number;
  label: string;
}

export interface LineChartData {
  minYear: number;
  maxYear: number;
  data: {
    date: number;
    [key: string]: number;
  }[];
}

export interface ExtraInfoData {
  stealerTypes: ExtraInfoCardData[];
  operationSystems: ExtraInfoCardData[];
  infectionYears: ExtraInfoCardData[];
  infectionCountries: ExtraInfoCardData[];
}

export interface ExtraInfoCardData {
  title: string;
  value: number;
}
