import { create } from 'zustand'

export const useUserStore = create((set)=>({
  isLoggedIn : false,
  setUserState : (islogged) => set( (state) => ({ isLoggedIn : state.isLoggedIn = islogged }) ),
  loggedInUser: '',
  setLoggedInUser : (username) => set( (state) => ({ loggedInUser : state.loggedInUser = username }) ),
  recipientUser: '',
  setLoggedInUser : (username) => set( (state) => ({ recipientUser : state.recipientUser = username }) ),


}))
