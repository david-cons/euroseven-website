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
import { useEffect, useState } from "react";
import { PaymentEntity, UserEntity } from "../../types";
import { InvoiceService } from "../../services/InvoiceService";
import axios from "../../axios";
import { SearchBar } from "../../components/SearchBar";
import { Euro7DataGrid } from "../../components/admin/Euro7DataGrid";
import { ModalAddPlati } from "../../components/incasari/Modals";
import { PaymentMenu } from "../../components/incasari/PaymentMenu";
import { roRO } from "@mui/x-data-grid";
import moment from "moment";

export const IncasariPlati: React.FC<{
  incasariId: number | undefined;
  createPayment?: boolean;
  setCreatePayment: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ incasariId, createPayment, setCreatePayment }) => {
  const [payments, setPayments] = useState<PaymentEntity[]>([]);

  const [openModal, setOpenModal] = useState(false);

  const [searchText, setSearchText] = useState<string>("");
  const [searchedPayments, setSearchedPayments] = useState<PaymentEntity[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "date",
      headerName: "Data Plata",
      type: "dateTime",
      width: 150,
      headerClassName: "super-app-theme--header",
      valueGetter: (params) => {
        return moment(params.value, "DD/MM/YYYY HH:mm").toDate();
      },
      renderCell: (params) => {
        return moment(params.value).format("DD/MM/YYYY HH:mm");
      },
    },
    {
      field: "codClient",
      headerName: "Cod Client",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "userName",
      headerName: "Nume",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "nrFactura",
      headerName: "Nr. Factura",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "amount",
      headerName: "Suma",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div
          style={{
            color: params.value === 0 ? "green" : "green",
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
          <PaymentMenu
            id={id}
            payments={payments}
            setPayments={setPayments}
            handleOpenSnackbar={handleOpenSnackbar}
          />
        );
      },
    },
  ];
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
        "http://localhost:8081/api/invoices/payments/search?keyword=" + query
      );
      setSearchedPayments(response.data);
    } else {
      setSearchedPayments([]);
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
    const fetchPayments = async () => {
      await InvoiceService.getAllPayments()
        .then((res) => {
          setPayments(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchPayments();
    if (createPayment === true) {
      handleOpenModal();
    }
    return () => {
      setCreatePayment(false);
    };
  }, []);

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
          Plata a fost înregistrata cu success!
        </Alert>
      </Snackbar>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: "8vh",
          textAlign: "left",
        }}
      >
        {openModal && (
          <Box sx={{ position: "absolute", top: "70%", right: "1%" }}>
            <ModalAddPlati
              openModal={openModal}
              handleCloseModal={handleCloseModal}
              incasariId={incasariId}
              payments={payments}
              setPayments={setPayments}
              handleOpenSnackbar={handleOpenSnackbar}
            />
          </Box>
        )}
        <Typography
          fontFamily={"Catesque"}
          fontWeight={"bold"}
          fontSize={"32px"}
        >
          Plați
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
          forWho="plata"
        />
        <Box
          sx={{
            overflowX: "hidden",
            boxShadow: "0 0 16px -8px black",
            borderRadius: "25px",
          }}
        >
          {searchedPayments && searchText !== "" ? (
            <Euro7DataGrid
              searchText={searchText}
              payments={payments}
              columns={columns}
              searchedPayments={searchedPayments}
            />
          ) : (
            <DataGrid
              rows={reverseArray(payments)}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              localeText={roRO.components.MuiDataGrid.defaultProps.localeText}
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
