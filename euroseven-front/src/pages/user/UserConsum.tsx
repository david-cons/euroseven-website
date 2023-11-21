import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { useState } from "react";
import moment from "moment";
import "moment/locale/ro"; // Ensure Romanian locale is imported
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
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
          linePercentage: 0.1,
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
      label: "consum (mc)",
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
      backgroundColor: "red",
      borderColor: "#0054a6",
    },
  ],
};
moment.locale("ro"); // Set locale to Romanian

export const UserConsum: React.FC = () => {
  const [filter, setFilter] = useState("general");

  const months = moment.months();

  const handleChange = (event: SelectChangeEvent) => {
    // const currentFilter = event.target.value as string;
    setFilter(event.target.value as string);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridRowGap: "20px",
        padding: "50px",
        width: "580px",
        height: "500px",
        bgcolor: "background.paper",
        boxShadow: 24,
        textAlign: "center",
      }}
    >
      <Typography
        fontFamily={"Catesque"}
        sx={{ color: "black", fontSize: "2rem" }}
      >
        Consum
      </Typography>
      <Select
        value={filter}
        onChange={handleChange}
        IconComponent={() => <ArrowDropDownIcon style={{ color: "#0054a6" }} />}
        sx={{
          width: "100%",
          height: "35px",
          "& .MuiInputBase-input": {
            color: "black", // Text color
            fontFamily: "Catesque", // Font family
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0054a6",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0054a6", // Hover border color
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#0054a6", // Focused border color
          },
        }}
      >
        <MenuItem value={"general"} sx={{ fontFamily: "Catesque" }}>
          General
        </MenuItem>
        {months.map((month) => (
          <MenuItem
            value={month}
            key={`K_${month}`}
            sx={{ fontFamily: "Catesque" }}
          >
            {month.charAt(0).toUpperCase() + month.slice(1)}
          </MenuItem>
        ))}
      </Select>
      <Line
        options={options}
        data={data}
        style={{ padding: "30px", marginTop: "15px", width: "100%" }}
      />
    </Box>
  );
};
