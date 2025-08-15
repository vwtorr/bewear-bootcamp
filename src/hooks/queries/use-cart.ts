import { getCart } from "@/actions/get-cart";
import { useQuery } from "@tanstack/react-query";

export const CART_QUERY_KEY = ["cart"] as const;

const UseCart = () => {
    return useQuery ({
            queryKey: CART_QUERY_KEY,
            queryFn: () => getCart(),
          });
}
 
export default UseCart;