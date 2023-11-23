import { useEffect, useState } from "react";
import { MeterReadingEntity } from "../../types";
import { DataGrid, GridColDef, roRO } from "@mui/x-data-grid";
import moment from "moment";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  Typography,
  debounce,
} from "@mui/material";
import axios from "../../axios";
import { MeterReadingService } from "../../services/MeterReadingService";
import { SearchBar } from "../../components/SearchBar";
import { ModalContorPicture } from "../../components/incasari/Modals/ModalContorPicture";
import { reverseArray } from "../../utils";

export const IncasariContor: React.FC = () => {
  const [meterReadings, setMeterReadings] = useState<MeterReadingEntity[]>([]);

  const [meterReadingId, setMeterReadingId] = useState<number>();
  const [searchedMeterReadings, setSearchedMeterReadings] = useState<
    MeterReadingEntity[]
  >([]);

  const [searchText, setSearchText] = useState<string>("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "serieContor",
      headerName: "Serie Contor",
      width: 150,
    },
    {
      field: "indexVechi",
      headerName: "Index Vechi",
      width: 125,
    },
    {
      field: "indexNou",
      align: "left",
      headerName: "Index Nou",
      width: 125,
    },
    {
      field: "accepted",
    },
    {
      field: "codClient",
      align: "left",
      headerName: "Cod Client",
      width: 125,
    },
    {
      field: "date",
      headerName: "Dată",
      type: "dateTime",
      width: 150,
      valueGetter: (params) => {
        return moment(params.value, "DD/MM/YYYY").toDate();
      },
      renderCell: (params) => {
        return moment(params.value).format("DD/MM/YYYY");
      },
    },
    {
      field: "actions",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: "30px",
              fontFamily: "Catesque",
              backgroundColor: "#0054a6",
            }}
            onClick={() => {
              setMeterReadingId(id);
              handleOpenModal();
            }}
          >
            Poză
          </Button>
        );
      },
    },

    {
      field: "actions1",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        const id = params.row.id;
        const codClient = params.row.codClient;
        const accepted = params.row.accepted;
        return (
          <>
            {!isTrue(accepted) ? (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  height: "30px",
                  fontFamily: "Catesque",
                  backgroundColor: "#0054a6",
                }}
                onClick={() =>
                  handleAprobaContor(Number(id), Number(codClient))
                }
              >
                Aprobă
              </Button>
            ) : null}
          </>
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

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };
  const handleAprobaContor = async (id: number, codClient: number) => {
    await MeterReadingService.acceptMeterReading(id, codClient).then((res) => {
      console.log(res);
      setOpenSnackbar(true);
    });
  };

  const fetchSearchResults = async (query: string) => {
    if (query.trim() !== "") {
      const response = await axios.get(
        "http://localhost:8081/api/meter-readings/search?keyword=" + query
      );
      setSearchedMeterReadings(response.data);
    } else {
      setSearchedMeterReadings([]);
    }
  };

  useEffect(() => {
    const debouncedFetchSearchResults = debounce(fetchSearchResults, 1);
    debouncedFetchSearchResults(searchText);
  }, [searchText]);

  const fetchMeterReadings = async () => {
    await MeterReadingService.getAllMeterReadings()
      .then((res) => {
        setMeterReadings(res);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMeterReadings();
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
          Citire de contor acceptata cu succes!
        </Alert>
      </Snackbar>
      {meterReadingId !== undefined && (
        <ModalContorPicture
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          meterReadingId={meterReadingId}
        />
      )}
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
          Contoare
        </Typography>
      </Box>
      <Box sx={{ mb: "10vh" }}>
        <SearchBar
          handleSearchInputChange={handleSearchInputChange}
          searchText={searchText}
          meterReadings={meterReadings}
          setMeterReadings={setMeterReadings}
          fetchMeterReadings={fetchMeterReadings}
          forWho={"contor"}
        />
        <Box
          sx={{
            overflowX: "hidden",
            boxShadow: "0 0 16px -8px black",
            borderRadius: "25px",
          }}
        >
          <DataGrid
            rows={
              searchText === ""
                ? reverseArray(meterReadings)
                : searchedMeterReadings
            }
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
              columns: {
                columnVisibilityModel: {
                  accepted: false,
                },
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
              "& .MuiDataGrid-columnsContainer": {
                marginLeft: "16px", // Adjust the value as needed
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
function isTrue(value: any): boolean {
  return typeof value === "boolean" && value === true;
}
