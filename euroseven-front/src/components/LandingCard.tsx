// import { Box, Typography, Button } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";

// export const LandingCard = (props: {
//   image: string;
//   title: String;
//   body: String;
//   buttonText: String;
// }) => {
//   const { image, title, body, buttonText } = props;
//   return (
//     <Box
//       sx={{
//         flex: "1", // each box will take equal space
//         position: "relative",
//         minWidth: "calc(33% - 40px)", // assuming 20px is the desired space between cards
//         minHeight: "25vh",
//       }}
//     >
//       <Box
//         sx={{
//           height: "25vh",
//           maxHeight: "25vh",
//           width: "30vh",
//           position: "relative",
//         }}
//       >
//         <img
//           src={image}
//           alt="card1"
//           style={{
//             width: "100%",
//             minHeight: "100%",
//             maxHeight: "100%",
//             objectFit: "cover",
//             top: 0,
//             left: 0,
//             borderRadius: "10px",
//           }}
//         />
//       </Box>
//       <Box
//         sx={{
//           width: "35vh",
//           minHeight: "20vh",
//           backgroundColor: "white",
//           position: "absolute",
//           top: "50%" /* Place the element vertically in the middle */,
//           left: "30%" /* Anchor the element to the right */,
//           transform: "translateY(-50%)" /* Adjust for vertical alignment */,
//           textAlign: "center",
//           borderRadius: "10px",
//         }}
//       >
//         <Typography
//           variant="h6"
//           component="div"
//           sx={{
//             fontWeight: "bold",
//             color: "#0054a6",
//             padding: "10px",
//           }}
//         >
//           {title}
//         </Typography>
//         <Typography
//           variant="body1"
//           component="div"
//           sx={{
//             padding: "10px",
//           }}
//         >
//           {body}
//         </Typography>
//         <Button
//           variant="contained"
//           endIcon={<SendIcon />}
//           sx={{ margin: "0 auto", backgroundColor: "#0054a6", width: "50%" }}
//         >
//           {buttonText}
//         </Button>
//       </Box>
//     </Box>
//   );
// };
import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type LandingCardProps = {
  image: string;
  title: string;
  body: string;
  buttonText: string;
};

export const LandingCard: React.FC<LandingCardProps> = ({
  image,
  title,
  body,
  buttonText,
}) => {
  return (
    // <Box
    //   component={"body"}
    //   sx={{
    //     height: "125px",
    //     marginTop: "5vh",
    //     display: "flex",
    //     minWidth: "calc(33% - 40px)",
    //     flexDirection: "column",
    //     mr: "20px",
    //   }}
    // >
    //   <Box
    //     sx={{
    //       width: "300px",
    //       height: "100px",
    //       margin: "auto",
    //       backgroundColor: "white",
    //       position: "relative",
    //       borderRadius: "10px",
    //     }}
    //   >
    //     <img
    //       src={image}
    //       alt="card1"
    //       style={{
    //         width: "100%",
    //         minHeight: "225px",
    //         maxHeight: "225px",
    //         borderRadius: "10px",
    //         objectFit: "cover",
    //       }}
    //     />
    //     <Box
    //       sx={{
    //         textAlign: "center",
    //         alignItems: "center",
    //         justifyContent: "space-between",
    //         display: "flex",
    //         flexDirection: "column",
    //         padding: "20px",
    //         borderRadius: "10px",
    //         position: "absolute",
    //         background: "white",
    //         top: "18%",
    //         right: "-45%",
    //         minHeight: "20vh",
    //         maxWidth: "35vh",
    //         minWidth: "35vh",
    //       }}
    //     >
    //       <Typography
    //         variant="h5"
    //         sx={{ fontWeight: "bold", marginBottom: "10px" }}
    //       >
    //         {title}
    //       </Typography>
    //       <Typography variant="body1" sx={{ marginBottom: "20px" }}>
    //         {body}
    //       </Typography>
    //       <Button
    //         variant="contained"
    //         endIcon={<SendIcon />}
    //         sx={{ backgroundColor: "#0054a6" }} // Adjust the button color as needed
    //       >
    //         {buttonText}
    //       </Button>
    //     </Box>
    //   </Box>
    // </Box>
    <Box
      sx={{
        minHeight: "250px",
        marginTop: "5vh",
        display: "flex",
        minWidth: "300px",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          height: "250px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <CardMedia
          component={"img"}
          image={image}
          alt="landing"
          sx={{
            width: "300px",
            height: "250px",
            borderRadius: "10px",
            "@media (max-height: 600px)": {
              display: "none",
            },
          }}
        />
        <CardContent
          sx={{
            position: "absolute",
            background: "white",
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10px",
            top: "10%",
            right: "-35%",
            height: "150px",
            borderRadius: "10px",
            width: "275px",
            "@media (max-height: 600px)": {
              position: "relative",
              top: "unset",
              right: "unset",
            },
            "@media (max-width: 1000px)": {
              right: "-10%",
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
            {title}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "20px" }}>
            {body}
          </Typography>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ backgroundColor: "#0054a6" }} // Adjust the button color as needed
          >
            {buttonText}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
