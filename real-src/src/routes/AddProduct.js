import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { insertProduct } from "../store/slices/productsSlice";
import WithGuard from "../util/WithGuard";
import { useFormik } from "formik";
import { productsSchema } from "../util/validationSchema";

function AddProduct() {
  const navigate = useNavigate();
  const { records, loading, error } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      price: 0,
    },
    validationSchema: productsSchema,
    onSubmit: (val) => {
      dispatch(
        insertProduct({
          id: +records.at(-1).id + 1,
          title: val.title,
          category: val.category,
          description: val.description,
          price: val.price,
        })
      )
        .unwrap()
        .then(() => navigate("/"))
        .catch((error) => console.log(error));
    },
  });

  return (
    <>
      <Container>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Title..."
              value={formik.values.title}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description..."
              value={formik.values.description}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              placeholder="Category..."
              value={formik.values.category}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.category}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.category}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Price..."
              value={formik.values.price}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.price}
            </Form.Control.Feedback>
          </Form.Group>
          <Loading loading={loading} error={error}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Loading>
        </Form>
      </Container>
    </>
  );
}

export default WithGuard(AddProduct);
