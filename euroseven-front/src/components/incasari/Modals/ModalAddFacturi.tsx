import React, { useEffect, useState } from "react";
import { InvoiceEntity, UserEntity } from "../../../types";
import { Box, Button, Modal, Typography } from "@mui/material";
import { FormInputDate, FormInputDropdown, FormInputText } from ".";
import { useForm } from "react-hook-form";
import { FormInputUsername } from "./FormInputUsername";
import { FormInputFile } from "./FormInputFile";
import { InvoiceService } from "../../../services/InvoiceService";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultValues = {
  textValue: "",
  userNameValue: "",
  dateValue: new Date(),
  dropdownValue: "",
  fileValue: undefined,
  indexNouValue: "",
};

export interface IFormInput {
  textValue: string;
  userNameValue: string;
  dateValue: Date;
  dropdownValue: string;
  fileValue?: File | undefined;
  indexNouValue: string;
}

const validationSchema = yup
  .object({
    textValue: yup.string().required("Suma trebuie introdusa!"),
    userNameValue: yup.string().required("Numele clientului trebuie completat"),
    dateValue: yup.date().required("Data trebuie completata"),
    dropdownValue: yup.string().required("Codul client trebuie ales!"),
    indexNouValue: yup.string().required("Indexul nou trebuie completat!"),
  })
  .required();

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
      resolver: yupResolver(validationSchema),
      defaultValues: defaultValues,
    });

  const [user, setUser] = useState<UserEntity | undefined>();
  const [file, setFile] = useState<string>("");

  const handleCloseAndReset = () => {
    handleCloseModal();
    reset({
      textValue: "",
      dateValue: new Date(),
      dropdownValue: "",
      indexNouValue: "",
    });
    setUser(undefined);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onloadend = function () {
      const base64String = reader.result
        ?.toString()
        .replace(/^data:.+;base64,/, "");
      setFile(base64String!);
    };

    reader.readAsDataURL(file);
  };

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
    const indexNou = Number(getValues("indexNouValue"));
    const localitate = checkLocalitate(getValues("dropdownValue"));
    InvoiceService.createInvoice({
      created_date: created_date,
      price: price,
      file: file,
      location: localitate,
      codClient: codClient,
      indexNou: indexNou,
    }).then((res) => {
      console.log(res);
      setFacturi!([...facturi!, res]);
      reset({
        textValue: "",
        dropdownValue: "",
        dateValue: new Date(),
        fileValue: undefined,
        indexNouValue: "",
      });
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

        <FormInputText name="textValue" control={control} label="Sumă" />
        <FormInputText
          name="indexNouValue"
          control={control}
          label="Index Nou"
        />
        <FormInputDate label="Dată" name="dateValue" control={control} />
        <FormInputFile
          name="fileValue"
          control={control}
          label="Data Facturii"
          handleFileChange={handleFileChange}
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

function checkLocalitate(str: string): string {
  if (/^[1-4]/.test(str)) {
    return "SB";
  } else if (/^5/.test(str)) {
    return "BD";
  } else {
    return "BD";
  }
}
