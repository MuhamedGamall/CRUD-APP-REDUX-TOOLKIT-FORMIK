import { Box, TextField } from "@mui/material";
import Loading from "../components/Loading";
import useProductData from "../hooks/useProductData";
import { Button, Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { productsSchema } from "../util/validationSchema";
import { useEffect } from "react";
import { cleanUpProduct, editProduct } from "../store/slices/productsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import WithGuard from "../util/withGuard";

function EditProduct() {
  const { product, loading, error } = useProductData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFormSubmit = (val) => {
    dispatch(
      editProduct({
        id: product?.id,
        title: val.title,
        category: val.category,
        description: val.description,
        price: val.price,
      })
    )
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => alert(err));
  };
  useEffect(() => {
    return () => {
      dispatch(cleanUpProduct());
    };
  }, [dispatch]);
  const formik = useFormik({
    initialValues: {
      title: product ? product?.title : "",
      category: product ? product?.category : "",
      description: product ? product?.description : "",
      price: product ? product?.price : "",
    },
    enableReinitialize: true,
    validationSchema: productsSchema,
    onSubmit: (val) => {
      handleFormSubmit(val);
    },
  });
  return (
    <Container style={{ marginTop: "15px" }}>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Title"
            name="title"
            error={!!formik.touched.title && !!formik.errors.title}
            value={formik.values.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Category"
            name="category"
            error={!!formik.touched.category && !!formik.errors.category}
            value={formik.values.category}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            helperText={formik.touched.category && formik.errors.category}
            sx={{ mt: "8px" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Description"
            name="description"
            error={!!formik.touched.description && !!formik.errors.description}
            value={formik.values.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            helperText={formik.touched.description && formik.errors.description}
            sx={{ mt: "8px" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Price"
            name="price"
            error={!!formik.touched.price && !!formik.errors.price}
            value={formik.values.price}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            helperText={formik.touched.price && formik.errors.price}
            sx={{ mt: "8px" }}
          />

          <Box display={"flex"} justifyContent={"end"} mt={"20px"}>
            <Loading loading={loading} error={error}>
              <Button type="submit" color="secondary">
                Save
              </Button>
            </Loading>
          </Box>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default WithGuard(EditProduct);
