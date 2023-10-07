import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Icon } from "./Icon";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
//import useMediaQuery from "@mui/material/useMediaQuery";

export const DashboardCard = (props: {
  color: string;
  title: string;
  desc: string;
  none?: { positive: boolean; percentage: string; text: string };
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}) => {
  //const isSmallScreen = useMediaQuery("(max-width:600px)");

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
        mr: "25px",
        mb: "25px",
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
            {props.title}
          </Typography>
        </Box>
        <Box
          sx={
            props.none === undefined
              ? { padding: "20px", position: "absolute", left: "0", top: "35px"}
              : {
                  padding: "20px",
                  position: "absolute",
                  left: "0",
                  bottom: "15px",
                }
          }
        >
          <Box
            sx={
              props.none === undefined
                ? { display: "flex" }
                : { mt: "30px", display: "flex" }
            }
          >
            <Typography
              fontFamily={"Catesque"}
              sx={{
                color: "#black",
                fontSize: "2rem",
                letterSpacing: "1.5px",
              }}
            >
              {props.desc}
            </Typography>
          </Box>
          {props.none && props.none.positive === true && (
            <Box
              sx={{ display: "flex", flexDirection: "row", color: "#17bb85" }}
            >
              <ArrowUpwardIcon />
              <Typography fontFamily={"Catesque"} sx={{ fontSize: "14px" }}>
                {props.none.percentage}
              </Typography>
              <Typography
                fontFamily={"Catesque"}
                sx={{ fontSize: "14px", ml: "10px", color: "#7e848f" }}
              >
                {props.none.text}
              </Typography>
            </Box>
          )}
          {props.none && props.none.positive === false && (
            <Box
              sx={{ display: "flex", flexDirection: "row", color: "#bb1717" }}
            >
              <ArrowDownwardIcon />
              <Typography fontFamily={"Catesque"} sx={{ fontSize: "14px" }}>
                {props.none?.percentage}
              </Typography>
              <Typography
                fontFamily={"Catesque"}
                sx={{ fontSize: "14px", ml: "10px", color: "#7e848f" }}
              >
                {props.none?.text}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box>
        <Icon MUIIcon={props.icon} color={props.color} />
      </Box>
    </Paper>
  );
};
