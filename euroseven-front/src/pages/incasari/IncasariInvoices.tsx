import {
  Alert,
  Box,
  Button,
  Snackbar,
  Typography,
  debounce,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { InvoiceEntity } from "../../types";
import { InvoiceService } from "../../services/InvoiceService";
import axios from "../../axios";
import { SearchBar } from "../../components/SearchBar";
import { Euro7DataGrid } from "../../components/admin/Euro7DataGrid";
import { ModalAddFacturi } from "../../components/incasari/Modals";
import { InvoiceMenu } from "../../components/incasari/InvoiceMenu";
import { roRO } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../../components/incasari/CustomNoRowsOverlay";
import moment from "moment";

export const IncasariInvoices: React.FC<{
  filter?: String | null;
  setInvoiceFilter?: React.Dispatch<React.SetStateAction<String | null>>;
  createUser?: boolean;
  setCreateUser?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ filter, setInvoiceFilter, createUser, setCreateUser }) => {
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
      type: "date",
      valueGetter: (params) => {
        return moment(params.value, "DD/MM/YYYY").toDate();
      },
      renderCell: (params) => moment(params.value).format("DD/MM/YYYY"),
    },
    {
      field: "due_date",
      headerName: "Data Scadenta",
      width: 150,
      headerClassName: "super-app-theme--header",
      type: "date",
      valueGetter: (params) => {
        return moment(params.value, "DD/MM/YYYY").toDate();
      },
      renderCell: (params) => moment(params.value).format("DD/MM/YYYY"),
    },
    {
      field: "price",
      headerName: "Preț",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div
          style={{
            fontWeight: "bold",
          }}
        >
          {params.value + " RON"}
        </div>
      ),
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
      headerName: "",
      width: 150,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <InvoiceMenu
            id={id}
            invoices={invoices}
            handleOpenSnackbar={handleOpenSnackbar}
            setInvoices={setInvoices}
          />
        );
      },
    },
  ];

  const [invoices, setInvoices] = useState<InvoiceEntity[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedInvoices, setSearchedInvoices] = useState<InvoiceEntity[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const fetchSearchResults = async (query: string) => {
    if (query.trim() !== "") {
      const response = await axios.get(
        "http://localhost:8081/api/invoices/search?keyword=" + query
      );
      setSearchedInvoices(response.data);
    } else {
      setSearchedInvoices([]);
    }
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const debouncedFetchSearchResults = debounce(fetchSearchResults, 1);
    debouncedFetchSearchResults(searchText);
  }, [searchText]);

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
    if (createUser === true) {
      handleOpenModal();
    }
    return () => {
      if (setInvoiceFilter && setCreateUser) {
        setInvoiceFilter!(null);
        setCreateUser!(false);
      }
    };
  }, [setInvoiceFilter]);

  return (
    <Box sx={{ width: "80%" }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        sx={{ position: "absolute", bottom: 0, left: 0, padding: "20px" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Factura a fost înregistrata cu success!
        </Alert>
      </Snackbar>
      <ModalAddFacturi
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        facturi={invoices}
        setFacturi={setInvoices}
        handleOpenSnackbar={handleOpenSnackbar}
      />
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
          onClick={handleOpenModal}
        >
          Adauga
        </Button>
      </Box>
      <Box sx={{ mb: "10vh" }}>
        <SearchBar
          handleSearchInputChange={handleSearchInputChange}
          searchText={searchText}
          forWho="factura"
        />
        <Box
          sx={{
            overflowX: "hidden",
            boxShadow: "0 0 16px -8px black",
            borderRadius: "25px",
          }}
        >
          {searchedInvoices && searchText !== "" ? (
            <Euro7DataGrid
              searchText={searchText}
              invoices={searchedInvoices}
              columns={columns}
              searchedInvoices={searchedInvoices}
            />
          ) : (
            <DataGrid
              rows={
                filter === "restante"
                  ? invoices.filter((invoice) => invoice.restDePlata !== 0)
                  : reverseArray(invoices)
              }
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              localeText={roRO.components.MuiDataGrid.defaultProps.localeText}
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
                noResultsOverlay: CustomNoRowsOverlay,
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
          )}
        </Box>
      </Box>
    </Box>
  );
};

function reverseArray<T>(arr: T[]): T[] {
  const reversedArr = [...arr]; // Create a copy of the original array
  const len = reversedArr.length;

  for (let i = 0; i < Math.floor(len / 2); i++) {
    // Swap elements at index i with their corresponding elements from the end
    const temp = reversedArr[i];
    reversedArr[i] = reversedArr[len - 1 - i];
    reversedArr[len - 1 - i] = temp;
  }

  return reversedArr;
}
