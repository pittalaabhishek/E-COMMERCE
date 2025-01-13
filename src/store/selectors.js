import { selector } from 'recoil';
import { cartState, productsState } from './atoms';

export const cartTotalSelector = selector({
  key: 'cartTotal',
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.products.price * item.quantity, 0);
  },
});

export const cartItemCountSelector = selector({
  key: 'cartItemCount',
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.length;
  },
});

export const productsByCategorySelector = selector({
  key: 'productsByCategory',
  get: ({ get }) => {
    const products = get(productsState);
    return products.reduce((acc, product) => {
      const category = product.categories.name;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  },
});