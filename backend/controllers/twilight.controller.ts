import { CustomError } from '../errors/CustomError';
import * as twilightService from '../services/twilight.service';
import { Request, Response } from 'express';

export const getDomainInfo = async (req: Request, res: Response) => {
  const domain = req.body.domain;
  const next = req.body.next;

  if (!domain) {
    throw CustomError.badRequest('Domain is required');
  }

  const [domainData, newNext] = await twilightService.getDomainInfo(domain, next);

  res.status(200);
  res.send({
    domain,
    domainData,
    newNext,
  });
}