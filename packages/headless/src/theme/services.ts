import fetch from 'isomorphic-fetch';
import { PageInfo } from '../types';

export async function getPageInfo(link: string) {
  const response = await fetch(link);
  const result: PageInfo = await response.json();

  return result;
}
