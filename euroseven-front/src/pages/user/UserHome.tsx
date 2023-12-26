import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Icon } from "../../components/Icon";
import { PaymentEntity, UserEntity } from "../../types";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { InvoiceService } from "../../services/InvoiceService";
import PaymentIcon from "@mui/icons-material/Payment";
import DescriptionIcon from "@mui/icons-material/Description";
import test1 from "../../assets/test1.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IndexCard } from "../../components/client/IndexCard";
import { PlatiRecenteCard } from "../../components/client/PlatiRecenteCard";
import { HomeCard } from "../../components/client/HomeCard";
import PeopleAlt from "@mui/icons-material/PeopleAlt";

export const UserHome: React.FC<{
  user: UserEntity | null;
  recentPayments: PaymentEntity[] | null;
}> = ({ user, recentPayments }) => {
  const [countUnpaidInvoices, setCountUnpaidInvoices] = useState<number>(0);

  useEffect(() => {
    if (user) {
      const fetchUnpaidInvoices = async () => {
        await InvoiceService.getCountUnpaidInvoices(user?.codClient!)
          .then((res) => {
            setCountUnpaidInvoices(res);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      fetchUnpaidInvoices();
    }
  }, [user]);

  return (
    <Box sx={{ width: "100%", overflowY: "hidden", height: "100%" }}>
      <Box
        sx={{
          width: "100%",
          height: "91px",
          background: "linear-gradient(to right,#006dee, #014bd0, #00249e)",
          position: "absolute",
          top: "10%",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Typography
          fontFamily={"Catesque"}
          sx={{ color: "white", fontSize: "2rem" }}
        >
          Bine ai revenit!
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "80%",
          position: "absolute",
          background: "linear-gradient(to bottom,#FFFFFF,#dee2e6)",
          top: "20%",
        }}
      >
        <img
          src={test1}
          height={"100%"}
          width={"100%"}
          alt="home"
          style={{ objectFit: "cover", opacity: "1" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: "25vh",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "column",
            sm: "column",
            lg: "row",
            xl: "row",
          }}
          spacing={{ xs: 1, sm: 2, md: 1, lg: 1, xl: 10 }}
        >
          <Paper
            elevation={5}
            className="card-single"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              background: "white",
              padding: "2rem",
              width: "250px", // Adjust width based on screen size
              height: "100px", // Adjust height based on screen size
              borderRadius: "12px",
              boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.3)",
              border: "0.1px solid #e0e0e0",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
              position: "relative",
              textAlign: "left",
            }}
          >
            <Box>
              <Box
                sx={{
                  padding: "20px",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  mt: "10px",
                }}
              >
                <Typography
                  fontFamily={"Catesque"}
                  sx={{
                    color: "#9499a2",
                    textTransform: "uppercase",
                  }}
                >
                  {"Rest de Plată"}
                </Typography>
              </Box>

              <Box
                sx={{
                  padding: "20px",
                  position: "absolute",
                  left: "0",
                  top: "35px",
                }}
              >
                <Box>
                  <Typography
                    fontFamily={"Catesque"}
                    sx={{
                      color: "#black",
                      fontSize: "2rem",
                      letterSpacing: "1.5px",
                    }}
                  >
                    {`${user?.restDePlataTotal!} RON`}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: "10px" }}>
              <Icon
                MUIIcon={PaymentIcon}
                color={Number(user?.restDePlataTotal!) < 0 ? "green" : "red"}
              />
            </Box>
            {user?.restDePlataTotal! > 0 && (
              <Button
                variant="contained"
                sx={{
                  fontFamily: "Catesque",
                  textTransform: "none",
                  position: "absolute",
                  borderRadius: "15px",
                  margin: "15px",
                  height: "30px",
                  color: "white",
                  bottom: -10,
                  left: 0,
                }}
              >
                Plătește
              </Button>
            )}
            <Button
              endIcon={<ArrowForwardIcon />}
              sx={{
                fontFamily: "Catesque",
                textTransform: "none",
                position: "absolute",
                bottom: -15,
                right: -10,
                borderRadius: "15px",
                margin: "15px",
                color: "black",
              }}
            >
              Vezi Detalii
            </Button>
          </Paper>
          <HomeCard
            title={"Facturi Restante"}
            data={countUnpaidInvoices}
            icon={DescriptionIcon}
          />
          <Paper
            elevation={5}
            className="card-single"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center", // Centers items on the cross-axis (vertically if the flex-direction is row)
              background: "white",
              padding: "2rem",
              width: "250px",
              height: "100px",
              borderRadius: "12px",
              boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.3)",
              border: "0.1px solid #e0e0e0",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
              position: "relative",
              textAlign: "left",
              whiteSpace: "nowrap", // This ensures the content does not wrap
              "@media (max-width: 1200px)": {
                display: "none",
              },
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                component="div" // Make sure to use div to properly encapsulate nested elements
                fontFamily={"Catesque"}
                sx={{
                  color: "#9499a2",
                  textTransform: "uppercase",
                  padding: "20px",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                Detalii
              </Typography>

              <Box
                sx={{
                  padding: "20px",
                  position: "absolute",
                  left: "0",
                  top: "35px",
                  width: "100%",
                }}
              >
                {/* Separate Typography components for each line */}
                <Typography
                  fontFamily={"Catesque"}
                  sx={{
                    display: "flex", // Use flexbox to layout the label and value
                    alignItems: "center",
                    color: "#black",
                    letterSpacing: "1.5px",
                  }}
                >
                  <Typography
                    component="span" // Use span to keep inline with text
                    sx={{
                      color: "#0054a6",
                      fontFamily: "Catesque",
                      fontWeight: "bold",
                      mr: "5px",
                    }}
                  >
                    Cod Client:
                  </Typography>
                  {user?.codClient}
                </Typography>

                <Typography
                  fontFamily={"Catesque"}
                  sx={{
                    display: "flex", // Use flexbox to layout the label and value
                    alignItems: "center",
                    color: "#black",
                    letterSpacing: "1.5px",
                    marginTop: "10px", // Add margin to separate from the previous line
                  }}
                >
                  <Typography
                    component="span" // Use span to keep inline with text
                    sx={{
                      color: "#0054a6",
                      fontFamily: "Catesque",
                      fontWeight: "bold",
                      mr: "5px",
                    }}
                  >
                    Nume:{" "}
                  </Typography>
                  {user?.name}
                </Typography>

                <ResponsiveTypography text={user?.address} />
              </Box>
            </Box>
            <Box>
              <Icon MUIIcon={PeopleAlt} color={"black"} />
            </Box>
          </Paper>
        </Stack>
        <Stack
          direction={{
            xs: "column",
            md: "column",
            sm: "column",
            lg: "row",
            xl: "row",
          }}
          spacing={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
          sx={{
            mt: "3vh",
            "@media (max-width: 1000px)": {
              display: "none",
            },
          }}
        >
          <PlatiRecenteCard user={user} recentPayments={recentPayments} />
          <IndexCard forIndexVechi={false} value={user?.indexNou!} />
        </Stack>
      </Box>
    </Box>
  );
};

interface ResponsiveTypographyProps {
  text: string | undefined;
}

const ResponsiveTypography: React.FC<ResponsiveTypographyProps> = ({
  text,
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(15); // Start with a default font size

  const adjustFontSize = useCallback(() => {
    if (textRef.current && textRef.current.parentElement) {
      let currentFontSize = fontSize;
      const parentPadding =
        parseFloat(
          getComputedStyle(textRef.current.parentElement).paddingLeft
        ) +
        parseFloat(
          getComputedStyle(textRef.current.parentElement).paddingRight
        );
      const availableWidth =
        textRef.current.parentElement.offsetWidth - parentPadding;
      textRef.current.style.fontSize = `${currentFontSize}px`;

      while (
        textRef.current.scrollWidth > availableWidth &&
        currentFontSize > 1
      ) {
        currentFontSize--;
        textRef.current.style.fontSize = `${currentFontSize}px`;
      }

      if (currentFontSize !== fontSize) {
        setFontSize(currentFontSize);
      }
    }
  }, [fontSize, textRef]); // Add necessary dependencies here

  useLayoutEffect(adjustFontSize, [text, fontSize, adjustFontSize]);
  // Adjust font size when container size changes
  useEffect(() => {
    const resizeObserver = new ResizeObserver(adjustFontSize);
    if (textRef.current && textRef.current.parentElement) {
      resizeObserver.observe(textRef.current.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [textRef, adjustFontSize]);

  return (
    <Typography
      fontFamily={"Catesque"}
      sx={{
        display: "flex",
        alignItems: "center",
        color: "#black",
        letterSpacing: "1.5px",
        marginTop: "10px",
      }}
    >
      <Typography
        component="span"
        sx={{
          color: "#0054a6",
          fontFamily: "Catesque",
          fontWeight: "bold",
          mr: "5px",
        }}
      >
        Adresa:
      </Typography>
      <span
        ref={textRef}
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          fontSize: `${fontSize}px`, // Apply dynamic font size
        }}
      >
        {text}
      </span>
    </Typography>
  );
};
