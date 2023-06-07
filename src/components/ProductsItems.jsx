import { Button, ButtonGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductsItems({ data, loading, error }) {
  console.log(data);
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
          <Button variant="danger">Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  ));
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
      <tbody>{products}</tbody>
    </Table>
  );
}

export default ProductsItems;
