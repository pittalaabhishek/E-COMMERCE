// src/store/atoms.js
import { atom } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: null
})

export const userNameState = atom({
  key: 'userNameState',
  default: 'Guest'
})

export const cartState = atom({
  key: 'cartState',
  default: []
})

export const productsState = atom({
  key: 'productsState',
  default: []
})

export const loginState = atom({
  key: 'loginState',
  default: false,
})