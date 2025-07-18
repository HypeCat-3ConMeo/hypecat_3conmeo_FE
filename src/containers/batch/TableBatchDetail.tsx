/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  AlertTitle,
  Skeleton,
  Paper,
  Grid,
  Divider,
  IconButton,
  Tooltip,
  TableContainer,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Inventory as InventoryIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import type { BatchDetail } from "../../types/BatchType";
import BatchAPI from "../../api/services/BatchApi/batchAPI";
import CTable from "../../components/table/CTable";
import MenuActionTableBatchDetail from "../menu_action/BatchDetail/MenuActionTableBatchDetail";

interface DetailBatchProps {
  id: string;
}

const TableBatchDetail: React.FC<DetailBatchProps> = ({ id }) => {
  // State declarations with proper typing
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [dataBatchDetail, setDataBatchDetail] = useState<BatchDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate summary statistics
  const summary = {
    totalItems: dataBatchDetail.length,
  };

  // Fetch batch data
  const fetchBatchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const batch: any = await BatchAPI.getBatchById(id);
      const batchDetail = batch?.batchDetailDTOs;
      setDataBatchDetail(batchDetail);
      setTotal(batchDetail.length);
    } catch (error: any) {
      console.error("Error fetching batch data:", error?.message);
      setError("Không thể tải dữ liệu chi tiết lô hàng. Vui lòng thử lại.");
      setDataBatchDetail([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatchData();
  }, [id]);

  // Enhanced table headers with optimized widths and responsive design
  const tableHeader = [
    {
      id: "productDTO.name",
      label: "Tên nguyên liệu",
      align: "center" as const,
      minWidth: 140,
      maxWidth: 180,
      render: (value: string) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <InventoryIcon
            sx={{ fontSize: 16, color: "primary.main", flexShrink: 0 }}
          />
          <Typography
            variant="body2"
            fontWeight="medium"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "140px",
            }}
            title={value} // Show full text on hover
          >
            {value}
          </Typography>
        </Box>
      ),
    },
    {
      id: "batchId",
      label: "Số lô",
      align: "center" as const,
      minWidth: 120,
      maxWidth: 140,
      render: (value: string) => (
        <Chip
          label={value}
          size="small"
          variant="outlined"
          sx={{
            fontFamily: "monospace",
            fontSize: "0.7rem",
            maxWidth: "120px",
            "& .MuiChip-label": {
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
          title={value}
        />
      ),
    },
    {
      id: "quantity",
      label: "SL ban đầu",
      align: "center" as const,
      minWidth: 90,
    },
    {
      id: "productDTO.category.name",
      label: "Loại sản phẩm",
      align: "center" as const,
      minWidth: 90,
    },
    {
      id: "remainingQuantity",
      label: "SL còn lại",
      align: "center" as const,
      minWidth: 90,
    },
    {
      id: "sellingPrice",
      label: "Giá bán",
      align: "center" as const,
      minWidth: 90,
      format: "price" as const,
    },
  ];

  // Handle pagination change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newSize = parseInt(event.target.value, 10);
    setSize(newSize);
    setPage(0);
  };

  // Calculate paginated data for client-side pagination
  const paginatedData = dataBatchDetail.slice(page * size, (page + 1) * size);

  // Loading skeleton
  const LoadingSkeleton = () => (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[1, 2, 3, 4].map((i) => (
          <Grid size={{ mobile: 12, tablet: 6, desktop: 3 }} key={i}>
            <Skeleton
              variant="rectangular"
              height={80}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
        ))}
      </Grid>
      <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
    </Box>
  );

  if (loading && dataBatchDetail.length === 0) {
    return <LoadingSkeleton />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100vw",
        overflow: "hidden",
        px: { xs: 1, sm: 2, md: 3 }, // Responsive padding
      }}
    >
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            Chi tiết lô hàng
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <InfoIcon sx={{ fontSize: 20, flexShrink: 0 }} />
            Lô: Batch {id}
          </Typography>
        </Box>
        <Tooltip title="Làm mới dữ liệu">
          <IconButton
            onClick={fetchBatchData}
            disabled={loading}
            sx={{
              bgcolor: "primary.main",
              color: "white",
              "&:hover": { bgcolor: "primary.dark" },
              "&:disabled": { bgcolor: "grey.300" },
              flexShrink: 0,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <RefreshIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          <AlertTitle>Lỗi</AlertTitle>
          {error}
        </Alert>
      )}

      {/* Summary Cards */}
      {!error && dataBatchDetail.length > 0 && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <Card
              sx={{
                height: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <CardContent sx={{ color: "white", textAlign: "center", p: 2 }}>
                <InventoryIcon sx={{ fontSize: 32, mb: 1, opacity: 0.9 }} />
                <Typography variant="h5" component="div" fontWeight="bold">
                  {summary.totalItems}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Tổng số mặt hàng
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Divider sx={{ mb: 3 }} />

      {/* Main Table with horizontal scroll */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <TableContainer
          sx={{
            maxHeight: { xs: 400, sm: 500, md: 600 },
            overflowX: "auto",
            overflowY: "auto",
          }}
        >
          <Box sx={{ position: "relative", minWidth: "800px" }}>
            {loading && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                  backdropFilter: "blur(2px)",
                }}
              >
                <CircularProgress size={40} />
              </Box>
            )}

            <CTable
              tableHeaderTitle={tableHeader}
              data={paginatedData.map((item) => ({
                ...item,
              }))}
              total={total}
              page={page}
              size={size}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              menuAction={(row) => (
                <MenuActionTableBatchDetail
                  batchData={row}
                  fetchData={fetchBatchData}
                />
              )} // No menu action for this table
            />
          </Box>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default TableBatchDetail;
