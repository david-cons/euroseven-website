import { Box, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const LandingCard = (props: {
  image: string;
  title: String;
  body: String;
  buttonText: String;
}) => {
  const { image, title, body, buttonText } = props;
  return (
    <Box
      sx={{
        mr: "183px",
        position: "relative",
        width: "455.5px",
        height: "227.75px",
        "@media (max-width: 1000px)": {
          mr: "unset",
        },
        "@media (max-width: 1600px)": {
          width: "318px",
        },
        "@media (max-width: 1450px)": {
          width: "275px",
        },
      }}
    >
      <Box
        sx={{
          height: "227.75px",
          width: "318.85px",
          "@media (max-width: 1600px)": {
            width: "275px",
          },
          "@media (max-width: 1450px)": {
            width: "200px",
          },
        }}
      >
        <img
          src={image}
          alt="card1"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "318.85px",
          height: "183px",
          backgroundColor: "white",
          position: "absolute",
          top: "50%" /* Place the element vertically in the middle */,
          left: {
            xs: "calc(10% + 20px)",
            sm: "15%",
            md: "15%",
            lg: "20%",
            xl: "30%",
          },
          transform: "translateY(-50%)" /* Adjust for vertical alignment */,
          textAlign: "center",
          borderRadius: "10px",
          "@media (max-width: 500px)": {
            left: "15%",
          },
          "@media (max-width: 1600px)": {
            width: "275px",
          },
          "@media (max-width: 1150px)": {
            width: "250px",
          },
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            color: "#0054a6",
            padding: "10px",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{
            padding: "10px",
          }}
        >
          {body}
        </Typography>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ margin: "0 auto", backgroundColor: "#0054a6", width: "50%" }}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};
