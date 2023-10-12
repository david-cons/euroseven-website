import { useEffect, useState } from "react";
import { InvoiceService } from "../../services/InvoiceService";
import { PaymentEntity } from "../../types";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
} from "@mui/material";

export const RecentPaymentsTable = (props: { codClient: number }) => {
  const { codClient } = props;

  const [recentPayments, setRecentPayments] = useState<PaymentEntity[]>([]);

  useEffect(() => {
    const fetchRecentPayments = async () => {
      await InvoiceService.getLastPaymentsByCodClient(codClient)
        .then((res) => {
          setRecentPayments(res);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchRecentPayments();
  }, []);

  return (
    <Box>
      {recentPayments.length === 0 ? (
        <Typography fontFamily="Catesque">Nici-o plată.</Typography>
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
                <TableCell align="center">Dată</TableCell>
                <TableCell align="left">Metodă de Plată</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentPayments.map((payment) => (
                <TableRow
                  key={payment.nrFactura}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {payment.nrFactura}
                  </TableCell>
                  <TableCell align="left">{`${payment.amount} RON`}</TableCell>
                  <TableCell align="center">{payment.date}</TableCell>
                  <TableCell align="left">{payment.paymentMethod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
