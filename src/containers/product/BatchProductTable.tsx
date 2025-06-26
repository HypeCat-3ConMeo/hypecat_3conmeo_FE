import { useState } from "react";
import { Box, Chip, Typography } from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";
import type { BatchDetail } from "../../types/BatchType";
import CTable from "../../components/table/CTable";

const BatchProductTable = ({
  batchDetails,
}: {
  batchDetails: BatchDetail[];
}) => {
  // State declarations with proper typing
  const [size, setSize] = useState<number>(10);
  const total = 0;
  const [page, setPage] = useState<number>(0);

  // Table headers configuration
  const tableHeader = [
    // {
    //     id: "id",
    //     label: "Số lô",
    //     align: "left" as const,
    //     format: "bathchNumber" as const,
    // },
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
      id: "sourceOfProductDTO.name",
      label: "Nhà cung cấp",
      align: "center" as const,
      minWidth: 120,
      maxWidth: 150,
      render: (value: string) => (
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "130px",
          }}
          title={value}
        >
          {value}
        </Typography>
      ),
    },
    {
      id: "quantity",
      label: "SL ban đầu",
      align: "center" as const,
      minWidth: 90,
      render: (value: number, row: BatchDetail) => (
        <Typography
          variant="body2"
          fontWeight="medium"
          sx={{ fontSize: "0.8rem" }}
        >
          {value.toLocaleString()}
          <br />
          <Typography component="span" variant="caption" color="text.secondary">
            {row.quantity}
          </Typography>
        </Typography>
      ),
    },
    {
      id: "remainingQuantity",
      label: "SL còn lại",
      align: "center" as const,
      minWidth: 90,
      render: (value: number, row: BatchDetail) => {
        const percentage = (value / row.quantity) * 100;
        const color =
          percentage > 50
            ? "success.main"
            : percentage > 20
            ? "warning.main"
            : "error.main";

        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ color, fontSize: "0.8rem" }}
            >
              {value.toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Đơn vị
            </Typography>
          </Box>
        );
      },
    },
    {
      id: "expiredDate",
      label: "HSD",
      align: "center" as const,
      minWidth: 100,
      format: "date" as const,
      render: (value: string, row: BatchDetail) => {
        // const date = new Date(value).toLocaleDateString("vi-VN", {
        //   day: "2-digit",
        //   month: "2-digit",
        //   year: "2-digit",
        // });
        const isExpired = row.isExpiredLogged;
        const isExpiringSoon = !isExpired && row.daysUntilExpiration <= 7;

        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: isExpired
                  ? "error.main"
                  : isExpiringSoon
                  ? "warning.main"
                  : "text.primary",
                fontWeight: isExpired || isExpiringSoon ? "bold" : "normal",
                fontSize: "0.75rem",
              }}
            >
              {value}
            </Typography>
            {(isExpired || isExpiringSoon) && (
              <WarningIcon
                sx={{
                  fontSize: 14,
                  color: isExpired ? "error.main" : "warning.main",
                }}
              />
            )}
          </Box>
        );
      },
    },
    {
      id: "daysUntilExpiration",
      label: "Ngày còn lại",
      align: "center" as const,
      minWidth: 80,
      render: (value: number, row: BatchDetail) => {
        if (row.isExpiredLogged) {
          return (
            <Chip
              label="Hết hạn"
              size="small"
              color="error"
              sx={{ fontSize: "0.7rem", height: "20px" }}
            />
          );
        }

        const color = value <= 3 ? "error" : value <= 7 ? "warning" : "success";
        return (
          <Chip
            label={`${value}d`}
            size="small"
            color={color}
            variant={value <= 7 ? "filled" : "outlined"}
            sx={{ fontSize: "0.7rem", height: "20px" }}
          />
        );
      },
    },
    {
      id: "isExpiredLogged",
      label: "Trạng thái",
      align: "center" as const,
      minWidth: 100,
      format: "expired",
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
    setPage(0); // Reset to first page when changing page size
  };

  return (
    <>
      <CTable
        data={[...batchDetails].reverse()}
        tableHeaderTitle={tableHeader}
        title="Bảng quản lý lô hàng"
        size={size}
        page={page}
        total={total}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default BatchProductTable;
