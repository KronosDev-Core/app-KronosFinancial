import { PersistOptions } from 'zustand/middleware';

export const defaultConfigStore: Omit<PersistOptions<any>, 'name'> = {
  version: 1,
};
