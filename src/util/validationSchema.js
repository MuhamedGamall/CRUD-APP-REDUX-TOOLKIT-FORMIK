import * as Yup from "yup";

export const productsSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(1, "Title must be at least 1 character")
    .max(255, "Title can have a maximum of 255 characters"),
  category: Yup.string()
    .required("Category is required")
    .min(1, "Category must be at least 1 character")
    .max(100, "Category can have a maximum of 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(1, "Description must be at least 1 character")
    .max(1000, "Description can have a maximum of 1000 characters"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be a positive number")
    .max(99999, "Price can have a maximum value of 99999"),
});
