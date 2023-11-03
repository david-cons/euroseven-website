import { Box, OutlinedInput, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  InvoiceEntity,
  MeterReadingEntity,
  PaymentEntity,
  UserEntity,
} from "../types";
import { InvoiceService } from "../services/InvoiceService";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { AxiosResponse } from "axios";
import { useState } from "react";
import {
  DatePicker,
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { UserService } from "../services/UserService";
import { MeterReadingService } from "../services/MeterReadingService";

export const SearchBar: React.FC<{
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchText: string;
  forWho: string;
  invoices?: InvoiceEntity[];
  payments?: PaymentEntity[];
  users?: UserEntity[];
  meterReadings?: MeterReadingEntity[];
  setMeterReadings?: React.Dispatch<React.SetStateAction<MeterReadingEntity[]>>;
  fetchMeterReadings?: () => Promise<void>;
  setInvoices?: React.Dispatch<React.SetStateAction<InvoiceEntity[]>>;
  setPayments?: React.Dispatch<React.SetStateAction<PaymentEntity[]>>;
  fetchInvoices?: () => Promise<void>;
  fetchPayments?: () => Promise<void>;
}> = ({
  handleSearchInputChange,
  searchText,
  forWho,
  invoices,
  payments,
  users,
  meterReadings,
  setMeterReadings,
  fetchMeterReadings,
  setInvoices,
  setPayments,
  fetchInvoices,
  fetchPayments,
}) => {
  const [toggle, setToggle] = useState(false);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleExport = async (
    data:
      | InvoiceEntity[]
      | PaymentEntity[]
      | UserEntity[]
      | MeterReadingEntity[]
  ) => {
    if (invoices !== undefined) {
      try {
        const invoicesToExport = data as InvoiceEntity[];
        const axiosResponse = await InvoiceService.exportInvoices(
          invoicesToExport
        );
        createBlob(axiosResponse, "facturi");
      } catch (error) {
        console.error("Error downloading the file:", error);
      }
    } else if (payments !== undefined) {
      try {
        const paymentsToExport = data as PaymentEntity[];
        const axiosResponse = await InvoiceService.exportPayments(
          paymentsToExport
        );
        createBlob(axiosResponse, "plati");
      } catch (error) {
        console.error("Error downloading the file:", error);
      }
    } else if (users !== undefined) {
      try {
        const usersToExport = data as UserEntity[];
        const axiosResponse = await UserService.exportUsers(usersToExport);
        createBlob(axiosResponse, "utilizatori");
      } catch (error) {
        console.error("Error downloading the file:", error);
      }
    } else if (meterReadings !== undefined) {
      try {
        const meterReadingsToExport = data as MeterReadingEntity[];
        const axiosResponse = await MeterReadingService.exportMeterReadings(
          meterReadingsToExport
        );
        createBlob(axiosResponse, "contoare");
      } catch (error) {
        console.error("Error downloading the file:", error);
      }
    }
  };

  const filterData = () => {
    if (invoices && setInvoices) {
      const newInvoices = invoices.filter((invoice) => {
        const invoiceDate = dayjs(invoice.created_date, "DD/MM/YYYY");
        return isDateBetween(invoiceDate, startDate, endDate);
      });
      console.log(newInvoices);
      setInvoices(newInvoices);
    } else if (payments && setPayments) {
      const newPayments = payments.filter((payment) => {
        const paymentDate = dayjs(payment.date, "DD/MM/YYYY");
        return isDateBetween(paymentDate, startDate, endDate);
      });
      console.log(newPayments);
      setPayments(newPayments);
    } else if (meterReadings && setMeterReadings) {
      const newMeterReadings = meterReadings.filter((meterReading) => {
        const meterReadingDate = dayjs(meterReading.date, "DD/MM/YYYY");
        return isDateBetween(meterReadingDate, startDate, endDate);
      });
      console.log(newMeterReadings);
      setMeterReadings(newMeterReadings);
    }
  };

  const resetFilterData = () => {
    if (invoices && fetchInvoices) {
      fetchInvoices();
      setStartDate(dayjs());
      setEndDate(dayjs());
    } else if (payments && fetchPayments) {
      fetchPayments();
      setStartDate(dayjs());
      setEndDate(dayjs());
    } else if (meterReadings && fetchMeterReadings) {
      fetchMeterReadings();
      setStartDate(dayjs());
      setEndDate(dayjs());
    }
  };

  const toggleFilterButton = () => {
    if (toggle === false) {
      setToggle(!toggle);
    } else {
      setToggle(!toggle);
      resetFilterData();
    }
  };

  const isDateBetween = (
    date: dayjs.Dayjs,
    startDate: dayjs.Dayjs,
    endDate: dayjs.Dayjs
  ): boolean => {
    return (
      (date.isAfter(startDate) && date.isBefore(endDate)) ||
      date.isSame(startDate) ||
      date.isSame(endDate)
    );
  };

  const onChangeStartDate = (
    date: Dayjs | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    if (date) {
      setStartDate(date);
    }
  };

  const onChangeEndDate = (
    date: Dayjs | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    if (date) {
      setEndDate(date);
    }
  };

  return (
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
        display: "flex",
        position: "relative",
      }}
    >
      <OutlinedInput
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        placeholder={`Cauta ${forWho}...`}
        sx={{
          height: "5vh",
          mt: "15px",
          ml: "15px",
          width: "40%",
          borderRadius: "20px",
          fontFamily: "Catesque",
        }}
        onInput={handleSearchInputChange}
        value={searchText}
      />
      {forWho !== "utilizator" && (
        <FilterAltIcon
          sx={{
            color: toggle ? "#0054a6" : "black",
            mt: "24px",
            ml: "15px",
            height: "30px",
            width: "30px",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={toggleFilterButton}
        />
      )}
      {toggle && (
        <Box sx={{ display: "flex" }}>
          <DatePicker
            label={"De la Data"}
            value={startDate}
            onChange={onChangeStartDate}
            sx={{
              mt: "24px",
              ml: "15px",
              width: "160px",
              "& .MuiInputBase-input": {
                color: "black", // Text color
                fontFamily: "Catesque", // Font family,
              },
              "& .MuiInputLabel-root": {
                color: "black", // Label color
                fontFamily: "Catesque", // Font family
                fontSize: "18px",
              },
              "& .MuiOutlinedInput-root": {
                height: "30px",
                "& fieldset": {
                  borderColor: "#0054a6", // Border color
                },
                "&:hover fieldset": {
                  borderColor: "#0054a6", // Hover border color
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0054a6", // Focused border color
                },
              },
              "& .MuiInputAdornment-root": {
                color: "#0054a6",
                "& .MuiButtonBase-root": {
                  color: "#0054a6",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                },
              },
            }}
          />
          <DatePicker
            label={"Pana la Data"}
            value={endDate}
            onChange={onChangeEndDate}
            sx={{
              mt: "24px",
              ml: "15px",
              width: "160px",
              "& .MuiInputBase-input": {
                color: "black", // Text color
                fontFamily: "Catesque", // Font family
              },
              "& .MuiInputLabel-root": {
                color: "black", // Label color
                fontFamily: "Catesque", // Font family
                fontSize: "18px",
              },
              "& .MuiOutlinedInput-root": {
                height: "30px",
                "& fieldset": {
                  borderColor: "#0054a6", // Border color
                },
                "&:hover fieldset": {
                  borderColor: "#0054a6", // Hover border color
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0054a6", // Focused border color
                },
              },
              "& .MuiInputAdornment-root": {
                color: "#0054a6",
                "& .MuiButtonBase-root": {
                  color: "#0054a6",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                },
              },
            }}
          />
          <Button
            onClick={filterData}
            variant={"contained"}
            sx={{
              backgroundColor: "#0054a6",
              fontFamily: "Catesque",
              mt: "24px",
              ml: "15px",
              height: "30px",
            }}
          >
            Filtrează
          </Button>
          <Button
            onClick={resetFilterData}
            variant={"outlined"}
            sx={{
              borderColor: "#0054a6",
              color: "#0054a6",
              fontFamily: "Catesque",
              mt: "24px",
              ml: "15px",
              height: "30px",
            }}
          >
            Resetare
          </Button>
        </Box>
      )}
      <FileDownloadIcon
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          padding: "25px",
          transform: "translateY(-50%)",
          color: "#0054a6",
          height: "30px",
          width: "30px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => {
          if (invoices !== undefined) {
            handleExport(invoices);
          } else if (payments !== undefined) {
            handleExport(payments);
          } else if (users !== undefined) {
            handleExport(users);
          } else if (meterReadings !== undefined) {
            handleExport(meterReadings);
          }
        }}
      />
    </Box>
  );
};

const createBlob = (
  axiosResponse: AxiosResponse<any, any>,
  fileName: string
) => {
  const blobData = axiosResponse.data;
  // Create a blob URL
  const blob = new Blob([blobData], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);

  // Use a temporary <a> element to initiate the download
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${fileName}.xlsx`); // Name the download file as 'users.xlsx'
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};
