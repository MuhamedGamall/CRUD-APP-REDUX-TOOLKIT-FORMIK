import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../store/slices/productsSlice";
import { useParams } from "react-router-dom";

function useProductsForm() {
  const { id } = useParams();
  const { record, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch, id]);
  return { record, loading, error };
}

export default useProductsForm;
