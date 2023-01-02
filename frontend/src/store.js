import create from 'zustand';

const useStore = create((set) => ({
  Userdata: {
    id: localStorage.getItem('UserId'),
    email: localStorage.getItem('Useremail'),
  },
  setUserdata: (data) => set({ Userdata: data }),
  Search: '',
  SearchValue: (input) => set({ Search: input }),
}));

export default useStore;
