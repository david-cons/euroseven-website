import { Box, Typography } from "@mui/material";

export const UserContract: React.FC<{}> = ({}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridRowGap: "20px",
        padding: "50px",
        margin: "10px 300px",
        position: "absolute" as "absolute",
        top: "50%",
        left: "30%",
        transform: "translate(-50%, -50%)",
        width: "50vh",
        minHeight: "15vh",
        bgcolor: "background.paper",
        boxShadow: 24,
        textAlign: "center",
      }}
    >
      <Typography
        fontFamily={"Catesque"}
        sx={{ color: "black", fontSize: "2rem", textAlign: "left" }}
      >
        CONTRACTUL TĂU
      </Typography>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", mt: "5vh" }}>
        <Box sx={{textAlign: "left" }}>
          <Typography fontFamily={"Catesque"}>Contract:</Typography>
          <Typography fontFamily={"Catesque"} sx={{mt: "6px"}}>Tip de Contract:</Typography>
          <Typography fontFamily={"Catesque"} sx={{mt: "6px"}}>Durată:</Typography>
          <Typography fontFamily={"Catesque"} sx={{mt: "6px"}}>Dată Inceput:</Typography>
          <Typography fontFamily={"Catesque"} sx={{mt: "6px"}}>Dată Terminare:</Typography>
        </Box>
        <Box sx={{textAlign: "right"}}>
          <Typography fontFamily={"Catesque"} fontWeight={"bold"}>Nr. 12324</Typography>
          <Typography fontFamily={"Catesque"} fontWeight={"bold"} sx={{mt: "5px"}}>Fix</Typography>
          <Typography fontFamily={"Catesque"} fontWeight={"bold"} sx={{mt: "5px"}}>1 an</Typography>
          <Typography fontFamily={"Catesque"} fontWeight={"bold"} sx={{mt: "5px"}}>01/01/2023</Typography>
          <Typography fontFamily={"Catesque"} fontWeight={"bold"} sx={{mt: "5px"}}>01/01/2024</Typography>
        </Box>
      </Box>
    </Box>
  );
};
