import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";

function createData(
  subject: string,
  sent_by: string,
  sent_at: string,
  received_by: number,
  message: string
) {
  return {
    subject,
    sent_by,
    sent_at,
    received_by,
    message,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{fontFamily: "Catesque",}}>
          {row.subject}
        </TableCell>
        <TableCell align="left" sx={{fontFamily: "Catesque",}}>{row.sent_by}</TableCell>
        <TableCell align="left" sx={{fontFamily: "Catesque",}}>{row.sent_at}</TableCell>
        <TableCell align="left" sx={{fontFamily: "Catesque",}}>{row.received_by}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" fontFamily={"Catesque"}>
                Message
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{fontFamily: "Catesque",}}>{row.message}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(
    "Mesaj 1",
    "Titi",
    "12/09/2023",
    3000,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras faucibus mauris libero, non efficitur arcu fringilla vel. Curabitur imperdiet molestie lectus nec fermentum. Phasellus egestas consequat lectus, ut sagittis sapien viverra consectetur. Quisque id lacus leo. Pellentesque iaculis tincidunt ante, nec luctus lectus accumsan eu. Nulla facilisi."
  ),
  createData(
    "Mesaj 2",
    "Titi",
    "04/09/2023",
    3000,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras faucibus mauris libero, non efficitur arcu fringilla vel. Curabitur imperdiet molestie lectus nec fermentum. Phasellus egestas consequat lectus, ut sagittis sapien viverra consectetur. Quisque id lacus leo. Pellentesque iaculis tincidunt ante, nec luctus lectus accumsan eu. Nulla facilisi."
  ),
  createData(
    "Mesaj 3",
    "Alex",
    "04/09/2023",
    3000,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras faucibus mauris libero, non efficitur arcu fringilla vel. Curabitur imperdiet molestie lectus nec fermentum. Phasellus egestas consequat lectus, ut sagittis sapien viverra consectetur. Quisque id lacus leo. Pellentesque iaculis tincidunt ante, nec luctus lectus accumsan eu. Nulla facilisi."
  ),
  createData(
    "Mesaj 4",
    "Mihai",
    "01/09/2023",
    3000,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras faucibus mauris libero, non efficitur arcu fringilla vel. Curabitur imperdiet molestie lectus nec fermentum. Phasellus egestas consequat lectus, ut sagittis sapien viverra consectetur. Quisque id lacus leo. Pellentesque iaculis tincidunt ante, nec luctus lectus accumsan eu. Nulla facilisi."
  ),
  createData(
    "Mesaj 5",
    "Teodor",
    "31/08/2023",
    3000,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras faucibus mauris libero, non efficitur arcu fringilla vel. Curabitur imperdiet molestie lectus nec fermentum. Phasellus egestas consequat lectus, ut sagittis sapien viverra consectetur. Quisque id lacus leo. Pellentesque iaculis tincidunt ante, nec luctus lectus accumsan eu. Nulla facilisi."
  ),
];

export const AdminNews: React.FC = () => {
  return (
    <Box sx={{ width: "80%" }}>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: "8vh",
          textAlign: "left",
        }}
      >
        <Typography
          fontFamily={"Catesque"}
          fontWeight={"bold"}
          fontSize={"32px"}
        >
          Anunțuri
        </Typography>
        <Button
          startIcon={<AddIcon />}
          sx={{
            fontFamily: "Catesque",
            backgroundColor: "#0054a6",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#0054a6",
              color: "white",
            },
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          Adauga
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          overflowX: "hidden",
          "& .super-app-theme--header": {
            backgroundColor: "#f8f9fa",
          },
          boxShadow: "0 0 16px -8px black",
          borderRadius: "25px",
          height: "100%"
        }}
      >
        <TableContainer component={Paper} >
          <Table aria-label="collapsible table">
            <TableHead sx={{backgroundColor: "#E4E5E6"}}>
              <TableRow>
                <TableCell />
                <TableCell sx={{fontFamily: "Catesque", fontWeight: "bold"}}>Subject</TableCell>
                <TableCell align="left" sx={{fontFamily: "Catesque", fontWeight: "bold"}}>Trimis De</TableCell>
                <TableCell align="left" sx={{fontFamily: "Catesque", fontWeight: "bold"}}>Data</TableCell>
                <TableCell align="left" sx={{fontFamily: "Catesque", fontWeight: "bold"}}>Primit de</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{backgroundColor: "#f8f9fe"}}>
              {rows.map((row) => (
                <Row key={row.subject} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
