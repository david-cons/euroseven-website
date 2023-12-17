import { styled } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import {
  Box,
  Stack,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";

export const ActualizeDatePersonale: React.FC = () => {
  return (
    <Box
      sx={{
        height: "400px",
        width: "80%",
        margin: "0 auto",
        textAlign: "left",
      }}
    >
      <Stack
        spacing={4}
        sx={{
          mt: "50px",
        }}
      >
        <Typography fontFamily={"Catesque"} fontSize={"1rem"}>
          Actualizează-ți datele personale cu ușurință, rapid și în siguranță!
          Dacă ai efectuat modificări privind adresa de corespondență, adresa de
          e-mail, numărul de telefon sau alte informații relevante, te rugăm să
          ne anunți urmând pașii de mai jos:
        </Typography>
        <Stepper
          alternativeLabel
          activeStep={2}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={ColorlibStepIcon}
                sx={{ fontFamily: "Catesque" }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Typography fontFamily={"Catesque"} fontSize={"1rem"}>
          Este o modalitate simplă de a ne asigura că avem informațiile corecte
          și actualizate pentru tine.
        </Typography>
      </Stack>
    </Box>
  );
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  "1. Descarcă și completează acordul GDPR disponibil.",
  "2. Transmite-ne solicitarea ta împreună cu acordul GDPR semnat.",
  "3. Echipa noastră va verifica și actualiza datele tale în cel mai scurt timp posibil.",
];
