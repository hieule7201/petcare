import { service_lists } from "../data";
import { DataGrid } from "@mui/x-data-grid";

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
  service_lists &&
    service_lists.forEach((item) => {
      row.push({
        id: item.id,
        name: item.name,
        phone: item.img,
        cal: item.short_desc,
      });
    });
  return (
    <div className="table-box">
      <DataGrid
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
