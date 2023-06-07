import { useDispatch, useSelector } from "react-redux";
import ProductsItems from "../components/ProductsItems";
import { useEffect } from "react";
import { fetchProducts } from "../store/slices/productsSlice";
function Index() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return <ProductsItems data={products} loading={loading} error={error} />;
}

export default Index;
