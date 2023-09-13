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
        mr: "20vh",
        position: "relative",
        width: "50vh",
        height: "25vh",
      }}
    >
      <Box
        sx={{
          height: "25vh",
          width: "35vh",
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
          width: "35vh",
          height: "20vh",
          backgroundColor: "white",
          position: "absolute",
          top: "50%" /* Place the element vertically in the middle */,
          left: "45%" /* Anchor the element to the right */,
          transform: "translateY(-50%)" /* Adjust for vertical alignment */,
          textAlign: "center",
          borderRadius: "10px",
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
