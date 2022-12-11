import { PersistOptions } from 'zustand/middleware';

export const defaultConfigStore: Omit<PersistOptions<any>, 'name'> = {
  getStorage: () => sessionStorage,
  serialize: (state) => btoa(JSON.stringify(state)),
  deserialize: (state) => JSON.parse(atob(state)),
  version: 1,
};
