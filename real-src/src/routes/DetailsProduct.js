import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { Container } from "react-bootstrap";
import Loading from "../components/Loading";
import Card from "react-bootstrap/Card";

import useProductsForm from "../hooks/useProductsForm";
import { cleanRecord } from "../store/slices/productsSlice";

function DetailsProduct() {
  const { record, loading, error } = useProductsForm();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(cleanRecord());
    };
  }, [dispatch]);

  return (
    <>
      <Container>
        <Loading loading={loading} error={error}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={record?.image} />
            <Card.Body>
              <Card.Title>{record?.title}</Card.Title>
              <Card.Text>{record?.description}</Card.Text>
              <Card.Text>{record?.price}</Card.Text>
            </Card.Body>
          </Card>
        </Loading>
      </Container>
    </>
  );
}

export default DetailsProduct;
