import { Store } from '@tanstack/react-store';

export interface FilterConfig {
  field: string;
  compareFn: (item: any, value: string) => boolean;
}

interface FilterState {
  filters: Record<string, string>;
  filterConfig: Record<string, (item: any, value: string) => boolean>;
}

const initialStore: FilterState = {
  filters: {},
  filterConfig: {}
};

export const filterStore = new Store<FilterState>(initialStore);

export const filterActions = {
  setFilter: (field: string, value: string) => {
    filterStore.setState(state => ({
      ...state,
      filters: { ...state.filters, [field]: value }
    }));
  },
  
  registerFilter: (field: string, compareFn: (item: any, value: string) => boolean) => {
    filterStore.setState(state => ({
      ...state,
      filterConfig: { ...state.filterConfig, [field]: compareFn }
    }));
  },
  clearFilters: () => {
    filterStore.setState(state => ({ ...state, filters: {} }));
  },
  
  applyFilters: (data: any[]) => {
    const state = filterStore.state;
    return data.filter(item =>
      Object.entries(state.filters).every(([field, value]) => {
        const fn = state.filterConfig[field];
        return !value || (fn && fn(item, value));
      })
    );
  }
};
