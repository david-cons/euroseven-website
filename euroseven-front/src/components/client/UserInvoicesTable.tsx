import { useEffect, useState } from "react";
import { InvoiceEntity } from "../../types";
import { InvoiceService } from "../../services/InvoiceService";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import axios from "../../axios";
import { reverseArray } from "../../utils";
import { InvoiceElement } from "./InvoiceElement";
import { TablePagination } from "@mui/material";

export const UserInvoicesTable = (props: {
  codClient: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
}) => {
  const [invoices, setInvoices] = useState<InvoiceEntity[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const checkoutInvoice = async (invoiceId: number) => {
    axios
      .post(
        "http:///34.147.113.108:8081/api/checkout/create-checkout-session/" +
          invoiceId
      )
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      });
  };

  const handleDownload = async (nrFactura: number) => {
    try {
      const axiosResponse = await InvoiceService.downloadInvoice(
        `factura-${nrFactura}`
      );
      const blobData = axiosResponse.data;
      // Create a blob URL
      const blob = new Blob([blobData], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      // Use a temporary <a> element to initiate the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `factura-${nrFactura}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    } catch (error: any) {
      console.error("Error downloading the invoice:", error);
      if (error.response && error.response.status === 404) {
        alert("Invoice not found");
      }
    }
  };

  useEffect(() => {
    const fetchUserInvoices = async () => {
      await InvoiceService.getAllInvoicesByCodClient(props.codClient)
        .then((res) => {
          setInvoices(res);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchUserInvoices();
  }, []);

  return (
    <Box>
      <TableContainer
        component={Box}
        sx={{ mt: "4vh", "& *": { fontFamily: "Catesque" } }}
      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="payments table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "white" }}>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  width: "250px",
                  fontStyle: "italic",
                  fontFamily: "Catesque",
                }}
                align="left"
              >
                Descriere
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  width: "100px",
                  fontStyle: "italic",
                  fontFamily: "Catesque",
                }}
                align="left"
              >
                Dată
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  width: "100px",
                  fontStyle: "italic",
                  fontFamily: "Catesque",
                }}
                align="left"
              >
                Nr. Factură
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  width: "100px",
                  fontStyle: "italic",
                  fontFamily: "Catesque",
                }}
                align="left"
              >
                Sumă
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  width: "100px",
                  fontStyle: "italic",
                  fontFamily: "Catesque",
                }}
                align="left"
              >
                Rest de Plată
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  width: "200px",
                  fontStyle: "italic",
                  fontFamily: "Catesque",
                }}
                align="left"
              >
                Acțiuni
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices &&
              reverseArray(invoices)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell component="th" scope="row">
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "center",
                          alignItems: "center",
                          fontFamily: "Catesque",
                          fontWeight: "bold",
                          mt: "5px",
                        }}
                        onClick={() =>
                          handleDownload(Number(invoice.nrFactura))
                        }
                      >
                        <InvoiceElement
                          color={invoice.paid === true ? "#0054a6" : "red"}
                        />
                        {`Factură ${invoice.created_date!.substring(3)}`}
                      </Box>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontFamily: "Catesque" }}
                    >{`${invoice.due_date}`}</TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontFamily: "Catesque" }}
                    >{`${invoice.nrFactura}`}</TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontFamily: "Catesque" }}
                    >{`${invoice.price} RON`}</TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontFamily: "Catesque" }}
                    >{`${invoice.restDePlata} RON`}</TableCell>
                    <TableCell align="left">
                      <Box
                        sx={{
                          display: "flex",
                          float: "left",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() =>
                            handleDownload(Number(invoice.nrFactura))
                          }
                          sx={{
                            fontFamily: "Catesque",
                            mr: "15px",
                            width: "100px",
                            background: "#0054a6",
                            color: "white",
                            "&:hover": {
                              background: "#0054a6",
                              color: "white",
                            },
                          }}
                        >
                          Descarcă
                        </Button>
                        {invoice.paid !== true && (
                          <>
                            <Button
                              variant="outlined"
                              onClick={() => checkoutInvoice(invoice.id!)}
                              sx={{
                                fontFamily: "Catesque",
                                width: "100px",
                                background: "#0054a6",
                                color: "white",
                                position: "relative",
                                zIndex: 1,
                                transition: "transform 0.3s ease",
                                "&:hover": {
                                  transform: "translateY(5px)",
                                  background: "#0054a6",
                                  color: "white",
                                },
                              }}
                            >
                              Plătește
                            </Button>
                            <Box
                              sx={{
                                content: '""',
                                position: "absolute",
                                bottom: -4,
                                right: "6%",
                                width: "35%",
                                height: "6px",
                                background: "#01386e",
                                zIndex: "0",
                                borderRadius: "3px",
                              }}
                            />
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
          <TablePagination
            component="div"
            count={invoices.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5]}
            sx={{
              fontFamily: "Catesque",
            }}
          />
        </Table>
      </TableContainer>
    </Box>
  );
};
