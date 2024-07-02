import { create } from 'zustand'

export const useUserStore = create((set)=>({
  isLoggedIn : false,
  setUserState : (val) => set( (state) => ({ isLoggedIn : state.isLoggedIn = val }) )

}))
