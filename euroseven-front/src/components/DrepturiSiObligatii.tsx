import {
    AccordionDetails,
    Box,
    Typography,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";



export const DrepturiSiObligatii: React.FC = () => {
    return (
        <Box
            sx={{
                height: "1200px",
                width: "80%",
                margin: "0 auto",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "50px",

            }}
        >
            <Box
                sx={{
                    height: "800px",
                    width: "100%",
                }}>
                <Accordion expanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{ textAlign: "left" }}
                    >
                        <Typography fontFamily={"Catesque"}>
                            Drepturile și obligațiile Clientului Final
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ textAlign: "left" }}>
                        <Typography fontFamily={"Catesque"}>
                            Punem la dispoziția ta toate informațiile necesare pentru ca tu să fii mereu bine informat cu privire la drepturile și responsabilitățile tale astfel încat să beneficiezi pe deplin de serviciile noastre.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        sx={{ textAlign: "left" }}
                    >
                        <Typography fontFamily={"Catesque"}>
                            Drepturile și obligațiile Furnizorului
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ textAlign: "left" }}>
                        <Typography fontFamily={"Catesque"}>
                            Pentru a iți asigura cele mai bune servicii de furnizare a gazelor naturale, avem o serie de drepturi și obligații pe care ne angajăm să le respectăm. Poți consulta aici lista detaliată a drepturilor și obligațiilor noastre în calitate de furnizor de gaze naturale.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        sx={{ textAlign: "left" }}
                    >
                        <Typography fontFamily={"Catesque"}>
                            Verificare și revizie
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ textAlign: "left" }}>
                        <Typography fontFamily={"Catesque"}>
                            Fii precaut pentru a preveni accidentele! Verificarea si reviziile sunt proceduri obligatorii pentru a asigura siguranța casei tale si buna funcționare a instalațiilor de utilizare.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        sx={{ textAlign: "left" }}
                    >
                        <Typography fontFamily={"Catesque"}>
                            Dreptul la Informare
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ textAlign: "left" }}>
                        <Typography fontFamily={"Catesque"}>
                            In calitate de client, ai dreptul sa fii informat in relația cu noi.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        sx={{ textAlign: "left" }}
                    >
                        <Typography fontFamily={"Catesque"}>
                            Clientul Vulnerabil
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ textAlign: "left" }}>
                        <Typography fontFamily={"Catesque"}>
                            Clienții ce sunt considerați vulnerabili pot beneficia de anumite măsuri de protectie sociala.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        sx={{ textAlign: "left" }}
                    >
                        <Typography fontFamily={"Catesque"}>
                            Adresarea plângerilor
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ textAlign: "left" }}>
                        <Typography fontFamily={"Catesque"}>
                            În situatia în care nu ești mulțumit de activitatea noastra, ne poti sesiza oricand. Descoperă modalitătile de comunicare, cum o înregistrăm, cum o analizăm și modul în care o soluționăm.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        sx={{ textAlign: "left" }}
                    >
                        <Typography fontFamily={"Catesque"}>
                            Legislație
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ textAlign: "left" }}>
                        <Typography fontFamily={"Catesque"}>
                            Furnizarea de gaze naturale este o activitate reglementată de către instituțiile statului. Consultă legislația sub care ne desfășurăm activitatea.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
}




const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },

}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', userSelect: "none" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(270deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
        ":hover": {
            cursor: "default"
        }
    },

}));