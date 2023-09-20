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

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "nr_factura",
    headerName: "Nr. Factura",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "cod_client",
    headerName: "Cod Client",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "data_emitere",
    headerName: "Data Emitere",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "data_scadenta",
    headerName: "Data Scadenta",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "rest",
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

const rows = [
  {
    id: 1,
    nr_factura: "15424",
    cod_client: "167863",
    data_emitere: "01.12.2021",
    data_scadenta: "12.12.2021",
    rest: 145,
  },
  {
    id: 2,
    nr_factura: "15424",
    cod_client: "234123",
    data_emitere: "01.12.2021",
    data_scadenta: "12.12.2021",
    rest: 0,
  },
  {
    id: 3,
    nr_factura: "23541",
    cod_client: "254122",
    data_emitere: "01.12.2021",
    data_scadenta: "12.12.2021",
    rest: 2123,
  },
  {
    id: 4,
    nr_factura: "24556",
    cod_client: "421555",
    data_emitere: "01.12.2021",
    data_scadenta: "12.12.2021",
    rest: 4,
  },
  {
    id: 5,
    nr_factura: "24552",
    cod_client: "561623",
    data_emitere: "01.12.2021",
    data_scadenta: "12.12.2021",
    rest: 210,
  },
];

export const AdminInvoices: React.FC = () => {
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
            rows={rows}
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
