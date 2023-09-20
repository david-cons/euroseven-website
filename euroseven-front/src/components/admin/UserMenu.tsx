import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GppGoodIcon from "@mui/icons-material/GppGood";
import GppBadIcon from "@mui/icons-material/GppBad";
import { UserService } from "../../services/UserService";
import { InvoiceEntity, UserEntity } from "../../types";
import { InvoiceService } from "../../services/InvoiceService";
import {
  Alert,
  Box,
  Grid,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export const UserMenu = (props: {
  id: number;
  forUser: boolean;
  users: UserEntity[] | null;
  handleOpenSnackbar: () => void;
  setUsers: React.Dispatch<React.SetStateAction<UserEntity[]>> | null;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = React.useState<UserEntity | null>(null);
  const [invoice, setInvoice] = React.useState<InvoiceEntity | null>(null);
  const [inactive, setInactive] = React.useState<boolean>(false);
  const [nume, setNume] = React.useState<string | undefined>("");
  const [prenume, setPrenume] = React.useState<string | undefined>("");
  const [address, setAddress] = React.useState<string | undefined>("");
  const [telefon, setTelefon] = React.useState<string | undefined>("");
  const [localitate, setLocalitate] = React.useState<string | undefined>("");
  const [username, setUsername] = React.useState<string | undefined>("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const open = Boolean(anchorEl);

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changePrenume = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrenume(event.target.value);
  };

  const changeNume = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNume(event.target.value);
  };

  const changeTelefon = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTelefon(event.target.value);
  };

  const changeLocalitate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalitate(event.target.value);
  };

  const changeAdresa = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const updateUserInUsersList = (user: UserEntity) => {
    try {
      const users = props.users;
      if (users && props.setUsers) {
        const updatedUsers = [...users];

        // Find the index of the user to replace
        const userIndex = updatedUsers.findIndex((u) => u.id === user.id);

        // Replace the user if found
        if (userIndex !== -1) {
          user.inactive = !user.inactive;
          updatedUsers[userIndex] = user;
        }


        // Update the users state using setUsers
        props.setUsers(updatedUsers);
        props.handleOpenSnackbar();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    props.forUser
      ? await UserService.deleteUser(props.id)
          .then((res) => {
            if (props.users && props.setUsers) {
              props.setUsers(props.users.filter((u) => u.id !== props.id));
              props.handleOpenSnackbar();
            }
          })
          .catch((error) => {
            console.log(error);
            props.handleOpenSnackbar();
          })
      : await InvoiceService.deleteInvoice(props.id)
          .then((res) => {
            console.log(res);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
  };

  const handleToggle = async () => {
    const newUser: UserEntity = await UserService.toggleUser(props.id);
    setInactive(!inactive);
    if (props.users && props.setUsers) {
      newUser.inactive = !newUser.inactive;
      updateUserInUsersList(newUser);
      handleClose();
    }
  };

  const handleSubmitUpdateUser = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const name = `${prenume} ${nume}`;
    UserService.updateUser(user?.id, name, address, localitate, telefon).then(
      (res) => {
        setOpenSnackbar(true);
        try {
          const users = props.users;
          if (users && props.setUsers) {
            const updatedUsers = [...users];

            // Find the index of the user to replace
            const userIndex = updatedUsers.findIndex((u) => u.id === user?.id);

            // Replace the user if found
            if (userIndex !== -1 && user) {
              user.name = name;
              user.address = address;
              user.localitate = localitate;
              user.phone = telefon;
              updatedUsers[userIndex] = user;
            }


            // Update the users state using setUsers
            props.setUsers(updatedUsers);
            props.handleOpenSnackbar();
          }
        } catch (e) {
          console.log(e);
        }
        console.log(res);
      }
    );
  };

  React.useEffect(() => {
    const fetchUser = async () => {
      await UserService.getUserById(props.id)

        .then((res) => {
          setUser(res);
          if (res.inactive) {
            setInactive(true);
          }
          const parts = res?.name?.split(" ");
          if (parts) {
            const firstName = parts[0];
            const lastName = parts.slice(1).join(" ");
            setPrenume(firstName);
            setNume(lastName);
          }
          setUsername(res?.username);
          setTelefon(res?.phone);
          setLocalitate(res?.localitate);
          setAddress(res?.address);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchUser();
  }, [props.forUser === true]);

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          height: "30px",
          fontFamily: "Catesque",
          backgroundColor: "#0054a6",
        }}
      >
        Opțiuni
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenModal} disableRipple>
          <EditIcon />
          {props.forUser ? "Editează" : "Vezi detalii"}
        </MenuItem>
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {`Detalii ${
                props.forUser ? `${user?.name}` : `Nr. ${invoice?.nrFactura}`
              }`}
            </Typography>
            <Box>
              <form onSubmit={handleSubmitUpdateUser}>
                <Box sx={{ mt: "5vh" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        name={"prenume"}
                        id={"prenume"}
                        size={"small"}
                        label={"Prenume"}
                        value={prenume}
                        onChange={changePrenume}
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
                        value={nume}
                        onChange={changeNume}
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
                        value={username}
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
                        value={telefon}
                        onChange={changeTelefon}
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
                        value={localitate}
                        onChange={changeLocalitate}
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
                        value={address}
                        onChange={changeAdresa}
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
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleDelete} disableRipple>
          <DeleteIcon />
          Stergere
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        {props.forUser ? (
          <MenuItem onClick={handleToggle} disableRipple>
            {inactive ? <GppGoodIcon /> : <GppBadIcon />}
            {inactive ? "Activează" : "Dezactivează"}
          </MenuItem>
        ) : null}
      </StyledMenu>
    </div>
  );
};
