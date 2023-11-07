import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { UserService } from "../../services/UserService";
import { UserEntity } from "../../types";

const defaultValues = {
  passwordValue: "",
  confirmPasswordValue: "",
};

export const ModalParola: React.FC<{
  open: boolean;
  handleClose: () => void;
  userId: any;
  setUser: React.Dispatch<React.SetStateAction<UserEntity | null>>;
  setIsDefaultPassword: React.Dispatch<React.SetStateAction<Boolean>>;
}> = ({ open, handleClose, userId, setUser, setIsDefaultPassword }) => {
  const { handleSubmit, reset, control, setValue, getValues } = useForm<{
    passwordValue: string;
    confirmPasswordValue: string;
  }>({
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: {
    passwordValue: string;
    confirmPasswordValue: string;
  }) => {

    console.log(data);
    const password = data.passwordValue;
    const confirmPassword = data.confirmPasswordValue;

    if (password !== confirmPassword) {
      console.log("Parolele nu coincid");
    } else {
      await UserService.updatePassword(userId, password).then((res) => {
        console.log(res);
        setUser(res);
        setIsDefaultPassword(false);
        handleClose();
      });
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "grid",
          gridRowGap: "20px",
          padding: "25px",
          margin: "10px 300px",
          position: "absolute" as "absolute",
          top: "40%",
          left: "40%",
          transform: "translate(-50%, -50%)",
          width: "100vh",
          minHeight: "25vh",
          bgcolor: "background.paper",
          boxShadow: 24,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" component="h2">
          Schimbare Parola
        </Typography>
        <Controller
          name={"passwordValue"}
          control={control}
          render={({
            field: { onChange, ...props },
            fieldState: { error },
            formState,
          }) => (
            <TextField
              {...props}
              required
              name={"parola"}
              id={"parola"}
              size={"small"}
              label={"Parola Noua"}
              type="password"
              onChange={onChange}
              error={!!error}
              sx={{
                "& .MuiInputBase-input": {
                  color: "black", // Text color
                  fontFamily: "Catesque", // Font family
                },
                "& input:disabled": {
                  color: "black", // Text color
                  fontFamily: "Catesque", // Font family
                  WebkitTextFillColor: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black", // Label color
                  fontFamily: "Catesque", // Font family
                  fontSize: "18px",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#0054a6", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#0054a6", // Hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0054a6", // Focused border color
                  },
                },
              }}
            />
          )}
          defaultValue={""}
        />
        <Controller
          name={"confirmPasswordValue"}
          control={control}
          render={({
            field: { onChange, ...props },
            fieldState: { error },
            formState,
          }) => (
            <TextField
              {...props}
              required
              name={"cparola"}
              id={"cparola"}
              size={"small"}
              label={"Confirma Parola"}
              type="password"
              onChange={onChange}
              error={!!error}
              sx={{
                "& .MuiInputBase-input": {
                  color: "black", // Text color
                  fontFamily: "Catesque", // Font family
                },
                "& input:disabled": {
                  color: "black", // Text color
                  fontFamily: "Catesque", // Font family
                  WebkitTextFillColor: "black",
                },
                "& .MuiInputLabel-root": {
                  color: "black", // Label color
                  fontFamily: "Catesque", // Font family
                  fontSize: "18px",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#0054a6", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#0054a6", // Hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0054a6", // Focused border color
                  },
                },
              }}
            />
          )}
          defaultValue={""}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          variant={"contained"}
          sx={{ backgroundColor: "#0054a6", fontFamily: "Catesque" }}
        >
          Confirma Parola
        </Button>
        <Button
          onClick={() => {
            reset({
              passwordValue: "",
              confirmPasswordValue: "",
            });
          }}
          variant={"outlined"}
          sx={{
            borderColor: "#0054a6",
            color: "#0054a6",
            fontFamily: "Catesque",
          }}
        >
          Resetare
        </Button>
      </Box>
    </Modal>
  );
};
