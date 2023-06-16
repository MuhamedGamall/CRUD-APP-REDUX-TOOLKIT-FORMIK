import { Button, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductsHundler = ({ data, deleteProduct }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const handleDelete = (el) => {
    if (
      window.confirm(
        `Do You Realy Wont To Delete This Item "${el.title
          .split(" ")
          .slice(0, 3)
          .join(" ")}..."`
      )
    ) {
      deleteProduct(el.id);
    }
  };

  const products = data.map((el) => (
    <tr key={el.id}>
      <td>#{el.id}</td>
      <td className="title">{el.title}</td>
      <td>{el.category}</td>
      <td>{el.price}</td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button variant="success">
            <Link to={`products/${el.id}/edit`}>Edit</Link>
          </Button>
          <Button variant="primary">
            <Link to={`products/${el.id}/details`}>Details</Link>
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(el)}
            disabled={!isLoggedIn}
            style={{ lineHeight: "1" }}
          >
            <h6
              style={{ fontSize: "8px", whiteSpace: "nowrap", lineHeight: "0" }}
            >
              {!isLoggedIn && "Please log in first"}
            </h6>
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  ));
  return <>{products}</>;
};

export default ProductsHundler;
