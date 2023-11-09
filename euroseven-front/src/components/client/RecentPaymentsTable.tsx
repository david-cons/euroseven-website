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
  styled,
  tableCellClasses,
} from "@mui/material";
import { reverseArray } from "../../utils";

export const RecentPaymentsTable = (props: {
  recentPayments: PaymentEntity[] | null;
}) => {
  const { recentPayments } = props;

  return (
    <Box>
      {recentPayments && recentPayments.length === 0 ? (
        <Typography fontFamily="Catesque" sx={{ mt: "5vh" }}>
          Nici-o plată.
        </Typography>
      ) : (
        <TableContainer
          component={Box}
          sx={{ mt: "5vh", "& *": { fontFamily: "Catesque" } }}
        >
          <Table
            sx={{ minWidth: 675 }}
            size="small"
            aria-label="payments table"
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "white" }}>
                <StyledTableCell sx={{ fontWeight: "bold" }}>
                  Factură
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: "bold" }} align="left">
                  Sumă
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: "bold" }} align="center">
                  Dată
                </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: "bold" }} align="left">
                  Metodă de Plată
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentPayments &&
                reverseArray(recentPayments).map((payment) => (
                  <StyledTableRow key={payment.nrFactura}>
                    <StyledTableCell component="th" scope="row">
                      {`Nr. ${payment.nrFactura}`}
                    </StyledTableCell>
                    <StyledTableCell align="left">{`${payment.amount} RON`}</StyledTableCell>
                    <StyledTableCell align="center">
                      {payment.date}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {payment.paymentMethod}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Catesque",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
