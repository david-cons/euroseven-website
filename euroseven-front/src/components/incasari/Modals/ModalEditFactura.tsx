import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { InvoiceEntity } from "../../../types";
import { FormInputDropdown } from "./FormInputDropdown";
import { FormInputText } from "./FormInputText";
import { UserService } from "../../../services/UserService";
import { FormInputUsername } from "./FormInputUsername";
import { FormInputDate } from "./FormInputDate";
import { InvoiceService } from "../../../services/InvoiceService";

export interface IEditInvoiceForm {
  dateValue: Date;
  price: string;
  file: string;
  codClient: string;
  nrFactura: string;
  userName: string;
}

const defaultValues = {
  dateValue: new Date(),
  price: "",
  file: "",
  codClient: "",
  nrFactura: "",
  userName: "",
};

export const ModalEditFactura: React.FC<{
  invoice: InvoiceEntity;
  invoices: InvoiceEntity[];
  openModal: boolean;
  handleCloseModal: () => void;
  handleOpenSnackbar: () => void;
  setInvoices?: React.Dispatch<React.SetStateAction<InvoiceEntity[]>> | null;
}> = ({
  invoice,
  openModal,
  handleCloseModal,
  handleOpenSnackbar,
  setInvoices,
  invoices,
}) => {
  const { handleSubmit, reset, control, setValue, getValues } =
    useForm<IEditInvoiceForm>({
      defaultValues: defaultValues,
    });

  useEffect(() => {
    const fillForm = async () => {
      if (invoice) {
        await UserService.getUserByCodClient(invoice.codClient!).then((res) =>
          setValue("userName", res.name!)
        );
        setValue("dateValue", new Date(invoice.created_date!));
        setValue("codClient", invoice.codClient!.toString());
        setValue("price", invoice.price!.toString());
        setValue("nrFactura", invoice.nrFactura!.toString());
        setValue("file", invoice.file!);
      }
    };
    fillForm();
  }, []);

  const formatDate = (date: Date | null): string => {
    if (date === null) return "";
    let dateObject = new Date(date);
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const year = String(dateObject.getFullYear()); // Get the last two digits of the year.

    return `${day}/${month}/${year}`;
  };

  const updateInvoiceInInvoiceList = (invoice: InvoiceEntity) => {
    try {
      const allInvoices = invoices;
      if (allInvoices && setInvoices) {
        const updatedInvoices = [...allInvoices];

        const invoiceIndex = updatedInvoices.findIndex(
          (i) => i.id === invoice.id
        );

        if (invoiceIndex !== -1) {
          invoice.created_date = formatDate(getValues("dateValue"));
          invoice.price = Number(getValues("price"));
          invoice.file = getValues("file");
          updatedInvoices[invoiceIndex] = invoice;
        }

        setInvoices(updatedInvoices);
        handleOpenSnackbar();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (data: IEditInvoiceForm) => {
    const created_date = formatDate(getValues("dateValue"));
    const file = getValues("file");
    const price = Number(getValues("price"));
    InvoiceService.updateInvoice(invoice.id!, created_date, price, file).then(
      (res) => {
        console.log(res);
        updateInvoiceInInvoiceList(res);
        handleOpenSnackbar();
        handleCloseModal();
      }
    );
  };

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
          Editează Factură
        </Typography>

        <FormInputDropdown
          name="codClient"
          control={control}
          label="Cod Client"
          disabled={true}
        />
        <FormInputUsername name="userName" control={control} label="Nume" />
        <FormInputUsername
          name="nrFactura"
          control={control}
          label="Nr Factură"
          disabled={true}
        />
        <FormInputText name="price" control={control} label="Sumă" />
        <FormInputDate name="dateValue" control={control} label="Data" />
        <Button
          onClick={handleSubmit(onSubmit)}
          variant={"contained"}
          sx={{ backgroundColor: "#0054a6", fontFamily: "Catesque" }}
        >
          Salvează factură
        </Button>
        <Button
          onClick={() => {
            reset({
              dateValue: new Date(invoice.created_date!),
              price: invoice.price!.toString(),
              file: invoice.file!,
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
