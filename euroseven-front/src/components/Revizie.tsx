import { Box, Typography } from "@mui/material";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import revizie from "../assets/revizie.jpg";

export const Revizie: React.FC = () => {
    return (
        <Box
            sx={{
                height: "800px",
                width: "80%",
                margin: "0 auto",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: "50px",
            }}
        >
            <Box sx={{ margin: "0 auto", textAlign: "center", display: "flex", width: "400px", height: "50px", mt: "25px" }}>
                <Typography fontFamily={"Catesque"} fontSize={"2rem"} sx={{ margin: "auto" }}>
                    Verificare si Revizie
                </Typography>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        textAlign: "left",
                        justifyContent: "left",
                        gap: "10px",
                    }}
                >
                    <Typography
                        fontFamily={"Catesque"}
                        fontSize={"1rem"}
                        sx={{ mb: "10px" }}
                    >
                        {"Toți consumatorii sunt obligați să efectueze verificarea și revizia tehnică periodică a instalațiilor de utilizare a gazelor naturale. Neindeplinirea acestei obligații, în termenele legale, atrage în mod direct răspunderea clientului final pentru eventualele accidente tehnice sau pagube ce pot surveni în exploatarea și utilizarea instalației de utilizare a gazelor naturale și poate conduce la sistarea furnizării gazelor naturale. Fii precaut pentru a preveni accidentele! Pentru a asigura siguranța familiei voastre cat si a bunurilor detinute, fiți siguri că respectați măsurile de precauție și sunteți bine informați în privința potențialelor riscuri. Conform prevederilor legislative cuprinse în Procedura privind verificările și reviziile tehnice ale instalațiilor de utilizare a gazelor naturale Ordinul ANRE nr. 179/2015"}
                    </Typography>
                    <Typography
                        fontFamily={"Catesque"}
                        fontSize={"1rem"}
                        sx={{ mb: "10px" }}
                    >
                        Verificarea tehnică se efectuează:
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                        <AddBoxOutlinedIcon sx={{ color: "#0054a6", mr: "10px" }} />
                        <Typography
                            fontFamily={"Catesque"}
                            fontSize={"1rem"}
                            color={"black"}
                            fontStyle={"italic"}
                        >
                            O dată la maximum 2 ani;
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <AddBoxOutlinedIcon sx={{ color: "#0054a6", mr: "10px" }} />
                        <Typography
                            fontFamily={"Catesque"}
                            fontSize={"1rem"}
                            color={"black"}
                            fontStyle={"italic"}
                        >
                            La cererea ta ori de câte ori este necesar;
                        </Typography>
                    </Box>
                    <Typography
                        fontFamily={"Catesque"}
                        fontSize={"1rem"}
                        sx={{ mb: "10px", mt: "10px" }}
                    >
                        Revizia tehnică se efectuează:
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                        <AddBoxOutlinedIcon sx={{ color: "#0054a6", mr: "10px" }} />
                        <Typography
                            fontFamily={"Catesque"}
                            fontSize={"1rem"}
                            color={"black"}
                            fontStyle={"italic"}
                        >
                            O dată la maximum 10 ani;
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <AddBoxOutlinedIcon sx={{ color: "#0054a6", mr: "10px" }} />
                        <Typography
                            fontFamily={"Catesque"}
                            fontSize={"1rem"}
                            color={"black"}
                            fontStyle={"italic"}
                        >
                            După întreruperea utilizării instalației de utilizare pe o perioadă mai mare de 6 luni;
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <AddBoxOutlinedIcon sx={{ color: "#0054a6", mr: "10px" }} />
                        <Typography
                            fontFamily={"Catesque"}
                            fontSize={"1rem"}
                            color={"black"}
                            fontStyle={"italic"}
                        >
                            Sau după orice eveniment care ar fi putut afecta instalația de utilizare.
                        </Typography>
                    </Box>
                    <Typography
                        fontFamily={"Catesque"}
                        fontSize={"1rem"}
                        sx={{ mb: "10px" }}
                    >

                        Efectuează lucrările doar cu personal autorizat! Improvizațiile și lucrările realizate de persoane neautorzizate îți pun viața în pericol!
                        Realizarea operațiunilor de verificare și de revizie tehnică a instalației de utilizare a gazelor naturale se efectuează exclusiv de către operatori economici autorizați de ANRE pentru execuția instalațiilor de utilizare (OE), ce pot fi selectați de către dvs., în baza unui contract de prestări servicii.
                        Lista integrală  a operatorilor economici autorizați ANRE poate fi consultată de către clientul final pe pagina de internet a Autorității Naționale de Reglementare în Domeniul Energiei (ANRE), respectiv www.anre.ro.
                        În situația în care instalația de utilizare a gazelor naturale deservește mai mulți clienți finali, verificarea/revizia tehnică se realizează atât pentru instalația individuală de utilizare, cât și pentru instalația comună de utilizare.
                    </Typography>
                </Box>
                <Box component="img" src={revizie} alt="revizie" width={"35%"} height={500} sx={{ mt: "50px" }} />
            </Box>
        </Box>
    );
}