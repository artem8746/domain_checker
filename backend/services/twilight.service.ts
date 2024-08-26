import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import { DomainData, TwilightSearchErrorReponse, TwilightSearchResponse } from './types';
import { CustomError } from '../errors/CustomError';

dotenv.config();

const TWILIGHT_BASE_URL = process.env.TWILIGHT_BASE_URL || '';
const TWILIGHT_API_KEY = process.env.TWILIGHT_API_KEY || '';

export const getDomainInfo = async (domain: string, prevNext: string | undefined): Promise<[DomainData[], string | undefined]> => {
  const domainData = [] as DomainData[];
  const normalizedDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
  let next = prevNext;

  if (!normalizedDomain) {
    throw CustomError.badRequest('Invalid domain');
  }

  for (let i = 0; i < 3; i++) {
    const response: AxiosResponse<TwilightSearchResponse | TwilightSearchErrorReponse> = await axios.post<TwilightSearchResponse | TwilightSearchErrorReponse>(
      `${TWILIGHT_BASE_URL}/infections/_search`,
      {
        domains: [normalizedDomain],
        next,
      },
      {
        headers: {
          'Authorization': `Bearer ${TWILIGHT_API_KEY}`,
        }
      }
    )

    const { data } = response;

    if (response.status !== 200) {
      throw new CustomError(
        (data as TwilightSearchErrorReponse).details[0].msg,
        response.status
      );
    }

    if ((data as TwilightSearchResponse).data) {
      domainData.push(...(data as TwilightSearchResponse).data);
    }

    if (!(data as TwilightSearchResponse).next) {
      break;
    }

    next = (data as TwilightSearchResponse).next;
  }

  return [domainData, next];
};