import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { UserMenu } from "../../components/admin/UserMenu";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { InvoiceEntity } from "../../types";
import { InvoiceService } from "../../services/InvoiceService";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "nrFactura",
    headerName: "Nr. Factura",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "codClient",
    headerName: "Cod Client",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "created_date",
    headerName: "Data Emitere",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "due_date",
    headerName: "Data Scadenta",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "restDePlata",
    headerName: "Rest de Plata",
    width: 150,
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <div
        style={{
          color: params.value === 0 ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {params.value + " RON"}
      </div>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      const id = params.row.id;
      return (
        <UserMenu
          id={id}
          forUser={false}
          users={null}
          handleOpenSnackbar={() => {}}
          setUsers={null}
        />
      );
    },
  },
];

export const IncasariInvoices: React.FC = () => {
  const [invoices, setInvoices] = useState<InvoiceEntity[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      await InvoiceService.getAllInvoices()
        .then((res) => {
          setInvoices(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchInvoices();
  }, []);

  return (
    <Box sx={{ width: "80%" }}>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: "8vh",
          textAlign: "left",
        }}
      >
        <Typography
          fontFamily={"Catesque"}
          fontWeight={"bold"}
          fontSize={"32px"}
        >
          Facturi
        </Typography>
        <Button
          startIcon={<AddIcon />}
          sx={{
            fontFamily: "Catesque",
            backgroundColor: "#0054a6",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#0054a6",
              color: "white",
            },
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          Adauga
        </Button>
      </Box>
      <Box sx={{ mb: "10vh" }}>
        <Box
          sx={{
            width: "100%",
            borderRadius: "15px",
            boxShadow: "0 0 16px -8px black",
            height: "8vh",
            mb: "15px",
            justifyContent: "left",
            alignItems: "left",
            textAlign: "left",
          }}
        >
          <OutlinedInput
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            placeholder="Cauta factura..."
            sx={{
              height: "5vh",
              mt: "15px",
              ml: "15px",
              width: "40%",
              borderRadius: "20px",
              fontFamily: "Catesque",
            }}
          />
        </Box>
        <Box
          sx={{
            overflowX: "hidden",
            boxShadow: "0 0 16px -8px black",
            borderRadius: "25px",
          }}
        >
          <DataGrid
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
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
