import Loading from "../components/Loading";
import useProductData from "../hooks/useProductData";

function DetailsProduct() {
  const { loading, error, product, id } = useProductData();

  return (
    <>
      <Loading loading={loading} error={error}>
        <img src={product?.image} alt={`img prodict src ${product?.image}`} />
        <h1>{product?.title}</h1>
        <p>{product?.category}</p>
        <p>{product?.price}</p>
        <p>{product?.description}</p>

      </Loading>
    </>
  );
}

export default DetailsProduct;
