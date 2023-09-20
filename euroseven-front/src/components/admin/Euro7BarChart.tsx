import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Paper, Typography, Divider, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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

const data = {
  labels: [
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
  ],
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

export const Euro7BarChart: React.FC = () => {
  return (
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
        mr: "25px",
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
      <Bar
        options={options}
        data={data}
        style={{ padding: "30px", marginTop: "15px" }}
      />

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
  );
};
