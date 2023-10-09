import { Box } from "@mui/material";
import { DashboardCard } from "../../components/DashboardCard";
import PaymentsIcon from "@mui/icons-material/Payments";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PaidIcon from "@mui/icons-material/Paid";

import { Euro7BarChart } from "../../components/admin/Euro7BarChart";
import { Euro7Doughnut } from "../../components/admin/Euro7Doughnut";

export const AdminHome: React.FC = () => {
  
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <DashboardCard
          color={"#f04438"}
          title={"Facturi Restante"}
          desc={"121"}
          none={{
            positive: true,
            percentage: "12%",
            text: "De luna trecută",
          }}
          icon={PaidIcon}
        />
        <DashboardCard
          color={"#10b981"}
          title={"Utilizatori"}
          desc={"2346"}
          none={{
            positive: false,
            percentage: "16%",
            text: "De luna trecută",
          }}
          icon={PeopleAltIcon}
        />
        <DashboardCard
          color={"#f79009"}
          title={"Plăti"}
          desc={"121"}
          icon={PaymentsIcon}
        />
        <DashboardCard
          color={"#6366f1"}
          title={"Profit"}
          desc={"5k RON"}
          none={{
            positive: true,
            percentage: "15%",
            text: "De luna trecuta",
          }}
          icon={PaidIcon}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        <Euro7BarChart />
        <Euro7Doughnut />
      </Box>
    </Box>
  );
};
