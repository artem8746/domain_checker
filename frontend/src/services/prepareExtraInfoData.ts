import { DomainData } from "backend/services/types";
import { ExtraInfoData } from "../types";

export function prepareExtraInfoData(domainData: DomainData[]) {
  const extraInfo = domainData.reduce((prev, curr) => {
    if (prev.stealerTypes.findIndex(({ title }) => title === curr.stealer_type) === -1) {
      prev.stealerTypes.push({ title: curr.stealer_type, value: 0 });
    }

    if (prev.operationSystems.findIndex(({ title }) => title === curr.computer_information.os) === -1) {
      prev.operationSystems.push({ title: curr.computer_information.os, value: 0 });
    }

    if (prev.infectionYears.findIndex(
      ({ title }) =>
        title === new Date(curr.computer_information.infection_date)
          .getFullYear()
          .toString()) === -1
    ) {
      prev.infectionYears.push({
        title: new Date(curr.computer_information.infection_date)
          .getFullYear().toString(), value: 0
      });
    }

    if (prev.infectionCountries.findIndex(({ title }) => title === curr.computer_information.country) === -1) {
      prev.infectionCountries.push({ title: curr.computer_information.country, value: 0 });
    }

    prev.stealerTypes.find(({ title }) => title === curr.stealer_type)!.value++;
    prev.operationSystems.find(({ title }) => title === curr.computer_information.os)!.value++;
    prev.infectionYears.find(
      ({ title }) =>
        title === new Date(curr.computer_information.infection_date)
          .getFullYear()
          .toString()
    )!.value++;
    prev.infectionCountries.find(({ title }) => title === curr.computer_information.country)!.value++;

    return prev;
  },
    {
      stealerTypes: [],
      operationSystems: [],
      infectionYears: [],
      infectionCountries: []
    } as ExtraInfoData);

  extraInfo.stealerTypes.sort((a, b) => b.value - a.value);
  extraInfo.operationSystems.sort((a, b) => b.value - a.value);
  extraInfo.infectionYears.sort((a, b) => +a.title - +b.title);
  extraInfo.infectionCountries.sort((a, b) => b.value - a.value);

  return {
    stealerTypes: extraInfo.stealerTypes.slice(0, 5),
    operationSystems: extraInfo.operationSystems.slice(0, 5),
    infectionYears: extraInfo.infectionYears.slice(0, 5),
    infectionCountries: extraInfo.infectionCountries.slice(0, 5)
  }
}