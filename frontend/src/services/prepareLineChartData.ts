import { DomainData } from "backend/services/types";
import { DomainInfoResponse, LineChartData } from "../types";

function countInfectedMachinesByStealerAndYear(domainData: DomainData[], date: number, stealer: string) {
  if (date % 1 === 0) {
    return domainData.reduce((prev, curr) => {
      if (new Date(curr.computer_information.infection_date).getFullYear() === date && curr.stealer_type === stealer) {
        return prev + 1;
      }

      return prev;
    }, 0);
  }

  return domainData.reduce((prev, curr) => {
    const yearAndMonth = new Date(curr.computer_information.infection_date).getFullYear()
      + new Date(curr.computer_information.infection_date).getMonth() / 10;

    if (yearAndMonth === date && curr.stealer_type === stealer) {
      return prev + 1;
    }

    return prev;
  }, 0);
}

export function prepareLineChartData({ domainData }: DomainInfoResponse): LineChartData {
  const years = domainData.map(item => new Date(item.computer_information.infection_date).getFullYear());

  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const withMonths = maxYear - minYear <= 1;

  return domainData.reduce((prev, curr) => {

    const date = new Date(curr.computer_information.infection_date).getFullYear()
      + ((withMonths ? new Date(curr.computer_information.infection_date).getMonth() : 0) / 10);

    const itemIndex = prev.data.findIndex(item => item.date === date);

    if (itemIndex === -1) {
      return {
        ...prev,
        data: [
          ...prev.data, {
            date,
            [curr.stealer_type]: countInfectedMachinesByStealerAndYear(
              domainData,
              date,
              curr.stealer_type
            ),
          }
        ]
      };
    }

    const item = prev.data[itemIndex];

    if (!item.stealer_type) {
      const newData = prev.data.map((item, index) => {
        if (index === itemIndex) {
          return {
            ...item,
            [curr.stealer_type]: countInfectedMachinesByStealerAndYear(
              domainData,
              item.date,
              curr.stealer_type
            ),
          };
        }

        return item;
      });;

      return {
        ...prev,
        data: [...newData]
      };
    }

    return prev;
  }, { minYear, maxYear, data: [] } as LineChartData);
} 