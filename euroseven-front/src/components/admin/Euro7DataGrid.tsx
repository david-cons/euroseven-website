import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { InvoiceEntity, UserEntity } from "../../types";
import { Box } from "@mui/material";

export const Euro7DataGrid: React.FC<{
  searchText: string;
  users?: UserEntity[];
  columns: GridColDef[];
  searchedUsers?: UserEntity[];
  invoices?: InvoiceEntity[];
  searchedInvoices?: InvoiceEntity[];
  
}> = ({
  searchText,
  users,
  columns,
  searchedUsers,
  invoices,
  searchedInvoices,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "hidden",
        "& .super-app-theme--header": {
          backgroundColor: "#E4E5E6",
        },
        "&. inactive-row": {
          color: "grey",
        },
        boxShadow: "0 0 16px -8px black",
        borderRadius: "25px",
      }}
    >
      {users && searchedUsers && (
        <DataGrid
          rows={searchText === "" ? users : searchedUsers}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{
            fontFamily: "Catesque",
            backgroundColor: "transparent",
            borderRadius: "25px",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#E4E5E6",
            },
            "& .MuiDataGrid-columnsContainer": {
              marginLeft: "16px", // Adjust the value as needed
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
          }}
        />
      )}{" "}
      {invoices /*&& searchedInvoices */ && (
        <DataGrid
          // rows={searchText === "" ? invoices : searchedInvoices}
          rows={invoices}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          sx={{
            fontFamily: "Catesque",
            backgroundColor: "transparent",
            borderRadius: "25px",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#E4E5E6",
            },
            "& .MuiDataGrid-columnsContainer": {
              marginLeft: "16px", // Adjust the value as needed
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
          }}
        />
      )}
    </Box>
  );
};
