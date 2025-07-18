/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import MenuActionTableBatch from "../menu_action/Batch/MenuActionTableBatch";
import BatchAPI from "../../api/services/BatchApi/batchAPI";
import CTable from "../../components/table/CTable";
import { useNavigate } from "react-router-dom";
import config from "../../configs";

// Define the Batch model interface
interface BatchModel {
  id: number;
  batchNumber: string;
  receivedDate: string;
}

// API returns all data without server-side pagination

const TableBatch = () => {
  // State declarations with proper typing
  const [selectedData, setSelectedData] = useState<BatchModel | null>(null);
  const [size, setSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [dataBatch, setDataBatch] = useState<BatchModel[]>([]);
  const navigate = useNavigate();

  // Select data handler
  const selectData = (row: BatchModel) => {
    setSelectedData(row);
  };

  // Fetch batch data
  useEffect(() => {
    const fetchBatchData = async () => {
      try {
        const response: any = await BatchAPI.getBatchList({});

        const items = Array.isArray(response)
          ? response
          : response?.items || [];

        console.log("Fetched batch data:", items);

        setDataBatch(items);
        setTotal(items.length);
      } catch (error: any) {
        console.error("Error fetching batch data:", error?.message);
        setDataBatch([]);
        setTotal(0);
      }
    };

    fetchBatchData();
  }, []); // Remove page and size dependencies since API doesn't support pagination

  // Table headers configuration
  const tableHeader = [
    {
      id: "id",
      label: "Số lô",
      align: "left" as const,
      format: "bathchNumber" as const,
    },
    {
      id: "createDate",
      label: "Ngày nhận",
      align: "center" as const,
      format: "datetime" as const,
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

  const handleBatchRowClick = (row: BatchModel) => {
    navigate(
      config.adminRoutes.manageBatchDetail.replace(":id", row.id.toString())
    );
  };

  return (
    <>
      <CTable
        data={dataBatch}
        tableHeaderTitle={tableHeader}
        title="Bảng quản lý lô hàng"
        menuAction={(row) => (
          <MenuActionTableBatch batchData={row} onOpenDetail={selectData} />
        )}
        selectedData={selectedData}
        size={size}
        page={page}
        total={total}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        onRowClick={handleBatchRowClick}
      />
    </>
  );
};

export default TableBatch;
