import { Box, Grid } from "@mui/material";
import { NavCard } from "../../components/incasari/NavCard";
import { logout } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

export const IncasariHome: React.FC<{
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
  setInvoiceFilter: React.Dispatch<React.SetStateAction<String | null>>;
  setCreateUser: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatePayment: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  setSelectedTab,
  setInvoiceFilter,
  setCreateUser,
  setCreatePayment,
}) => {
  const navigate = useNavigate();

  const logOut = () => {
    logout();
    navigate("/login");
  };

  const goToSettings = () => {
    setSelectedTab("setari");
  };

  const goToFacturi = () => {
    setSelectedTab("facturi");
  };

  const goToFacturiRestante = () => {
    setSelectedTab("facturi");
    setInvoiceFilter("restante");
  };

  const goToCreeazaFactura = () => {
    setSelectedTab("facturi");
    setCreateUser(true);
  };

  const goToInregistreazaPlata = () => {
    setSelectedTab("plati");
    setCreatePayment(true);
  };

  const goToPlati = () => {
    setSelectedTab("plati");
  };

  return (
    <Box
      sx={{ height: "100%", width: "100%", mt: "150px", overflow: "hidden" }}
    >
      <Grid container spacing={3} sx={{ margin: "0 auto" }}>
        <Grid item xs={4}>
          <NavCard
            text={"Facturi Restante"}
            boxColor={"blue"}
            path1={
              "M11 21H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h5l2 3h9a2 2 0 0 1 2 2v2M19 15v6M16 18h6"
            }
            onClick={goToFacturiRestante}
          />
        </Grid>
        <Grid item xs={4}>
          <NavCard
            text={"Creeare Factură"}
            boxColor={"red"}
            path1={
              "M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"
            }
            polygon={"18 2 22 6 12 16 8 16 8 12 18 2"}
            onClick={goToCreeazaFactura}
          />
        </Grid>
        <Grid item xs={4}>
          <NavCard
            text={"Înregistreaza Plată"}
            boxColor={"orange"}
            path1={"M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6"}
            path2={"M14 3v5h5M18 21v-6M15 18h6"}
            onClick={goToInregistreazaPlata}
          />
        </Grid>
        <Grid item xs={4}>
          <NavCard
            text={"Email"}
            boxColor={"green"}
            path1={
              "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
            }
            polyline={"22,6 12,13 2,6"}
          />
        </Grid>
        <Grid item xs={4}>
          <NavCard
            text={"Facturi"}
            boxColor={"purple"}
            path1={
              "M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
            }
            path2={"M14 3v5h5M16 13H8M16 17H8M10 9H8"}
            onClick={goToFacturi}
          />
        </Grid>
        <Grid item xs={4}>
          <NavCard
            text={"Ghid Utilizator"}
            boxColor={"cyan"}
            path1={"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}
            circle={{ cx: "12", cy: "7", r: "4" }}
          />
        </Grid>
        <Grid item xs={4}>
          <NavCard
            text={"Legal"}
            boxColor={"deeppink"}
            path1={
              "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
            }
          />
        </Grid>
        <Grid item xs={4}>
          <NavCard
            text={"Setări"}
            boxColor={"salmon"}
            path1={
              "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
            }
            circle={{ cx: "12", cy: "12", r: "3" }}
            onClick={goToSettings}
          />
        </Grid>
        <Grid item xs={4}>
          <NavCard
            text={"Deconectează-te"}
            boxColor={"black"}
            path1={"M15 3h6v18h-6M10 17l5-5-5-5M13.8 12H3"}
            onClick={logOut}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
