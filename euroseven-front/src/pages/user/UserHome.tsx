import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Icon } from "../../components/Icon";
import userhome4 from "../../assets/userhome4.jpg";
import { PaymentEntity, UserEntity } from "../../types";
import { useEffect, useState } from "react";
import { InvoiceService } from "../../services/InvoiceService";
import { RecentPaymentsTable } from "../../components/client/RecentPaymentsTable";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import DescriptionIcon from "@mui/icons-material/Description";

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
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          height: "10vh",
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
          height: "89vh",
          position: "absolute",
          backgroundColor: "rgba(0, 84, 166, 0.7)",
          top: "20%",
        }}
      >
        <img
          src={userhome4}
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
          justifyContent: "left",
          alignItems: "left",
          mt: "20vh",
          ml: "5vh",
        }}
      >
        <Stack direction="row" spacing={10}>
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
                  sx={{ color: "#9499a2", textTransform: "uppercase" }}
                >
                  Sold
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
                <Box
                  sx={{
                    display: "flex",
                    margin: "0 auto",
                    width: "100%",
                  }}
                >
                  <Typography
                    fontFamily={"Catesque"}
                    sx={{
                      color: "#black",
                      fontSize: "2rem",
                      letterSpacing: "1.5px",
                    }}
                  >
                    {user && `${user.saldo} RON`}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Icon
                MUIIcon={PaidOutlinedIcon}
                color={user && user.saldo && user.saldo > 0 ? "green" : "red"}
              />
            </Box>
            <Button
              endIcon={<ArrowForwardIcon />}
              sx={{
                fontFamily: "Catesque",
                textTransform: "none",
                position: "absolute",
                bottom: 0,
                right: 0,
                borderRadius: "15px",
                margin: "15px",
                color: "black",
              }}
            >
              Vezi Detalii
            </Button>
          </Paper>
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
                  sx={{ color: "#9499a2", textTransform: "uppercase" }}
                >
                  Rest De Plata
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
                    {user && `${user.restDePlataTotal} RON`}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Icon
                MUIIcon={PaymentIcon}
                color={
                  user && user.restDePlataTotal && user.restDePlataTotal > 0
                    ? "red"
                    : "green"
                }
              />
            </Box>
            <Button
              endIcon={<ArrowForwardIcon />}
              sx={{
                fontFamily: "Catesque",
                textTransform: "none",
                position: "absolute",
                bottom: 0,
                right: 0,
                borderRadius: "15px",
                margin: "15px",
                color: "black",
              }}
            >
              Vezi Detalii
            </Button>
          </Paper>
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
                  sx={{ color: "#9499a2", textTransform: "uppercase" }}
                >
                  Facturi Restante
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
                    {countUnpaidInvoices}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Icon
                MUIIcon={DescriptionIcon}
                color={countUnpaidInvoices > 0 ? "red" : "green"}
              />
            </Box>
            <Button
              endIcon={<ArrowForwardIcon />}
              sx={{
                fontFamily: "Catesque",
                textTransform: "none",
                position: "absolute",
                bottom: 0,
                right: 0,
                borderRadius: "15px",
                margin: "15px",
                color: "black",
              }}
            >
              Vezi Detalii
            </Button>
          </Paper>
        </Stack>
        <Paper
          elevation={5}
          className="card-single"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background: "white",
            padding: "2rem",
            width: "1040px", // Adjust width based on screen size
            height: "250px", // Adjust height based on screen size
            borderRadius: "12px",
            boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.3)",
            border: "0.1px solid #e0e0e0",
            position: "relative",
            mt: "5vh",
          }}
        >
          <Typography
            fontFamily={"Catesque"}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              padding: "20px",
              textTransform: "uppercase",
            }}
          >
            Plăți Recente
          </Typography>
          <Box
            sx={{
              width: "5vh",
              height: "0.5vh",
              background: "#0054a6",
              position: "absolute",
              top: "15%",
              left: "1.8%",
              borderRadius: "10px",
            }}
          ></Box>
          {user && <RecentPaymentsTable recentPayments={recentPayments} />}
        </Paper>
      </Box>
    </Box>
  );
};
