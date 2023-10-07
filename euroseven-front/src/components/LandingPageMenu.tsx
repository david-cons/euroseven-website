import { Box, Button } from "@mui/material";
import { MenuListItem } from "./MenuListItem";
import PersonIcon from "@mui/icons-material/Person";

interface LandingPageMenuProps {
  boxRef: React.MutableRefObject<HTMLDivElement | null>;
  isOpen: boolean;
}

export const LandingPageMenu = (props: LandingPageMenuProps) => {
  const { boxRef, isOpen } = props;

  return (
    <Box
      ref={boxRef}
      sx={{
        width: "40vh",
        height: "61vh",
        backgroundColor: "#0054a6",
        zIndex: isOpen ? 1 : -1,
        position: "absolute",
        border: "0.5px solid black",
        top: "1",
        right: "0",
        mt: "10px",
        mr: "37px",
        
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "6vh",
          borderBottom: "0.5px solid rgb(240,240,240, .5)",
          position: "relative",
          
        }}
      >
        <Button
          variant="contained"
          startIcon={<PersonIcon sx={{ color: "white", mb: "1px" }} />}
          sx={{
            borderColor: "white",
            color: "white",
            ":hover": {
              borderColor: "white",
              color: "white",
            },
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "4%",
            fontFamily: "Catesque",
          }}
          href="/login"
        >
          Contul Meu
        </Button>
      </Box>
      <MenuListItem label={"EURO7 la tine acasă"} />
      <MenuListItem label={"MyEURO7"} />
      <MenuListItem label={"Contract Online"} />
      <MenuListItem label={"Despre Noi"} />
      <MenuListItem label={"Contact"} />
      <MenuListItem label={"Etică"} />
      <MenuListItem label={"Legal"} />
      <MenuListItem label={"Întrebări Frecvente"} />
      <MenuListItem label={"A.N.P.C"} />
    </Box>
  );
};
