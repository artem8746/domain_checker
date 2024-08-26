import { DomainInfoResponse, PieChartData } from "../types";

export function preparePieChartData({ domainData }: DomainInfoResponse) {
  return domainData.reduce((prev, curr) => {
    if (prev.some(item => item.label === curr.stealer_type)) {
      return prev.map(item => {
        if (item.label === curr.stealer_type) {
          return {
            ...item,
            value: item.value + 1
          };
        }

        return item;
      });
    }

    prev.push({ label: curr.stealer_type, value: 1, id: prev.length + 1 });

    return prev;
  }, [] as PieChartData[]);
}