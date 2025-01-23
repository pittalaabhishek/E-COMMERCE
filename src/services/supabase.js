import { supabase } from "../Auth/Client";
import { userState } from "../store/atoms";
import { useRecoilState } from "recoil";



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
    .from("products")
    .select("*, categories(name)");
  return { data, error };
};

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name)")
    .eq("id", id)
    .single();
  return { data, error };
};

export const deleteCart = async (user) => {
  if (user) {
    const { error } = await supabase
      .from("cart") // Replace with your cart table name
      .delete()
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
    }
  }
};

// Cart functions
export const getCartItems = async (userId) => {
  if (!userId) {
    console.log("userId is required");
  }

  const { data, error } = await supabase
    .from("cart")
    .select(
      `
      *,
      products (
        id,
        name,
        price,
        image_url
      )
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
  }

  return { data: data || [], error: null };
};

export const addToCart = async (userId, productId) => {
  try {
    // First, check if the item exists
    const { data: existingItems, error: fetchError } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId);

    if (fetchError) throw fetchError;

    if (existingItems && existingItems.length > 0) {
      // Item exists, update quantity
      const existingItem = existingItems[0];
      const { data, error } = await supabase
        .from("cart")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("user_id", userId)
        .eq("product_id", productId)
        .select("*, products(id, name, price, image_url)"); // Match your getCartItems select

      if (error) throw error;
      return { data: data[0], error: null };
    } else {
      // Item doesn't exist, insert new
      const { data, error } = await supabase
        .from("cart")
        .insert([
          {
            user_id: userId,
            product_id: productId,
            quantity: 1,
          },
        ])
        .select("*, products(id, name, price, image_url)"); // Match your getCartItems select

      if (error) throw error;
      return { data: data[0], error: null };
    }
  } catch (error) {
    return { data: null, error };
  }
};

export const removeFromCart = async (cartId) => {
  try {
    const { error } = await supabase.from("cart").delete().eq("id", cartId);

    if (error) console.log(error);
    return { error: null };
  } catch (error) {
    return { error };
  }
};
export const updateCartQuantity = async (cartId, quantity) => {
  try {
    if (quantity <= 0) {
      return removeFromCart(cartId);
    }

    // Update the specific cart item by its unique ID
    const { data, error } = await supabase
      .from("cart")
      .update({ quantity })
      .eq("id", cartId) // Using the specific cart item ID
      .select("*, products(id, name, price, image_url)");

    if (error) {
      console.error(error);
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error("Error in updateCartQuantity:", error);
    return { data: null, error };
  }
};

export const createOrder = async (orderData) => {
  const { user_id, total_amount, products } = orderData;

  if (!user_id) {
    return { error: { message: "User ID is required" } };
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user_id,
      total_amount: Number(total_amount),
      status: "processing",
    })
    .select()
    .single();

  if (orderError) {
    return { error: orderError };
  }

  const orderItems = products.map((item) => ({
    order_id: order.id,
    product_id: item.products?.id || item.product_id,
    price: Number(item.products?.price || item.price),
  }));

  const { data: insertedItems, error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems)
    .select();

  if (itemsError) {
    console.error("Order items insertion error:", itemsError);

    //Rollback order if items insertion fails
    await supabase.from("orders").delete().eq("id", order.id);

    return { error: itemsError };
  }

  return {
    data: {
      order,
      orderItems: insertedItems,
    },
    error: null,
  };
};

export const getOrders = async (userId) => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        *,
        products (*)
      )
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return { data, error };
};
