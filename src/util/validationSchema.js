
import * as Yup from "yup";

export const productsSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(80, "Title must be less than 80 characters"),
  category: Yup.string()
    .required("Category is required")
    .min(3, "Category must be at least 3 characters")
    .max(20, "Category must be less than 20 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(20, "Description must be at least 3 characters")
    .max(500, "Description must be less than 500 characters"),
  price: Yup.string()
    .required("Price is required")
    .min(0, "Price must be at least 3 characters")
    .max(20, "Price must be less than 20 characters"),
});
