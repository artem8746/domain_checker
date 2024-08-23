import { CustomError } from '../errors/CustomError';
import * as twilightService from '../services/twilight.service';
import { DomainStatisticalData } from './types';
import { Request, Response } from 'express';

export const getDomainInfo = async (req: Request, res: Response) => {
  const domain = req.body.domain;

  const domainData = await twilightService.getDomainInfo(domain);

  const data = domainData.reduce((prev, curr) => {
    // If the stealer type is not in the object, add it
    if (!prev.stealer_types[curr.stealer_type]) {
      prev.stealer_types[curr.stealer_type] = {
        os: {},
        country: {},
      };
    }

    // If the os or country is not in the object, add it
    if (!prev.stealer_types[curr.stealer_type].os[curr.computer_information.os]) {
      prev.stealer_types[curr.stealer_type].os[curr.computer_information.os] = 0;
    }

    // If the os or country is not in the object, add it
    if (!prev.stealer_types[curr.stealer_type].country[curr.computer_information.country]) {
      prev.stealer_types[curr.stealer_type].country[curr.computer_information.country] = 0;
    }

    // Increment the os and country count
    prev.stealer_types[curr.stealer_type].os[curr.computer_information.os]++;
    prev.stealer_types[curr.stealer_type].country[curr.computer_information.country]++;

    return prev;
  }, { total_infected: domainData.length } as DomainStatisticalData);

  res.status(200);
  res.send(data);
}