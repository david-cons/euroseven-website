import {
  Alert,
  Box,
  Button,
  Grid,
  InputAdornment,
  Modal,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { UserMenu } from "../../components/admin/UserMenu";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { InvoiceEntity, PaymentEntity } from "../../types";
import { InvoiceService } from "../../services/InvoiceService";

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
    field: "userName",
    headerName: "Nume",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "invoiceId",
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

export const IncasariPlati: React.FC = () => {
  const [payments, setPayments] = useState<PaymentEntity[]>([]);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
  }, []);

  return (
    <Box sx={{ width: "80%" }}>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vh",
            height: "40vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Catesque",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Înregistrează Plată
          </Typography>
          <Box>
            {/* <form onSubmit={handleSubmitUpdateUser}> */}
            <form>
              <Box sx={{ mt: "5vh" }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      name={"prenume"}
                      id={"prenume"}
                      size={"small"}
                      label={"Prenume"}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#0054a6", // Border color when hovered
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name={"nume"}
                      id={"nume"}
                      size={"small"}
                      label={"Nume"}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#0054a6", // Border color when hovered
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      disabled
                      name={"username"}
                      id={"username"}
                      size={"small"}
                      label={"Email"}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#0054a6", // Border color when hovered
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name={"phone"}
                      id={"phone"}
                      size={"small"}
                      label={"Telefon"}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#0054a6", // Border color when hovered
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id={"localitate"}
                      name={"localitate"}
                      size={"small"}
                      label={"Localitate"}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#0054a6", // Border color when hovered
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id={"address"}
                      size={"small"}
                      label={"Adresa"}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#0054a6", // Border color when hovered
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Button
                variant={"contained"}
                sx={{
                  backgroundColor: "#0054a6",
                  "&:hover": {
                    backgroundColor: "#0054a6",
                    color: "white",
                  },
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                  width: "175px",
                  mb: "10px",
                  mr: "20px",
                }}
                type="submit"
              >
                Salveaza
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>
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
            rows={payments}
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
