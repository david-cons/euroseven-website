import { Box, Paper, Typography, Divider, Button } from "@mui/material";
import { DashboardCard } from "../../components/DashboardCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TabletAndroidOutlinedIcon from "@mui/icons-material/TabletAndroidOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const options = {
  responsive: true,
  title: {
    display: true,
    text: "",
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  options: {
    scales: {
      xAxes: [
        {
          categoryPercentage: 0.4,
          barPercentage: 0.1,
        },
      ],
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const data = {
  labels,
  datasets: [
    {
      label: "",
      data: [
        "18",
        "16",
        "5",
        "3",
        "14",
        "14",
        "16",
        "19",
        "18",
        "20",
        "12",
        "12",
      ],
      backgroundColor: "#6366f1",
    },
    {
      label: "",
      data: ["12", "11", "4", "2", "9", "9", "10", "12", "13", "13", "8", "7"],
      backgroundColor: "#d8d9fb",
    },
  ],
};

const data2 = {
  labels: ["Desktop", "Phone", "Tablet"],
  datasets: [
    {
      label: "Trafic: ",
      data: [300, 50, 100],
      backgroundColor: ["#6366f1", "#f79009", "#10b981"],
    },
  ],
};
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
        <Paper
          elevation={5}
          className="card-single"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background: "white",
            padding: "2rem",
            width: "832px",
            height: "450px",
            borderRadius: "12px",
            boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.2)",
            border: "0.1px solid #e0e0e0",
            position: "relative",
            flexDirection: "row",
            mr: "60px",
          }}
        >
          <Typography
            fontFamily={"Catesque"}
            fontSize={"20px"}
            fontWeight={"bold"}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              padding: "15px",
            }}
          >
            Plați
          </Typography>
          <Bar options={options} data={data} style={{ padding: "30px" }} />
          <Divider
            sx={{
              width: "100%",
              position: "absolute",
              bottom: 60,
              left: 0,
            }}
          />
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
            Vezi Toate
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
            width: "300px",
            height: "450px",
            borderRadius: "12px",
            boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.4)",
            border: "0.5px solid #e0e0e0",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
            position: "relative",
          }}
        >
          <Typography
            fontFamily={"Catesque"}
            fontSize={"20px"}
            fontWeight={"bold"}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              padding: "15px",
            }}
          >
            Trafic
          </Typography>
          <Doughnut
            data={data2}
            options={options}
            style={{ padding: "35px" }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              mb: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                mr: "10px",
              }}
            >
              <DesktopWindowsOutlinedIcon sx={{ padding: "5px" }} />
              <Typography fontFamily={"Catesque"} sx={{ padding: "5px" }}>
                Desktop
              </Typography>
              <Typography
                fontFamily={"Catesque"}
                sx={{ color: "#7e848f", padding: "5px" }}
              >
                66%
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                mr: "10px",
              }}
            >
              <PhoneIcon sx={{ padding: "5px" }} />
              <Typography fontFamily={"Catesque"} sx={{ padding: "5px" }}>
                Phone
              </Typography>
              <Typography
                fontFamily={"Catesque"}
                sx={{ color: "#7e848f", padding: "5px" }}
              >
                11%
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <TabletAndroidOutlinedIcon sx={{ padding: "5px" }} />
              <Typography fontFamily={"Catesque"} sx={{ padding: "5px" }}>
                Tablet
              </Typography>
              <Typography
                fontFamily={"Catesque"}
                sx={{ color: "#7e848f", padding: "5px" }}
              >
                23%
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
