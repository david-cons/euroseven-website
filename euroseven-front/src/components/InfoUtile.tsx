import {
  Box,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import plafonare from "../assets/plafonare.jpg";
import facturaelec from "../assets/facturaelec.jpg";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import mdp from "../assets/mdp.jpg";
import furnizor from "../assets/furnizor.jpg";
import deconectare from "../assets/deconectare.jpg";
import { useState } from "react";
export const InfoUtile: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (hover: boolean) => {
    setIsHovered(hover);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "2200px",
        background: "linear-gradient(to bottom,#FFFFFF,#dee2e6)",
        mt: "50px",
        display: "flex",
        flexDirection: "column",
        gap: "35px",
      }}
    >
      {/*Plafonare Tab */}
      <Box
        sx={{
          width: "80%",
          margin: "0 auto",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: "6px",
                height: "50px",
                backgroundColor: "#0054a6",
                mr: "15px",
              }}
            />
            <Typography fontFamily={"Catesque"} fontSize={"2rem"}>
              Plafonare
            </Typography>
          </Box>
          <Typography
            fontFamily={"Catesque"}
            fontSize={"1rem"}
            sx={{ mb: "10px" }}
          >
            Plafonarea prețurilor de furnizare a gazelor naturale în perioada 1
            aprilie 2022 - 31 martie 2025 reprezintă o măsură care asigură
            stabilitate și predictibilitate pentru consumatorii casnici. Conform
            prevederilor OUG nr.27/2022, prețurile la gazele naturale pentru
            clienții casnici sunt limitate la un nivel maxim, oferind astfel
            protecție împotriva fluctuațiilor bruște ale pieței energetice.
            Prețul final facturat al gazelor naturale va fi plafonat la cel
            mult:
          </Typography>
          <Box sx={{ display: "flex" }}>
            <CheckBoxIcon sx={{ color: "green", mr: "10px" }} />
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"black"}
            >
              0,31 lei/kWh (TVA inclus) – Clientii casnici, indiferent de
              consumul acestora;
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <CheckBoxIcon sx={{ color: "green", mr: "10px" }} />
            <Typography
              fontFamily={"Catesque"}
              fontSize={"1rem"}
              color={"black"}
            >
              0,37 lei/kWh (TVA inclus) – Clienții noncasnici al căror consum în
              anul precedent nu a depășit 50.000 MWh;
            </Typography>
          </Box>
          <Typography
            fontFamily={"Catesque"}
            fontSize={"1rem"}
            sx={{ mb: "10px" }}
          >
            Echipa noastră este aici pentru a-ți oferi servicii de calitate și
            pentru a te sprijini în orice fel. Dacă ai întrebări sau nelămuriri,
            nu ezita să ne contactezi. Ne bucurăm să fim alături de tine în
            această perioadă!
          </Typography>
          <Button
            variant="contained"
            sx={{
              height: "40px",
              fontFamily: "Catesque",
              mt: "10px",
              width: "200px",
            }}
          >
            Află mai Mult &gt;
          </Button>
        </Box>
        <Box
          onMouseOver={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
          sx={{
            position: "relative",
            width: "400px",
            height: "300px",
            display: "inline-block",
            transition: "width 0.5s ease",
          }}
        >
          <img
            src={plafonare}
            alt="plafonare"
            style={{ width: "100%", height: "100%" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: isHovered ? "100%" : "40%",
              borderTop: "5px solid #0054a6",
              boxSizing: "border-box",
              transition: "width 0.5s ease",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              height: isHovered ? "100%" : "40%",
              borderRight: "5px solid #0054a6",
              boxSizing: "border-box",
              transition: "height 0.5s ease",
            }}
          />
        </Box>
      </Box>
      {/*Modalitatii De Plata Tab */}
      <Box
        sx={{
          width: "80%",
          margin: "0 auto",
          height: "475px",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#dee2e6",
          gap: "25px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            textAlign: "right",
            justifyContent: "right",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: "6px",
                height: "50px",
                backgroundColor: "#0054a6",
                mr: "15px",
              }}
            />
            <Typography fontFamily={"Catesque"} fontSize={"2rem"}>
              Modalități de Plată
            </Typography>
          </Box>
          <Box
            onMouseOver={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            sx={{
              position: "relative",
              width: "470px",
              height: "300px",
              display: "inline-block",
              transition: "width 0.5s ease",
              mt: "10px",
            }}
          >
            <img
              src={mdp}
              alt="modalitati-de-plata"
              style={{ width: "100%", height: "100%" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: isHovered ? "100%" : "40%",
                borderTop: "5px solid #0054a6",
                boxSizing: "border-box",
                transition: "width 0.5s ease",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                height: isHovered ? "100%" : "40%",
                borderRight: "5px solid #0054a6",
                boxSizing: "border-box",
                transition: "height 0.5s ease",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "30%",
          }}
        >
          <Typography
            fontFamily={"Catesque"}
            fontSize={"1rem"}
            sx={{ mb: "10px" }}
          >
            Datorita platformei MySeven destinata clientilor, iti punem la
            dispozitie mai multe variante pentru a-ți facilita procesul de plată
            a facturii de gaze naturale. Alege cu incredere modalitatea de plată
            care se potrivește cel mai bine nevoilor tale.
          </Typography>
          <Button
            variant="contained"
            sx={{
              height: "40px",
              fontFamily: "Catesque",
              mt: "10px",
              width: "200px",
            }}
          >
            Află mai Mult &gt;
          </Button>
        </Box>
      </Box>
      {/*Ce Inseamna Factura Electronica */}
      <Box
        sx={{
          width: "80%",
          margin: "0 auto",
          height: "475px",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "25px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            textAlign: "left",
            justifyContent: "center",
            gap: "50px",
            marginX: "auto", // Center horizontally
          }}
        >
          <Typography
            fontFamily={"Catesque"}
            fontSize={"2rem"}
            sx={{
              borderBottom: "1px solid #0054a6",
              margin: "0 auto",
            }}
          >
            Ce inseamna factura electronica?
          </Typography>
          <Box
            onMouseOver={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            sx={{
              position: "relative",
              width: "50%",
              height: "300px",
              transition: "width 0.5s ease",
              display: "flex",
              flexDirection: "column",
              mt: "10px",
              margin: "0 auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                height: "50%",
                width: "100%",
              }}
            >
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                sx={{ mb: "10px" }}
              >
                Datorita platformei MySeven destinata clientilor, iti punem la
                dispozitie mai multe variante pentru a-ți facilita procesul de
                plată a facturii de gaze naturale. Alege cu incredere
                modalitatea de plată care se potrivește cel mai bine nevoilor
                tale.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  height: "40px",
                  fontFamily: "Catesque",
                  mt: "10px",
                  width: "200px",
                }}
              >
                Află mai Mult &gt;
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      {/*Factura ta de gaze naturale explicata*/}
      <Box
        sx={{
          height: "300px",
          margin: "0 auto",
          display: "flex",
          gap: "25px",
          "@media (max-width: 1300px)": {
            flexDirection: "column",
            height: "auto"
          }
        }}
      >
        <Card sx={{ width: 420 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={facturaelec}
              alt="factura-explicata"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Factura ta explicata
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ghid explicativ al facturii de gaze naturale. Afla detalii
                despre fiecare sectiune a facturii tale pentru a găsi rapid și
                ușor informațiile de care ai nevoie.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ width: 420 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={furnizor}
              alt="furnizor"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Schimbarea furnizorului
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Furnizorul tau alegerea ta. Ai dreptul de a-ți schimba
                furnizorul prin încetarea contractului actual și încheierea unui
                nou contract cu furnizorul pe care îl preferi. Consultă aici
                pașii pentru a realiza schimbarea furnizorului de gaze naturale.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ width: 420 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={deconectare}
              alt="furnizor"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Reluarea furnizarii si preavizul de deconectare
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Afla mai multe despre preavizul de deconectare, cand poate fi
                emis și pașii pe care trebuie să-i urmezi pentru a-ți restabili
                furnizarea în cazul în care ai fost deconectat.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
      {/*Cum se factureaza consumul de gaze naturale*/}
      <Box
        sx={{
          width: "80%",
          margin: "0 auto",
          height: "475px",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "25px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            textAlign: "left",
            justifyContent: "center",
            gap: "50px",
            marginX: "auto", // Center horizontally
          }}
        >
          <Typography
            fontFamily={"Catesque"}
            fontSize={"2rem"}
            sx={{
              borderBottom: "1px solid #0054a6",
              margin: "0 auto",
            }}
          >
            Cum se factureaza consumul de gaze naturale?
          </Typography>
          <Box
            onMouseOver={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            sx={{
              position: "relative",
              width: "50%",
              height: "300px",
              transition: "width 0.5s ease",
              display: "flex",
              flexDirection: "column",
              mt: "10px",
              margin: "0 auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                height: "50%",
                width: "100%",
              }}
            >
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                sx={{ mb: "10px" }}
              >
                Euro7 iti citeste contorul lunar. Afla cum se face conversia din
                m 3(metri cubi) in kWh pe factura ta de gaze naturale.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  height: "40px",
                  fontFamily: "Catesque",
                  mt: "10px",
                  width: "200px",
                }}
              >
                Află mai Mult &gt;
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
