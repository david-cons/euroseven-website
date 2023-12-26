import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled, tableCellClasses } from "@mui/material";
import information from "../assets/information.jpg";
import { JumbotronOverlay } from "../components/JumbotronOverlay";
import { Title } from "../components/Title";
import { useState } from "react";
import { ConsumEntity } from "../types";
import axios from "axios"

export const ConsultareConsum: React.FC = () => {


    const [cod, setCod] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [result, setResult] = useState<ConsumEntity | null>(null);

    const changeCod = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCod(event.target.value);
    };

    const changeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const handleSearch = () => {
        axios.get(`http://localhost:8081/api/consum/find?cod=${cod}&address=${address}`)
            .then(response => {
                setResult(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflowX: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    backgroundColor: "white",
                }}
            >
                <Title role={null} />
            </Box>
            <Box
                className="jumbotron-container"
                sx={{
                    width: "100%",
                    minHeight: "711px",
                    overflow: "hidden", // Prevent horizontal scrollbar
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <img
                    src={information}
                    alt="jumbotron"
                    style={{
                        width: "100%", // Maintain aspect ratio and cover the container
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute", // Ensure images are absolutely positioned
                        top: 0, // Position images at the top
                        left: 0, // Position images at the left
                        animation: "zoom-in 20s ease-in-out",
                        flexShrink: 0,
                    }}
                    draggable="false"
                    unselectable="on"
                />
                <JumbotronOverlay page={4} />
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h2"
                        fontFamily={"Catesque"}
                        color="white"
                    >
                        Consultare Consum
                    </Typography>
                </Box>
            </Box>
            <Box sx={{
                width: "100%",
                height: "400px",
                display: "flex",
                flexDirection: "column",
            }}>
                <Box sx={{ display: "flex", width: "30%", justifyContent: "space-between", margin: "0 auto", mt: "25px" }}>
                    <TextField
                        name={"cod"}
                        id={"cod"}
                        size={"small"}
                        label={"Cod Client"}
                        value={cod}
                        onChange={changeCod}
                        sx={{
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
                        }}
                    />
                    <TextField
                        name={"address"}
                        id={"address"}
                        size={"small"}
                        label={"Adresa"}
                        value={address}
                        onChange={changeAddress}
                        sx={{
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
                        }}
                    />
                    <Button
                        variant={"contained"}
                        sx={{
                            backgroundColor: "#0054a6",
                            "&:hover": {
                                backgroundColor: "#0054a6",
                                color: "white",
                            },
                            fontFamily: "Catesque",

                        }}
                        type="submit"
                        onClick={handleSearch}
                    >
                        Cauta
                    </Button>

                </Box>
                <Box sx={{ width: "50%", margin: "0 auto" }}>
                    {!result ? (
                        <Typography fontFamily="Catesque" sx={{ mt: "5vh" }}>
                            Cod Client sau Adresa gresita.
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
                                            Cod
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ fontWeight: "bold" }} align="left">
                                            Nr. Factura
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ fontWeight: "bold" }} align="center">
                                            De Plata
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ fontWeight: "bold" }} align="left">
                                            Index Vechi
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ fontWeight: "bold" }} align="left">
                                            Index Nou
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ fontWeight: "bold" }} align="left">
                                            Consum
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ fontWeight: "bold" }} align="left">
                                            Perioada
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <StyledTableCell sx={{ fontWeight: "bold" }}>
                                            {result.cod}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ fontWeight: "bold" }} align="left">
                                            {result.nrFactura}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ fontWeight: "bold" }} align="center">
                                            {result.dePlata}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ fontWeight: "bold" }} align="left">
                                            {result.indexVechi}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ fontWeight: "bold" }} align="left">
                                            {result.indexNou}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ fontWeight: "bold" }} align="left">
                                            {result.consumT}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ fontWeight: "bold" }} align="left">
                                            {result.perioada}
                                        </StyledTableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Box>
        </Box>
    );
}


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
