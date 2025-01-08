import { supabase } from '../Auth/Client';

export const api = {
  // Products
  async getProducts(category_id = null) {
    const query = supabase
      .from('products')
      .select('*, categories(name)');
    
    if (category_id) {
      query.eq('category_id', category_id);
    }
    
    return await query;
  },

  async getProduct(id) {
    return await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('id', id)
      .single();
  },

  // Cart
  async getCart(user_id) {
    return await supabase
      .from('cart')
      .select('*, products(*)')
      .eq('user_id', user_id);
  },

  // async addToCart(user_id, product_id, quantity = 1) {
  //   return await supabase
  //     .from('cart')
  //     .upsert({ 
  //       user_id, 
  //       product_id, 
  //       quantity
  //     });
  // },
  async addToCart(user_id, product_id, quantity = 1) {
    // Fetch the current cart entry
    const { data, error } = await supabase
      .from('cart')
      .select('quantity')
      .eq('user_id', user_id)
      .eq('product_id', product_id)
      .single();
  
    if (error && error.code !== 'PGRST116') {
      // Handle other errors (PGRST116 means no matching row)
      return { error };
    }
  
    const newQuantity = (data?.quantity || 0) + quantity;
  
    // Upsert the new quantity
    return await supabase
      .from('cart')
      .upsert({
        user_id,
        product_id,
        quantity: newQuantity,
      });
  },

  async removeFromCart(user_id, product_id) {
    return await supabase
      .from('cart')
      .delete()
      .eq('user_id', user_id)
      .eq('product_id', product_id);
  },

  // Orders
  async createOrder(user_id, items, total_amount) {
    const { data: order } = await supabase
      .from('orders')
      .insert({
        user_id,
        total_amount,
        status: 'pending'
      })
      .select()
      .single();

    if (order) {
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products.price
      }));

      await supabase
        .from('order_items')
        .insert(orderItems);

      return order;
    }
  },

  async getOrders(user_id) {
    return await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (*)
        )
      `)
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });
  }
};