import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { productsState } from "../../store/atoms";
import { getProducts } from "../../services/supabase";

const useFetch = async () => {
  const [products, setProducts] = useRecoilState(productsState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await getProducts();
        if (error) {
          console.error(error);
        }
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return products;
};

export default useFetch;
