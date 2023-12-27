// import { viVN } from "@mui/material/locale";
import { DataGrid, GridToolbar, viVN } from "@mui/x-data-grid";

const Table = () => {
  const column = [
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 150,
      flex: 0.7,
    },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.7 },
    { field: "phone", headerName: "Phone", minWidth: 150, flex: 0.7 },
    { field: "cal", headerName: "Product Id", minWidth: 150, flex: 0.7 },
  ];
  const row = [];

  return (
    <div className="table-box">
      <DataGrid
        localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: { csvOptions: { allColumns: true, utf8WithBom: true } },
        }}
        rows={row}
        columns={column}
        disableSelectionOnClick
        autoHeight
        initialState={{
          pagination: { paginationModel: { pageSize: 2, page: 0 } },
        }}
        pageSizeOptions={[2, 5, 10]}
      />
    </div>
  );
};

export default Table;
