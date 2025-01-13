import { supabase } from "../Auth/Client";

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
  console.log("inside getProducts");
  console.log(supabase);

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name)");
  console.log("inside supabase getProducts", data);
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

// Cart functions
export const getCartItems = async (userId) => {
  if (!userId) {
    console.error("userId is undefined or null");
    throw new Error("userId is required");
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
    console.error("Error fetching cart items:", error);
    throw error;
  }

  return { data: data || [], error: null };
};
// export const getCartItems = async (userId) => {
//   if (!userId) {
//     console.error("userId is undefined or null");
//     throw new Error("userId is required");
//   }

//   const { data, error } = await supabase
//     .from("cart")
//     .select(
//       `
//             id,
//             user_id,
//             product_id,
//             quantity,
//             products (
//               id,
//               name,
//               price,
//               image_url
//             )
//           `
//     )
//     .eq("user_id", userId);
// .eq("user_id", userId.toString());
// .match({ user_id: userId});
// .filter('user_id', 'eq', userId);
// .eq("user_id", userId);

//   console.log("Inside getCartItems function in supabase.js");

//   if (error) {
//     console.log("ERROR Inside getCartItems function in supabase.js");
//     throw error;
//   }

//   return { data, error };
// };

export const addToCart = async (userId, productId) => {
  // const { data, error } = await supabase
  //   .from("cart")
  //   .insert([{ user_id: userId, product_id: productId, quantity: 1 }]);

  // if (error) {
  //   throw error;
  // }

  // return { data, error };
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
    console.error("Error in addToCart:", error);
    return { data: null, error };
  }
};

export const removeFromCart = async (cartId) => {
  try {
    const { error } = await supabase.from("cart").delete().eq("id", cartId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error removing item from cart:", error);
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
      console.error("Error updating cart quantity:", error);
      throw error;
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error("Error in updateCartQuantity:", error);
    return { data: null, error };
  }
};

// Orders functions
export const createOrder = async (userId, totalAmount, items) => {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        total_amount: totalAmount,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (orderError) return { error: orderError };

  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    price: item.products.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  return { data: order, error: itemsError };
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

//Profile Functions
export const handleSave = async (values) => {
  const { name, phone } = values;

  const { error } = await supabase
    .from("users")
    .update({ name, phone })
    .eq("id", user.id);

  if (error) {
    message.error("Error updating profile.");
  } else {
    message.success("Profile updated successfully!");
    setUserData({ ...userData, name, phone });
    setIsEditing(false);
  }
};
