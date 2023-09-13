import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Button,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 70,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "cod_client",
    headerName: "Cod Client",
    width: 200,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "name",
    headerName: "Name",
    width: 260,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "address",
    headerName: "Address",
    width: 300,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "saldo",
    headerName: "Saldo",
    width: 200,
    headerClassName: "super-app-theme--header",
  },
];

const rows = [
  {
    id: 1,
    cod_client: "167863",
    name: "Alexandru Popescu",
    address: "Str. Hanucai 32",
    saldo: "145 RON",
  },
  {
    id: 2,
    cod_client: "234123",
    name: "George Lungu",
    address: "Str. Mihai Bravu 12",
    saldo: "0 RON",
  },
  {
    id: 3,
    cod_client: "254122",
    name: "Andrei Pasca",
    address: "Str. Gheorghe Zamfir 42",
    saldo: "2123 RON",
  },
  {
    id: 4,
    cod_client: "421555",
    name: "Mihai Nanu",
    address: "Str. Mihai Eminescu 22",
    saldo: "4 RON",
  },
  {
    id: 5,
    cod_client: "561623",
    name: "Titi Yuan",
    address: "Bulevardul Basarabia 105A",
    saldo: "210 RON",
  },
  {
    id: 6,
    cod_client: "215232",
    name: "David Constantin",
    address: "Str. Panselelor 5",
    saldo: "231 RON",
  },
  {
    id: 7,
    cod_client: "899512",
    name: "Valentin Yuksel",
    address: "Str. Inginerilor 23",
    saldo: "6213 RON",
  },
  {
    id: 8,
    cod_client: "523444",
    name: "Maria Jumari",
    address: "Str. Electricienilor 2",
    saldo: "1234 RON",
  },
  {
    id: 9,
    cod_client: "652112",
    name: "Andrei Chiftele",
    address: "Bulevardul Stefan Cel Mare 234",
    saldo: "1322 RON",
  },
  {
    id: 10,
    cod_client: "421246",
    name: "Dimitrie David",
    address: "Str. Narciselor 2",
    saldo: "789 RON",
  },
];

export const AdminUsers = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: "8vh",
          mb: "10vh",
          textAlign: "left",
        }}
      >
        <Typography
          fontFamily={"Catesque"}
          fontWeight={"bold"}
          fontSize={"32px"}
        >
          Clienți
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
          placeholder="Cauta client..."
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
          width: "100%",
          overflowX: "hidden",
          "& .super-app-theme--header": {
            backgroundColor: "#f8f9fa",
          },
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
          checkboxSelection
          sx={{
            fontFamily: "Catesque",
            backgroundColor: "transparent",
            borderRadius: "25px",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f8f9fa",
            },
          }}
        />
      </Box>
    </Box>
  );
};
