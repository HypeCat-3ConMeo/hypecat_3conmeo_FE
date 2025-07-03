import React from "react";
import {
  Box,
  Button,
  Chip,
  Typography,
  Card,
  Grid,
  CardContent,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
  Divider,
  Paper,
  useTheme,
  alpha,
  Fade,
  Slide,
} from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ProductImageGallery from "./ProductImages";
import LogTable from "./LogTable";
import { toast } from "react-toastify";
import DeleteProduct from "./popup/DeleteProduct";
import BatchProductTable from "./BatchProductTable";
import type { Product } from "../../types/ProductType";
import productApi from "../../api/services/ProductApi/productAPI";
import config from "../../configs";
import { useNavigate } from "react-router-dom";

type DetailProductProps = {
  id: string;
};

const DetailProduct: React.FC<DetailProductProps> = ({ id }) => {
  const theme = useTheme();
  const [product, setProduct] = React.useState<Product | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  const statusMap: Record<
    string,
    {
      label: string;
      color: "success" | "error" | "warning" | "info" | "default";
      bgColor: string;
      textColor: string;
    }
  > = {
    Available: {
      label: "Còn hàng",
      color: "success",
      bgColor: alpha(theme.palette.success.main, 0.1),
      textColor: theme.palette.success.dark,
    },
    OutOfStock: {
      label: "Hết hàng",
      color: "error",
      bgColor: alpha(theme.palette.error.main, 0.1),
      textColor: theme.palette.error.dark,
    },
    Incoming: {
      label: "Hàng về",
      color: "info",
      bgColor: alpha(theme.palette.info.main, 0.1),
      textColor: theme.palette.info.dark,
    },
    Discontinued: {
      label: "Ngừng",
      color: "default",
      bgColor: alpha(theme.palette.grey[500], 0.1),
      textColor: theme.palette.grey[700],
    },
    PendingApproval: {
      label: "Phê duyệt",
      color: "warning",
      bgColor: alpha(theme.palette.warning.main, 0.1),
      textColor: theme.palette.warning.dark,
    },
    Damaged: {
      label: "Hư hỏng",
      color: "error",
      bgColor: alpha(theme.palette.error.main, 0.1),
      textColor: theme.palette.error.dark,
    },
    Expired: {
      label: "Hết hạn",
      color: "error",
      bgColor: alpha(theme.palette.error.main, 0.1),
      textColor: theme.palette.error.dark,
    },
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data: Product = await productApi.getProductById(id);
      console.log(data);
      if (data) {
        setProduct(data);
      }
    } catch (error) {
      toast.error("Lấy thông tin sản phẩm thất bại");
      console.error("Lỗi khi lấy sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProduct();
  }, []);

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };

  const handleGoBack = () => {
    navigate(config.adminRoutes.manageProduct);
  };
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        sx={{
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.light,
            0.05
          )} 0%, ${alpha(theme.palette.secondary.light, 0.05)} 100%)`,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: "blur(10px)",
            border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          }}
        >
          <Stack alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: `conic-gradient(${theme.palette.primary.main}, transparent)`,
                animation: "spin 1s linear infinite",
                "@keyframes spin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            />
            <Typography variant="h6" color="text.secondary" fontWeight={500}>
              Đang tải thông tin sản phẩm...
            </Typography>
          </Stack>
        </Paper>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Typography variant="h6" color="error">
          Không tìm thấy sản phẩm
        </Typography>
      </Box>
    );
  }

  const StatusChip = ({ status }: { status: string }) => {
    const statusInfo = statusMap[status] || statusMap.Discontinued;
    return (
      <Chip
        label={statusInfo.label}
        sx={{
          backgroundColor: statusInfo.bgColor,
          color: statusInfo.textColor,
          fontWeight: 600,
          fontSize: "0.875rem",
          height: 36,
          "& .MuiChip-label": {
            px: 2,
          },
          border: `1px solid ${alpha(statusInfo.textColor, 0.2)}`,
        }}
      />
    );
  };

  const InfoCard = ({
    title,
    icon,
    children,
    color = "primary",
  }: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  }) => (
    <Fade in timeout={600}>
      <Card
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${alpha(
            theme.palette[color].light,
            0.05
          )} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`,
          backdropFilter: "blur(10px)",
          border: `1px solid ${alpha(theme.palette[color].main, 0.12)}`,
          borderRadius: 3,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: `0 20px 40px ${alpha(theme.palette[color].main, 0.15)}`,
            border: `1px solid ${alpha(theme.palette[color].main, 0.25)}`,
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2} mb={2}>
            <Avatar
              sx={{
                bgcolor: alpha(theme.palette[color].main, 0.1),
                color: theme.palette[color].main,
                width: 40,
                height: 40,
              }}
            >
              {icon}
            </Avatar>
            <Typography variant="h6" fontWeight={600} color="text.primary">
              {title}
            </Typography>
          </Stack>
          {children}
        </CardContent>
      </Card>
    </Fade>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.light,
          0.02
        )} 0%, ${alpha(theme.palette.secondary.light, 0.02)} 100%)`,
      }}
    >
      {/* Enhanced Header */}
      <Paper
        elevation={0}
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: alpha(theme.palette.background.paper, 0.95),
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          px: 4,
          py: 3,
          zIndex: 10,
        }}
      >
        <Slide direction="down" in timeout={400}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Tooltip title="Quay lại" arrow>
              <IconButton
                sx={{
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette.primary.main,
                    0.1
                  )} 0%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
                  color: theme.palette.primary.main,
                  width: 48,
                  height: 48,
                  "&:hover": {
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette.primary.main,
                      0.2
                    )} 0%, ${alpha(theme.palette.primary.light, 0.1)} 100%)`,
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
                onClick={handleGoBack}
              >
                <ArrowBackOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Box flex={1}>
              <Typography
                variant="h4"
                fontWeight={700}
                color="text.primary"
                sx={{
                  background: `linear-gradient(135deg, ${
                    theme.palette.text.primary
                  } 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {product.name}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2} mt={1}>
                <Typography variant="body2" color="text.secondary">
                  Mã sản phẩm: #{id} • Ngày tạo:{" "}
                  {new Date(product.createDate).toLocaleDateString("vi-VN")}
                </Typography>
                <Divider orientation="vertical" flexItem />
                <StatusChip status={product.status} />
                <Chip
                  label={
                    product.isDeleted ? "Không hoạt động" : "Đang hoạt động"
                  }
                  color={product.isDeleted ? "error" : "success"}
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              </Stack>
            </Box>

            {!product.isDeleted && (
              <Tooltip title="Chỉnh sửa sản phẩm" arrow>
                <Button
                  variant="contained"
                  startIcon={<EditOutlinedIcon />}
                  onClick={() => {
                    navigate(
                      config.adminRoutes.EditProductDetail.replace(
                        ":id",
                        product.id
                      )
                    );
                  }}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    py: 1.5,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    boxShadow: `0 8px 24px ${alpha(
                      theme.palette.primary.main,
                      0.3
                    )}`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 12px 32px ${alpha(
                        theme.palette.primary.main,
                        0.4
                      )}`,
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  Chỉnh sửa
                </Button>
              </Tooltip>
            )}
          </Stack>
        </Slide>
      </Paper>

      {/* Enhanced Content */}
      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Enhanced Images Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InfoCard
              title="Hình ảnh sản phẩm"
              icon={<InventoryOutlinedIcon />}
              color="info"
            >
              {product.images.length > 0 && product.cover ? (
                <ProductImageGallery
                  images={product.images}
                  cover={product.cover}
                />
              ) : (
                <Box
                  sx={{
                    height: 400,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette.grey[100],
                      0.5
                    )} 0%, ${alpha(theme.palette.grey[50], 0.8)} 100%)`,
                    borderRadius: 3,
                    border: `2px dashed ${alpha(theme.palette.grey[400], 0.3)}`,
                  }}
                >
                  <InventoryOutlinedIcon
                    sx={{
                      fontSize: 64,
                      color: alpha(theme.palette.grey[400], 0.6),
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={500}
                  >
                    Chưa có hình ảnh
                  </Typography>
                </Box>
              )}
            </InfoCard>
          </Grid>

          {/* Enhanced Product Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              {/* Category Info */}
              <InfoCard
                title="Thông tin danh mục"
                icon={<CategoryOutlinedIcon />}
                color="secondary"
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                      color: theme.palette.secondary.main,
                      width: 32,
                      height: 32,
                    }}
                  >
                    <CategoryOutlinedIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Danh mục sản phẩm
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {product.category.name}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    sx={{
                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                      color: theme.palette.secondary.main,
                      width: 32,
                      height: 32,
                    }}
                  >
                    <CategoryOutlinedIcon fontSize="small" />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Ngôn ngữ sản phẩm
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {product.language}
                    </Typography>
                  </Box>
                </Stack>
                {product.packsPerUnit > 0 && (
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.secondary.main, 0.1),
                        color: theme.palette.secondary.main,
                        width: 32,
                        height: 32,
                      }}
                    >
                      <CategoryOutlinedIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Số lượng mỗi hộp
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        color="text.primary"
                      >
                        {product.packsPerUnit}
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </InfoCard>

              {/* Enhanced Action Card */}
              <InfoCard
                title="Hành động"
                icon={<InfoOutlinedIcon />}
                color={product.isDeleted ? "success" : "error"}
              >
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  color={product.isDeleted ? "success" : "error"}
                  startIcon={
                    product.isDeleted ? (
                      <RestoreFromTrashOutlinedIcon />
                    ) : (
                      <DeleteOutlinedIcon />
                    )
                  }
                  onClick={() => setOpenDeleteDialog(true)}
                  sx={{
                    borderRadius: 3,
                    py: 2,
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    boxShadow: `0 8px 24px ${alpha(
                      product.isDeleted
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                      0.3
                    )}`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 12px 32px ${alpha(
                        product.isDeleted
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                        0.4
                      )}`,
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {product.isDeleted ? "Khôi phục sản phẩm" : "Ngừng hoạt động"}
                </Button>
              </InfoCard>
            </Stack>
          </Grid>
        </Grid>

        {/* Enhanced Batch Section */}
        {product.batchDetails && product.batchDetails.length > 0 && (
          <Fade in timeout={800}>
            <Box mt={6}>
              <InfoCard
                title="Thông tin lô hàng"
                icon={<InventoryOutlinedIcon />}
                color="info"
              >
                <BatchProductTable batchDetails={product.batchDetails} />
              </InfoCard>
            </Box>
          </Fade>
        )}

        {/* Enhanced History Section */}
        {product.logs && product.logs.length > 0 && (
          <Fade in timeout={1000}>
            <Box mt={6}>
              <InfoCard
                title="Lịch sử thay đổi"
                icon={<HistoryOutlinedIcon />}
                color="secondary"
              >
                <LogTable logs={product.logs} />
              </InfoCard>
            </Box>
          </Fade>
        )}
      </Box>

      {/* Dialogs */}

      {openDeleteDialog && (
        <DeleteProduct
          open={openDeleteDialog}
          handleClose={handleCloseDeleteDialog}
          product={product}
          fetchData={fetchProduct}
        />
      )}
    </Box>
  );
};

export default DetailProduct;
