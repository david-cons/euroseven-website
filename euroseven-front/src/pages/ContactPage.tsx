import { Title } from "../components/Title";
import information from "../assets/information.jpg";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import { JumbotronOverlay } from "../components/JumbotronOverlay";
import { Footer } from "../components/Footer";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

export const ContactPage: React.FC = () => {
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
        <JumbotronOverlay />
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
            Puncte De Lucru
          </Typography>
          <Typography
            component="p"
            fontSize={"2rem"}
            fontFamily={"Catesque"}
            color="white"
          >
            Contact
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "98%",
          minHeight: "700px",
          bgcolor: "background.paper",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          margin: "0 auto",
          mt: "40px",
          mb: "40px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            minHeight: "60%",
            display: "flex",
            "@media (max-width:600px)": {
              flexDirection: "column",
            },
          }}
        >
          <Box
            sx={{
              width: "60%",
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              textAlign: "left",
              gap: "12px",
              "@media (max-width:600px)": {
                width: "90%",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
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
                Contactează-ne
              </Typography>
            </Box>
            <Typography
              fontFamily={"Catesque"}
              fontWeight={"bold"}
              fontSize={"1rem"}
            >
              Sediul Central Departamentul pentru Relații și Servicii
            </Typography>
            <Typography fontFamily={"Catesque"} fontSize={"1rem"}>
              Adresă: Str. Horatiu nr. 11, sector 1, Bucuresti, cod postal
              010833
            </Typography>
            <Typography fontFamily={"Catesque"} fontSize={"1rem"}>
              Fax: 0374 092 081
            </Typography>
            <Typography fontFamily={"Catesque"} fontSize={"1rem"}>
              Sesizări/comunicări: contacteză-ne prin intermediului formularului
              de contact.
            </Typography>
            <Box sx={{ display: "flex" }}>
              <CheckBoxIcon sx={{ color: "green", mr: "10px" }} />
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                color={"#1c2536"}
              >
                Call Center: 0374 627 726 - disponibil - Luni - Vineri - 09:00 -
                17:00
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <CheckBoxIcon sx={{ color: "green", mr: "10px" }} />
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                color={"green"}
              >
                Transmitere index: autocitire (SMS): 0746 205 583 (apel gratuit)
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <CheckBoxIcon sx={{ color: "green", mr: "10px" }} />
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                color={"#0054a6"}
              >
                Situații de urgență - Dispecerat 0800 672 458 TelVerde (apel
                gratuit) - disponibil 24/7
              </Typography>
            </Box>
            <Typography
              fontFamily={"Catesque"}
              fontSize={"0.8rem"}
              color={"#1c2536"}
            >
              *Call centre si Autocitire: apel si mesaje taxabile conform
              tarifelor stabilite de către operatorii de telefonie.
            </Typography>
          </Box>
          <Box
            sx={{
              width: "40%",
              height: "100%",
              padding: "20px",
              "@media (max-width:600px)": {
                width: "80%",
              },
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.5014363312357!2d26.082300900000003!3d44.4433882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff583a86a667%3A0x6fb4733f46b2d675!2zU3RyYWRhIEhvcmHIm2l1IDExLCBCdWN1cmXImXRpLCBSb2VtZW5pw6s!5e0!3m2!1snl!2sus!4v1700501867758!5m2!1snl!2sus"
              width="100%"
              height="340"
              title="map"
            ></iframe>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            minHeight: "20%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              minHeight: "25%",
              background: "#0054a6",
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: "10%",
                minHeight: "100%",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                whiteSpace: "nowrap",
              }}
            >
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                color={"white"}
                sx={{ ml: "5px" }}
              >
                Punct de Lucru
              </Typography>
            </Box>
            <Box
              sx={{
                width: "40%",
                minHeight: "100%",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                color={"white"}
                sx={{ ml: "100px" }}
              >
                Adresa
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                minHeight: "100%",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                color={"white"}
                sx={{ ml: "60px" }}
              >
                Program
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                minHeight: "100%",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                "@media (max-width: 600px)": {
                  display: "none",
                },
              }}
            >
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                color={"white"}
                sx={{ ml: "60px" }}
              >
                Intervenții (24/7)
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              minHeight: "37.5%",
              display: "flex",
              background: "white",
            }}
          >
            <Box
              sx={{
                width: "10%",
                minHeight: "100%",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                whiteSpace: "nowrap",
              }}
            >
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                sx={{ ml: "5px" }}
              >
                Bolintin-Deal
              </Typography>
            </Box>
            <Box
              sx={{
                width: "40%",
                minHeight: "100%",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                sx={{ ml: "100px" }}
              >
                Com. Bolintin Deal , Jud. Giurgiu
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                minHeight: "100%",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                sx={{ ml: "60px" }}
              >
                L - V 08:00 - 16:00
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                minHeight: "100%",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                "@media (max-width: 600px)": {
                  display: "none",
                },
              }}
            >
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                sx={{ ml: "60px" }}
              >
                0752 219 562
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              minHeight: "37.5%",
              display: "flex",
              background: "#DCDCDC",
            }}
          >
            <Box
              sx={{
                width: "10%",
                minHeight: "100%",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                sx={{ ml: "5px" }}
              >
                Sabareni
              </Typography>
            </Box>
            <Box
              sx={{
                width: "40%",
                minHeight: "100%",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                sx={{ ml: "100px" }}
              >
                Com. Sabareni , Jud. Giurgiu
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                minHeight: "100%",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                sx={{ ml: "60px" }}
              >
                L - V 08:00 - 16:00
              </Typography>
            </Box>
            <Box
              sx={{
                width: "25%",
                minHeight: "100%",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
                "@media (max-width: 600px)": {
                  display: "none",
                },
              }}
            >
              <Typography
                fontFamily={"Catesque"}
                fontSize={"1rem"}
                sx={{ ml: "60px" }}
              >
                0757 578 892
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            minHeight: "200px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "left",
            textAlign: "left",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "20px",
            }}
          >
            <NotificationsActiveOutlinedIcon
              sx={{
                color: "#0054a6",
                height: "60px",
                width: "60px",
              }}
            />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
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
                Urgențe
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "100%", mr: "25px" }}>
            <Typography fontFamily={"Catesque"} fontSize={"1rem"}>
              În cazul în care simți miros de gaze naturale sau observi
              defecțiuni tehnice în alimentarea cu gaze naturale sau
              electricitate, anunță operatorul de distribuție sau de rețea din
              zona ta.
            </Typography>
          </Box>
          <Box sx={{ width: "100%", display: "flex", gap: "150px" }}>
            <Button
              variant="contained"
              sx={{
                background: "#0054a6",
                color: "white",
                fontFamily: "Catesque",
              }}
            >
              Electricitate
            </Button>
            <FormControl sx={{ width: "30%" }}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Localitate
              </InputLabel>
              <NativeSelect
                defaultValue={""}
                inputProps={{
                  name: "localitate",
                  id: "uncontrolled-native",
                }}
              >
                <option value={"BD"}>Bolintin-Deal, Giurgiu</option>
                <option value={"SB"}>Săbăreni, Giurgiu</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
