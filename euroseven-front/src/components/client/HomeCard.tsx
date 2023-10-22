import { Paper, Box, Typography, Button, SvgIconTypeMap } from "@mui/material";
import { Icon } from "../Icon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface HomeCardProps {
  data: number | string;
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

export const HomeCard: React.FC<HomeCardProps> = ({ data, title, icon }) => {
  return (
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
            {title}
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
              {data}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: "10px" }}>
        <Icon
          MUIIcon={icon}
          color={
            title !== "Sold"
              ? (typeof data === "string"
                  ? parseInt((data.match(/\d+/g) || []).join(""), 10)
                  : data) > 0
                ? "red"
                : "green"
              : Number(data) > 0
              ? "green"
              : "red"
          }
        />
      </Box>
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
  );
};
