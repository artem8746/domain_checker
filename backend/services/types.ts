export interface TwilightSearchResponse {
  search_id: string;
  search_consumed_credits: number;
  credits_left: number;
  next: string;
  total_items_count: number;
  items_count: number;
  data: DomainData[];
}

export interface TwilightSearchErrorReponse {
  request_id: string;
  error_message: string;
  details: ErrorDetail[];
}

export interface ErrorDetail {
  loc: string[];
  msg: string;
  type: string;
}

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
