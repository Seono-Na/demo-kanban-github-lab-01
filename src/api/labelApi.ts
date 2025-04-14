import { Label } from '@type/githubTypes';

import { httpClient } from './httpClient';

export const getLabels = () => {
  return httpClient.get<Label[]>('/labels');
};
