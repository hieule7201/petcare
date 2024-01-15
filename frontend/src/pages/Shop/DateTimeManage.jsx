import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/Shop/Template/DashboardHeader";
import DashboardSlide from "../../components/Shop/Template/DashboardSlide";
import { DataGrid, GridToolbar, viVN } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { getAllDate } from "../../api/datetime";

const DateTimeManage = () => {
  const [date, setDate] = useState([]);
  const column = [
    {
      field: "_id",
      headerName: "ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "services",
      headerName: "Dịch vụ",
      minWidth: 150,
      flex: 0.7,
      renderCell: (params) => params.row.services.name,
    },
    {
      field: "date",
      headerName: "Ngày phục vụ",
      minWidth: 150,
      flex: 0.7,
      renderCell: (params) =>
        new Date(params.row.date).toLocaleDateString("vi-VN"),
    },

    {
      field: "action",
      headerName: "Thao tác",
      minWidth: 150,
      flex: 0.7,
      type: "actions",
      renderCell: (params) => (
        <button className="primary-btn">Chỉnh sửa</button>
      ),
    },
  ];

  useEffect(() => {
    getDate();
  }, []);
  const getDate = async () => {
    try {
      const data = await getAllDate();
      setDate(data.data.data);
    } catch (error) {
      toast.error(error.data.response.message);
    }
  };
  return (
    <>
      <DashboardHeader />
      <div className="container shop_container">
        <DashboardSlide active={5} />
        <div style={{ width: "100%" }}>
          <h5 style={{ textAlign: "center" }}>Quản lý ngày giờ</h5>
          <div className="table-box">
            <DataGrid
              localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  csvOptions: { allColumns: true, utf8WithBom: true },
                },
              }}
              rows={date}
              columns={column}
              getRowId={(row) => row._id}
              disableSelectionOnClick
              autoHeight
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              pageSizeOptions={[5, 10, 15]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DateTimeManage;
