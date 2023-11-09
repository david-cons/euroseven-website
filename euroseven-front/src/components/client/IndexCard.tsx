import EggIcon from "@mui/icons-material/Egg";
import { Paper, Box, Typography, Button } from "@mui/material";
import { Icon } from "../Icon";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface IndexCardProps {
  forIndexVechi: boolean;
  value: number | undefined;
}

export const IndexCard: React.FC<IndexCardProps> = ({
  forIndexVechi,
  value,
}) => {
  return (
    <Paper
      elevation={5}
      className="card-single"
      sx={{
        display: "flex",
        background: "white",
        padding: "2rem",
        width: "275px", // Adjust width based on screen size
        height: "250px", // Adjust height based on screen size
        borderRadius: "12px",
        boxShadow: "0 8px 16px -8px rgba(0, 0, 0, 0.3)",
        border: "0.1px solid #e0e0e0",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <Box
        sx={
          !forIndexVechi
            ? { margin: "0 auto", transform: "scaleX(-1)" }
            : { margin: "0 auto" }
        }
      >
        <Icon MUIIcon={EggIcon} color={"#46db58"} />
      </Box>
      <Box sx={{ margin: "0 auto" }}>
        <Typography
          fontFamily={"Catesque"}
          fontWeight={"bold"}
          sx={{ mt: "15px" }}
        >
          {!forIndexVechi ? `Index` : `Index Vechi \n (cm)`}
        </Typography>
      </Box>
      <Box sx={{ margin: "0 auto" }}>
        <Typography
          fontFamily={"Catesque"}
          fontWeight={"bold"}
          sx={{ mt: "5px" }}
        >
          {!forIndexVechi && `(cm)`}
        </Typography>
      </Box>
      <Box sx={{ margin: "0 auto" }}>
        <Typography fontFamily={"Catesque"} sx={{ mt: "15px" }}>
          {value}
        </Typography>
      </Box>

      <Box sx={{ margin: "0 auto", mt: "5vh" }}>
        <Button
          endIcon={<ArrowForwardIcon />}
          variant="contained"
          sx={{
            fontFamily: "Catesque",
            textTransform: "none",
            borderRadius: "15px",
            color: "white",
            width: "150px",
          }}
        >
          Vezi
        </Button>
      </Box>
    </Paper>
  );
};
