import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GppGoodIcon from "@mui/icons-material/GppGood";
import GppBadIcon from "@mui/icons-material/GppBad";
import { UserService } from "../../services/UserService";
import { UserEntity } from "../../types";
import { ModalUser } from "./modal/ModalUser";
import { StyledMenu } from "./StyledMenu";

export const UserMenu: React.FC<{
  id: number;
  users: UserEntity[] | null;
  handleOpenSnackbar: () => void;
  setUsers: React.Dispatch<React.SetStateAction<UserEntity[]>> | null;
}> = ({ id, users, handleOpenSnackbar, setUsers }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = React.useState<UserEntity | null>(null);
  const [inactive, setInactive] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateUserInUsersList = (user: UserEntity) => {
    try {
      const allUsers = users;
      if (allUsers && setUsers) {
        const updatedUsers = [...allUsers];

        // Find the index of the user to replace
        const userIndex = updatedUsers.findIndex((u) => u.id === user.id);

        // Replace the user if found
        if (userIndex !== -1) {
          user.inactive = !user.inactive;
          updatedUsers[userIndex] = user;
        }

        // Update the users state using setUsers
        setUsers(updatedUsers);
        handleOpenSnackbar();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    await UserService.deleteUser(id)
      .then(() => {
        if (users && setUsers) {
          setUsers(users.filter((u) => u.id !== id));
          handleOpenSnackbar();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleToggle = async () => {
    const newUser: UserEntity = await UserService.toggleUser(id);
    setInactive(!inactive);
    if (users && setUsers) {
      handleOpenSnackbar();
      newUser.inactive = !newUser.inactive;
      updateUserInUsersList(newUser);
      handleClose();
    }
  };

  React.useEffect(() => {
    const fetchUser = async () => {
      await UserService.getUserById(id)
        .then((res) => {
          setUser(res);
          if (res.inactive) {
            setInactive(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchUser();
  }, [id]);

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
          Editează
        </MenuItem>
        <ModalUser
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          users={users!}
          setUsers={setUsers!}
          user={user!}
          handleOpenSnackbar={handleOpenSnackbar}
          handleClose={handleClose}
        />
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleDelete} disableRipple>
          <DeleteIcon />
          Stergere
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleToggle} disableRipple>
          {inactive ? <GppGoodIcon /> : <GppBadIcon />}
          {inactive ? "Activează" : "Dezactivează"}
        </MenuItem>
      </StyledMenu>
    </div>
  );
};
