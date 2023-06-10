import { useDispatch, useSelector } from "react-redux";
import ProductsItems from "../components/ProductsItems";
import { useEffect } from "react";
import { fetchProducts } from "../store/slices/productsSlice";
import Loading from "../components/Loading";
function Index() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Loading loading={loading} error={error}>
      <ProductsItems data={products} />
    </Loading>
  );
}

export default Index;
