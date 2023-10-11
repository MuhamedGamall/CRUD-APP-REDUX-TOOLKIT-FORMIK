import { Card, Container } from "react-bootstrap";
import Loading from "../components/Loading";
import useProductData from "../hooks/useProductData";
import { cleanUpProduct } from "../store/slices/productsSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function DetailsProduct() {
  const { loading, error, product } = useProductData();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(cleanUpProduct());
    };
  }, [dispatch]);
  return (
    <>
      <Container>
        <Loading loading={loading} error={error}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={product?.image} />
            <Card.Body>
              <Card.Title>{product?.title}</Card.Title>
              <Card.Text>{product?.description}</Card.Text>
              <Card.Text>{product?.price}</Card.Text>
            </Card.Body>
          </Card>
        </Loading>
      </Container>
    </>
  );
}

export default DetailsProduct;
