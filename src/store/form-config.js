import { writable } from 'svelte/store';
import form from './test-form';
import value from './test-form-value';

function formConfigStore() {
  const { subscribe, set, update } = writable(null);
  return {
    subscribe,
    set,
    retrieve: async (module, flow) => {      
      set({form, value});
    },    
    reset: () => { set(null) }
  };
}
export const formConfig = formConfigStore();