import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useProductsForm from "../hooks/useProductsForm";
import { Button, Container, Form } from "react-bootstrap";
import Loading from "../components/Loading";
import { editProduct } from "../store/slices/productsSlice";
import WithGuard from "../util/WithGuard";
import { useFormik } from "formik";
import { productsSchema } from "../util/validationSchema";

function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { record, loading, error } = useProductsForm();

  const formik = useFormik({
    initialValues: {
      title: record ? record?.title : "",
      category: record ? record?.category : "",
      description: record ? record?.description : "",
      price: record ? record?.price : 0,
    },
    enableReinitialize: true,
    validationSchema: productsSchema,
    onSubmit: (val) => {
      dispatch(
        editProduct({
          id: record?.id,
          title: val.title,
          category: val.category,
          description: val.description,
          price: val.price,
        })
      )
        .unwrap()
        .then(() => navigate("/"))
        .catch((err) => console.log(err));
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

export default WithGuard(EditProduct);
