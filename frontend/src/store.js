import create from 'zustand';

const useStore = create((set) => ({
  Userdata: [],
  setUserdata: (data) => set({ Userdata: data }),
  Search: '',
  SearchValue: (input) => set({ Search: input }),
}));

export default useStore;
