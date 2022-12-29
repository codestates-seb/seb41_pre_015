import create from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
  Userdata: [],
  Axios: async (url) => {
    const response = await axios.get(url);
    set({ Userdata: await response.data });
  },
  Search: '',
  SearchValue: (input) => set({ Search: input }),
}));

export default useStore;
