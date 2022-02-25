import axios from 'axios';
import { appConfig } from '../appConfig';

export const getInit = () => axios.get(`${appConfig.apiUrl}/init`);
export const getProject = (id: string) =>
  axios.get(`${appConfig.apiUrl}/project/${id}`);
