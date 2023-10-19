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

export const RecentPaymentsTable = (props: {
  recentPayments: PaymentEntity[] | null;
}) => {
  const { recentPayments } = props;

  return (
    <Box>
      {recentPayments && recentPayments.length === 0 ? (
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
                <TableCell>Factură</TableCell>
                <TableCell align="left">Sumă</TableCell>
                <TableCell align="center">Dată</TableCell>
                <TableCell align="left">Metodă de Plată</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentPayments &&
                recentPayments.map((payment) => (
                  <TableRow key={payment.nrFactura}>
                    <TableCell component="th" scope="row">
                      {`Nr. ${payment.nrFactura}`}
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
