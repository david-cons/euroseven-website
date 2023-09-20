import { Doughnut } from "react-chartjs-2";
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
import { Paper, Typography, Divider, Button, Box } from "@mui/material";
import TabletAndroidOutlinedIcon from "@mui/icons-material/TabletAndroidOutlined";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
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

export const Euro7Doughnut: React.FC = () => {
  return (
    <Paper
      elevation={5}
      className="card-single"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        background: "white",
        padding: "2rem",
        width: "350px",
        height: "450px",
        borderRadius: "12px",
        boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.4)",
        border: "0.5px solid #e0e0e0",
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
      <Doughnut data={data2} options={options} style={{ padding: "35px" }} />

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
  );
};
