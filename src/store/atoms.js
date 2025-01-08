// src/store/atoms.js
import { atom } from 'recoil'

export const userState = atom({
  key: 'userState',
  default: null
})

export const cartState = atom({
  key: 'cartState',
  default: []
})

export const productsState = atom({
  key: 'productsState',
  default: []
})