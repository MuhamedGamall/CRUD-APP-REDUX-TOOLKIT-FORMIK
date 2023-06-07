import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback, useEffect } from "react";
import { fetchProducts, deleteProduct } from "../store/slices/productsSlice";
import ProductsItems from "./ProductsItems";
import Loading from "./Loading";

function Products() {
  const dispatch = useDispatch();
  const { records, loading, error } = useSelector((state) => state.products);
  const {isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const deleteItem = useCallback(
    (id) => {
      dispatch(deleteProduct(id));
    },
    [dispatch]
  );
  return (
    <Container>
      <h1 className="pageTitle">Home Page</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th className="title">Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <Loading loading={loading} error={error}>
            <ProductsItems data={records} deleteProduct={deleteItem} isLoggedIn={isLoggedIn}/>
          </Loading>
        </tbody>
      </Table>
    </Container>
  );
}
export default memo(Products);
