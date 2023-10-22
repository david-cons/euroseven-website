import React, { useEffect } from "react";
import { UserEntity } from "../../../types";
import { useForm } from "react-hook-form";
import { Modal, Box, Typography, Button } from "@mui/material";
import { InputFormText } from "./InputFormText";
import { InputFormAutocomplete } from "./InputFormAutocomplete";
import { UserService } from "../../../services/UserService";

export interface IUserFormInput {
  prenumeValue: string;
  numeValue: string;
  emailValue: string;
  telefonValue: string;
  judetValue: string;
  localitateValue: string;
  adresaValue: string;
}

const defaultValues = {
  prenumeValue: "",
  numeValue: "",
  emailValue: "",
  telefonValue: "",
  judetValue: "",
  localitateValue: "",
  adresaValue: "",
};

export const ModalUser: React.FC<{
  openModal: boolean;
  handleCloseModal: () => void;
  users: UserEntity[];
  setUsers: React.Dispatch<React.SetStateAction<UserEntity[]>>;
  user?: UserEntity;
  handleOpenSnackbar: () => void;
  handleClose: () => void;
}> = ({
  openModal,
  handleCloseModal,
  users,
  setUsers,
  user,
  handleOpenSnackbar,
  handleClose,
}) => {
  const { handleSubmit, reset, control, setValue } = useForm<IUserFormInput>({
    defaultValues: defaultValues,
  });

  const handleCloseAndReset = () => {
    handleCloseModal();
    handleClose();
    reset({
      prenumeValue: user?.name?.split(" ")[0],
      numeValue: user?.name?.split(" ").slice(1).join(" "),
      emailValue: user?.username,
      telefonValue: user?.phone!,
      judetValue: user?.judet!,
      localitateValue: user?.localitate!,
      adresaValue: user?.address!,
    });
  };

  const onSubmit = async (data: IUserFormInput) => {
    console.log(data);
    const prenume = data.prenumeValue;
    const nume = data.numeValue;
    const name = `${prenume} ${nume}`;
    const userId = user?.id;
    const address = data.adresaValue;
    const judet = data.judetValue;
    const localitate = data.localitateValue;
    const telefon = data.telefonValue;

    await UserService.updateUser(
      userId,
      name,
      address,
      judet,
      localitate,
      telefon
    ).then((res) => {
      try {
        const allUsers = users;
        if (allUsers && setUsers) {
          const updatedUsers = [...allUsers];

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
          setUsers(updatedUsers);
          handleOpenSnackbar();
          handleClose();
          handleCloseModal();
        }
      } catch (e) {
        console.log(e);
      }
      console.log(res);
    });
  };

  useEffect(() => {
    if (user) {
      const parts = user?.name?.split(" ");
      if (parts) {
        const firstName = parts[0];
        const lastName = parts.slice(1).join(" ");
        setValue("prenumeValue", firstName);
        setValue("numeValue", lastName);
      }
      setValue("emailValue", user.username);
      setValue("telefonValue", user.phone!);
      setValue("judetValue", user.judet!);
      setValue("localitateValue", user.localitate!);
      setValue("adresaValue", user.address!);
    }
  }, [user, setValue]);

  return (
    <Modal
      open={openModal}
      onClose={handleCloseAndReset}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "grid",
          gridRowGap: "20px",
          padding: "50px",
          margin: "10px 300px",
          position: "absolute" as "absolute",
          top: "40%",
          left: "40%",
          transform: "translate(-50%, -50%)",
          width: "100vh",
          minHeight: "50vh",
          bgcolor: "background.paper",
          boxShadow: 24,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontFamily="Catesque" sx={{ mb: "5vh" }}>
          Modifică Utilizator
        </Typography>

        <InputFormText
          name="prenumeValue"
          control={control}
          label="Prenume"
          disabled={false}
          textFieldName="prenume"
        />
        <InputFormText
          name="numeValue"
          control={control}
          label="Nume"
          disabled={false}
          textFieldName="nume"
        />
        <InputFormText
          name="emailValue"
          control={control}
          label="Email"
          disabled={true}
          textFieldName="email"
        />
        <InputFormText
          name="telefonValue"
          control={control}
          label="Telefon"
          disabled={false}
          textFieldName="telefon"
        />
        <InputFormAutocomplete
          name1="judetValue"
          name2="localitateValue"
          control={control}
          label1="Județ"
          label2="Localitate"
          setValue={setValue}
        />
        <InputFormText
          name="adresaValue"
          control={control}
          label="Adresă"
          textFieldName="adresa"
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          variant={"contained"}
          sx={{ backgroundColor: "#0054a6", fontFamily: "Catesque" }}
        >
          Saleavază
        </Button>
        <Button
          onClick={() => {
            reset({
              prenumeValue: user?.name?.split(" ")[0],
              numeValue: user?.name?.split(" ").slice(1).join(" "),
              emailValue: user?.username,
              telefonValue: user?.phone!,
              judetValue: user?.judet!,
              localitateValue: user?.localitate!,
              adresaValue: user?.address!,
            });
          }}
          variant={"outlined"}
          sx={{
            borderColor: "#0054a6",
            color: "#0054a6",
            fontFamily: "Catesque",
          }}
        >
          Resetare
        </Button>
      </Box>
    </Modal>
  );
};
