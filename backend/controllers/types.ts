export interface DomainStatisticalData {
  total_infected: number;
  stealer_types: {
    [key: string]: {
      os: {
        [key: string]: number;
      };
      country: {
        [key: string]: number;
      };
    };
  };
}