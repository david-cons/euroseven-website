import { useEffect, useState } from "react";
import { InvoiceEntity } from "../../types";
import { InvoiceService } from "../../services/InvoiceService";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import axios from "../../axios";

export const UserInvoicesTable = (props: { codClient: number }) => {
  const [invoices, setInvoices] = useState<InvoiceEntity[]>([]);

  const checkoutInvoice = async (invoiceId: number) => {
    axios
      .post(
        "http://localhost:8081/api/checkout/create-checkout-session/" +
          invoiceId
      )
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      });
  };

  useEffect(() => {
    const fetchUserInvoices = async () => {
      await InvoiceService.searchInvoices(props.codClient.toString())
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
      {invoices.length === 0 ? (
        <Typography fontFamily="Catesque">Nici-o factură.</Typography>
      ) : (
        <TableContainer
          component={Box}
          sx={{ mt: "5vh", "& *": { fontFamily: "Catesque" } }}
        >
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="payments table"
          >
            <TableHead>
              <TableRow sx={{ "& *": { fontWeight: "bold" } }}>
                <TableCell>Nr. Factură</TableCell>
                <TableCell align="left">Sumă</TableCell>
                <TableCell align="left">Rest de Plată</TableCell>
                <TableCell align="left">Dată Emitere</TableCell>
                <TableCell align="left">Dată Scadentă</TableCell>
                <TableCell align="center">Descarcă</TableCell>
                <TableCell align="center">Plătește</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow
                  key={invoice.nrFactura}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {invoice.nrFactura}
                  </TableCell>
                  <TableCell align="left">{`${invoice.price} RON`}</TableCell>
                  <TableCell align="left">{`${invoice.restDePlata} RON`}</TableCell>
                  <TableCell align="left">{invoice.created_date}</TableCell>
                  <TableCell align="left">{invoice.due_date}</TableCell>
                  <TableCell align="center">
                    <Button>Descarcă</Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => checkoutInvoice(invoice.id!)}>
                      Plătește
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
