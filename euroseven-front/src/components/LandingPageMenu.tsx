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
        width: "350px",
        height: "470px",
        backgroundColor: "#0054a6",
        zIndex: isOpen ? 1 : -1,
        position: "absolute",
        border: "0.5px solid black",
        top: -5,
        right: -10,
        mt: "8px",
        mr: "8px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "60px",
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
      <MenuListItem label={"MySeven"} />
      <MenuListItem label={"Despre Noi"} />
      <MenuListItem label={"Informații Utile"} />
      <MenuListItem label={"Documente"} />
      <MenuListItem label={"Plafonare"} />
      <MenuListItem label={"Etică"} />
      <MenuListItem label={"Legal"} />
      <MenuListItem label={"Întrebări Frecvente"} />
      <MenuListItem label={"A.N.P.C"} />
    </Box>
  );
};
