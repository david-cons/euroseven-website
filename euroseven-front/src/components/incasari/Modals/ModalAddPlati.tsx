import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Box, Button, FormLabel, Modal, Typography } from "@mui/material";

import {
  FormInputDropdown,
  FormInputMultiCheckbox,
  FormInputText,
  IFormInput,
} from ".";
import { FormInputUsername } from "./FormInputUsername";
import { PaymentEntity, UserEntity } from "../../../types";
import { InvoiceService } from "../../../services/InvoiceService";
import { UserService } from "../../../services/UserService";
const defaultValues = {
  textValue: "",
  userNameValue: "",
  checkboxValue: [],
  dropdownValue: "",
};
export const ModalAddPlati: React.FC<{
  openModal: boolean;
  handleCloseModal: () => void;
  incasariId?: number | undefined;
  payments?: PaymentEntity[];
  setPayments?: React.Dispatch<React.SetStateAction<PaymentEntity[]>>;
  handleOpenSnackbar: () => void;
}> = ({
  openModal,
  handleCloseModal,
  incasariId,
  payments,
  setPayments,
  handleOpenSnackbar,
}) => {
  const { handleSubmit, reset, control, setValue, getValues } =
    useForm<IFormInput>({
      defaultValues: defaultValues,
    });

  const [nrFacturi, setNrFacturi] = useState<string[]>([]);
  const [sume, setSume] = useState<string[]>([]);
  const [user, setUser] = useState<UserEntity | undefined>();
  const [dates, setDates] = useState<string[]>([]);

  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    const numarFacturi = getValues("checkboxValue").map((nrFactura) =>
      Number(nrFactura)
    );
    const amount = Number(getValues("textValue"));
    let remainingAmount = amount ? amount : 0;
    const userId = user?.id;
    const paymentMethod = "cash"; // ???

    for (let i = 0; i < numarFacturi.length; i++) {
      const invoice = await InvoiceService.getInvoiceByNrFactura(
        numarFacturi[i]
      );
      if (invoice) {
        await InvoiceService.registerPayment({
          amount:
            remainingAmount >= invoice.restDePlata!
              ? invoice.restDePlata
              : remainingAmount,
          userId: userId,
          nrFactura: numarFacturi[i],
          incasariId: incasariId,
          paymentMethod: paymentMethod,
        }).then((res) => {
          console.log(res);
          if (res.amount === remainingAmount) {
            // alert("Amount is less than invoice with nr. " + nrFacturi[i]);
            i = nrFacturi.length;
          }
          setPayments!([...payments!, res]);
          remainingAmount -= invoice.restDePlata!;
          reset({
            textValue: "",
            checkboxValue: [],
            dropdownValue: "",
            userNameValue: "",
          });
        });
      }
    }

    if (remainingAmount > 0) {
      await UserService.addSaldoToUser(userId!, {
        amount: remainingAmount,
      }).then((res) => {
        console.log(res);
      });
    }
    console.log(remainingAmount);
    handleOpenSnackbar();
    handleCloseModal();
  };

  useEffect(() => {
    setValue("userNameValue", user?.name!);
    console.log(nrFacturi);
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
          padding: "25px",
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
          Înregistrează Plată
        </Typography>
        <FormInputDropdown
          name="dropdownValue"
          control={control}
          label="Dropdown Input"
          nrFacturi={nrFacturi}
          setNrFacturi={setNrFacturi}
          sume={sume}
          setSume={setSume}
          user={user}
          setUser={setUser}
          dates={dates}
          setDates={setDates}
        />
        {nrFacturi.length > 0 && (
          <FormInputMultiCheckbox
            control={control}
            setValue={setValue}
            name={"checkboxValue"}
            label={"Facturi Restante"}
            nrFacturi={nrFacturi}
            setNrFacturi={setNrFacturi}
            sume={sume}
            setSume={setSume}
            dates={dates}
            setDates={setDates}
          />
        )}
        {nrFacturi.length === 0 && user !== undefined && (
          <Typography fontFamily={"Catesque"}>
            Nu există facturi restante
          </Typography>
        )}
        <FormInputText name="textValue" control={control} label="Text Input" />
        <FormInputUsername
          name="userNameValue"
          control={control}
          label="Nume"
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          variant={"contained"}
          sx={{ backgroundColor: "#0054a6", fontFamily: "Catesque" }}
        >
          Înregistrează plată
        </Button>
        <Button
          onClick={() => {
            reset({
              textValue: "",
              radioValue: "",
              checkboxValue: [],
              dateValue: new Date(),
              dropdownValue: "",
              sliderValue: 0,
            });
            setNrFacturi([]);
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
