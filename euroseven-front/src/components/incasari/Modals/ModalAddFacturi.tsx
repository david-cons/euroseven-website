import React, { useEffect, useState } from "react";
import { InvoiceEntity, UserEntity } from "../../../types";
import { Box, Button, Modal, Typography } from "@mui/material";
import { FormInputDate, FormInputDropdown, FormInputText, IFormInput } from ".";
import { useForm } from "react-hook-form";
import { FormInputUsername } from "./FormInputUsername";
import { FormInputFile } from "./FormInputFile";
import { InvoiceService } from "../../../services/InvoiceService";

const defaultValues = {
  textValue: "",
  userNameValue: "",
  dateValue: new Date(),
  dropdownValue: "",
  fileValue: undefined,
};

export const ModalAddFacturi: React.FC<{
  openModal: boolean;
  handleCloseModal: () => void;
  facturi?: InvoiceEntity[];
  setFacturi?: React.Dispatch<React.SetStateAction<InvoiceEntity[]>>;
  handleOpenSnackbar: () => void;
}> = ({
  openModal,
  handleCloseModal,
  facturi,
  setFacturi,
  handleOpenSnackbar,
}) => {
  const { handleSubmit, reset, control, setValue, getValues } =
    useForm<IFormInput>({
      defaultValues: defaultValues,
    });

  const [user, setUser] = useState<UserEntity | undefined>();

  const formatDate = (date: Date | null): string => {
    if (date === null) return "";
    let dateObject = new Date(date);
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const year = String(dateObject.getFullYear()); // Get the last two digits of the year.

    return `${day}/${month}/${year}`;
  };

  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    const created_date = formatDate(getValues("dateValue"));
    const price = Number(getValues("textValue"));
    const codClient = Number(getValues("dropdownValue"));
    const file = "";
    InvoiceService.createInvoice({
      created_date: created_date,
      price: price,
      file: file,
      codClient: codClient,
    }).then((res) => {
      console.log(res);
      setFacturi!([...facturi!, res]);
      handleOpenSnackbar();
      handleCloseModal();
    });
  };

  useEffect(() => {
    setValue("userNameValue", user?.name!);
  }, [user]);

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
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
          Înregistrează Factură
        </Typography>

        <FormInputDropdown
          name="dropdownValue"
          control={control}
          label="Dropdown Input"
          user={user}
          setUser={setUser}
        />

        <FormInputUsername
          name="userNameValue"
          user={user}
          control={control}
          label="Nume"
        />

        <FormInputText name="textValue" control={control} label="Text Input" />
        <FormInputDate label="Dată" name="dateValue" control={control} />
        <FormInputFile
          name="fileValue"
          control={control}
          label="Data Facturii"
        />

        <Button
          onClick={handleSubmit(onSubmit)}
          variant={"contained"}
          sx={{ backgroundColor: "#0054a6", fontFamily: "Catesque" }}
        >
          Înregistrează factură
        </Button>
        <Button
          onClick={() => {
            reset({
              textValue: "",
              dateValue: new Date(),
              dropdownValue: "",
            });
            setUser(undefined);
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
