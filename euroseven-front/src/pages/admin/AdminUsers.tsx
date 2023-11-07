import AddIcon from "@mui/icons-material/Add";
import { GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { UserMenu } from "../../components/admin/UserMenu";
import { useEffect, useState } from "react";
import { UserEntity } from "../../types";
import { UserService } from "../../services/UserService";
import axios from "../../axios";
import debounce from "lodash.debounce";
import { Euro7DataGrid } from "../../components/admin/Euro7DataGrid";
import { SearchBar } from "../../components/SearchBar";

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<UserEntity[]>([]);
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

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "codClient",
      headerName: "Cod Client",
      width: 175,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "Nume",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <span style={{ color: params.row.inactive ? "grey" : "inherit" }}>
            {params.value}
          </span>
        );
      },
    },
    {
      field: "address",
      headerName: "Adresă",
      width: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "restDePlataTotal",
      headerName: "Rest De Plata",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <div
            style={{
              fontWeight: "bold",
            }}
          >
            {params.value + " RON"}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <UserMenu
            id={id}
            users={users.length > 0 ? users : []}
            handleOpenSnackbar={handleOpenSnackbar}
            setUsers={setUsers}
          />
        );
      },
    },
  ];

  const fetchSearchResults = async (query: string) => {
    if (query.trim() !== "") {
      const response = await axios.get(
        "http:///34.147.113.108:8081/api/users/search?keyword=" + query
      );
      setSearchedUsers(response.data);
    } else {
      setSearchedUsers([]);
    }
  };

  useEffect(() => {
    const debouncedFetchSearchResults = debounce(fetchSearchResults, 1);
    debouncedFetchSearchResults(searchText);
  }, [searchText]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const fetchUsers = async () => {
    await UserService.getAllUsers()
      .then((res) => {
        setUsers(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUsers();
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
          Utilizatorul a fost actualizat cu succes!
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
      <Box sx={{ mb: "10vh" }}>
        <SearchBar
          handleSearchInputChange={handleSearchInputChange}
          searchText={searchText}
          forWho="utilizator"
          users={searchedUsers.length > 0 ? searchedUsers : users}
        />
        <Euro7DataGrid
          searchText={searchText}
          users={users}
          columns={columns}
          searchedUsers={searchedUsers}
        />
      </Box>
    </Box>
  );
};
