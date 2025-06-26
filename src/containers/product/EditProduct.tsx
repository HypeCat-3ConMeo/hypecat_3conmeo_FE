import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Paper, Typography, Grid, Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import type { EditProductFormInput } from "../../types/ProductType";
import { uploadImageToFirebase } from "../../firebase/uploadImageToFirebase";
import productApi from "../../api/services/ProductApi/productAPI";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadSingleFile,
} from "../../components/hook-form";

const productStatusOptions = [
  { value: "", label: "Chọn trạng thái" },
  { value: "Available", label: "Còn hàng" },
  { value: "OutOfStock", label: "Hết hàng" },
  { value: "Incoming", label: "Hàng về" },
  { value: "Discontinued", label: "Ngừng" },
  { value: "PendingApproval", label: "Phê duyệt" },
  { value: "Damaged", label: "Hư hỏng" },
  { value: "Expired", label: "Hết hạn" },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Tên sản phẩm là bắt buộc"),
  categoryId: Yup.number()
    .typeError("Phải là số")
    .required("Danh mục sản phẩm là bắt buộc"),
  sellingPrice: Yup.number()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        const normalized = originalValue.replace(/,/g, "");
        return parseFloat(normalized);
      }
      return value;
    })
    .typeError("Phải là số")
    .required("Giá bán là bắt buộc"),
  importCosts: Yup.number()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        const normalized = originalValue.replace(/,/g, "");
        return parseFloat(normalized);
      }
      return value;
    })
    .typeError("Phải là số")
    .required("Giá nhập là bắt buộc"),
  unit: Yup.string().required("Đơn vị là bắt buộc"),
  status: Yup.string().required("Trạng thái là bắt buộc"),
  productImages: Yup.array()
    .min(1, "Images is required")
    .required("Ảnh là bắt buộc"),
  // productImages: Yup.mixed().required("Cover is required"),
});

const EditProduct = ({ id }: { id: string }) => {
  const methods = useForm<EditProductFormInput>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      categoryId: 0,
      sellingPrice: 0,
      importCosts: 0,
      unit: "",
      status: "",
      productImages: [],
    },
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productApi.getProductById(id);
        console.log(data);
        reset({
          ...data,
          productImages: data.images?.map((img) => img.urlPath) || [],
        });
      } catch (error) {
        toast.error("Lấy thông tin sản phẩm thất bại");
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    if (id) fetchProduct();
  }, [id, reset]);

  const onSubmit = async (data: EditProductFormInput) => {
    try {
      //console.log(data)
      await productApi.UpdateProduct(id, data);
      toast.success("Cập nhật sản phẩm thành công");
    } catch (error) {
      toast.error("Cập nhật sản phẩm thất bại");
      console.error("Cập nhật sản phẩm thất bại:", error);
    }
  };

  const handleDrop = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (acceptedFiles: any[]) => {
      const file = acceptedFiles[0];

      const coverImage = await uploadImageToFirebase(file);
      if (typeof coverImage === "string") {
        setValue("productImages", [coverImage]);
      }
    },
    [setValue]
  );

  return (
    <Container maxWidth="md" sx={{ my: 2 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Chỉnh sửa sản phẩm
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <RHFTextField name="name" label="Tên sản phẩm" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <RHFTextField name="importCosts" label="Giá nhập" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <RHFTextField name="sellingPrice" label="Giá bán" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <RHFSelect name="status" label="Trạng thái">
                {productStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <RHFUploadSingleFile
                name="productImages"
                label="Ảnh sản phẩm"
                onDrop={handleDrop}
              />
            </Grid>
          </Grid>

          <Box
            mt={4}
            display="flex"
            flexDirection={{ xs: "column", lg: "row" }}
            justifyContent="flex-end"
            alignItems="center"
            gap={2}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                width: { xs: "100%", sm: "auto" },
                order: { xs: 1, lg: 2 },
              }}
            >
              {isSubmitting ? "Đang cập nhật..." : "Lưu thay đổi"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                borderColor: "secondary.main",
                color: "secondary.main",
                ":hover": {
                  backgroundColor: (theme) => theme.palette.secondary.light,
                  borderColor: "secondary.dark",
                  color: "white",
                },
                width: { xs: "100%", sm: "auto" },
                order: { xs: 2, lg: 1 },
              }}
            >
              Quay lại
            </Button>
          </Box>
        </FormProvider>
      </Paper>
    </Container>
  );
};
export default EditProduct;
