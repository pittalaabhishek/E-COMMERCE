// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://tgvlscyrzlwdlebgyaxj.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndmxzY3lyemx3ZGxlYmd5YXhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MzI4NzMsImV4cCI6MjA1MDUwODg3M30.ijg4aYcmOuJyudroWG7svoLrPI1R83XnR-OoAfK-F7U';
// const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRndmxzY3lyemx3ZGxlYmd5YXhqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDkzMjg3MywiZXhwIjoyMDUwNTA4ODczfQ.SKMPRc_HkikzULUQNKZU8VCbmb8vCZ_j-OpMWjUNF6A';


// export const serviceSupabase = createClient(supabaseUrl, supabaseServiceKey);
// export const supabase = createClient(supabaseUrl, supabaseKey);

import { supabase } from '../Auth/Client';

// Auth functions
export const signUp = async (email, password, name, phone) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Products functions
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name)');
  return { data, error };
};

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('id', id)
    .single();
  return { data, error };
};

// Cart functions
export const getCartItems = async (userId) => {
  const { data, error } = await supabase
    .from('cart')
    .select('*, products(*)')
    .eq('user_id', userId);

  if (error) {
    throw error;
  }

  return { data, error };
};

export const addToCart = async (userId, productId) => {
  const { data, error } = await supabase
    .from('cart')
    .insert([{ user_id: userId, product_id: productId }]);

  if (error) {
    throw error;
  }
  
  return { data, error };
};

export const removeFromCart = async (cartId) => {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('id', cartId);
  return { error };
};

// Orders functions
export const createOrder = async (userId, totalAmount, items) => {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([{
      user_id: userId,
      total_amount: totalAmount,
      status: 'pending'
    }])
    .select()
    .single();

  if (orderError) return { error: orderError };

  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    price: item.products.price
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  return { data: order, error: itemsError };
};

export const getOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
};