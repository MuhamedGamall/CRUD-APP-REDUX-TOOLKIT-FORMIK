import { Table } from "react-bootstrap";
import ProductsHundler from "./ProductsHundler";
import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../store/slices/productsSlice";

function ProductsItems({ data, loading, error }) {
  const dispatch = useDispatch();
  const deleteItem = useCallback(
    (id) => {
      dispatch(deleteProduct(id));
    },
    [dispatch]
  );
  return (
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
        <ProductsHundler
          data={data}
          loading={loading}
          error={error}
          deleteProduct={deleteItem}
        />
      </tbody>
    </Table>
  );
}

export default memo(ProductsItems);
