import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Modal,
    Snackbar,
    Typography,
    styled,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "../../axios";

const defaultValues = {
    fileValue: undefined,
};

export const AdminConsum: React.FC<{
    openModal?: boolean;
    handleCloseModal?: () => void;
}> = ({ openModal, handleCloseModal }) => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

    const { handleSubmit, reset, control, setValue, getValues } = useForm<{
        fileValue: string | undefined;
    }>({
        defaultValues: defaultValues,
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        setFile(selectedFile);
    };

    const onSubmit = async (data: { fileValue: string | undefined }) => {
        if (!file) {
            setErrorSnackbarOpen(true);
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        // Simulating an async operation (e.g., file upload)

        try {
            await axios
                .post("http://localhost:8081/api/consum/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    setSuccessSnackbarOpen(true);
                    setLoading(false);
                });
        } catch (error) {
            setErrorSnackbarOpen(true);
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: "grid",
                gridRowGap: "20px",
                padding: "50px",
                margin: "10px 300px",
                position: "absolute" as "absolute",
                top: "40%",
                left: "30%",
                transform: "translate(-50%, -50%)",
                width: "70vh",
                minHeight: "20vh",
                bgcolor: "background.paper",
                boxShadow: 24,
                textAlign: "center",
            }}
        >
            <Typography variant="h4" fontFamily="Catesque" sx={{ mb: "5vh" }}>
                Uploadeaza Consum Lunar
            </Typography>

            <Controller
                name={"fileValue"}
                control={control}
                render={({
                    field: { onChange, ...props },
                    fieldState: { error },
                    formState,
                }) => (
                    <Button
                        component="label"
                        variant="text"
                        startIcon={<CloudUploadIcon />}
                        sx={{ width: "30%", color: "#0054a6", margin: "0 auto" }}
                    >
                        Incarca Excel Consum
                        <VisuallyHiddenInput
                            {...props}
                            onChange={(e) => {
                                handleFileChange(e);
                                onChange(e);
                            }}
                            required
                            value={""}
                            type="file"
                            disabled={loading}
                        />
                    </Button>
                )}
                defaultValue={""}
            />
            {loading && <CircularProgress sx={{ margin: "0 auto", width: "50%" }} />}
            <Snackbar
                open={successSnackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSuccessSnackbarOpen(false)}
            >
                <Alert onClose={() => setSuccessSnackbarOpen(false)} severity="success">
                    Consum incarcat cu success!
                </Alert>
            </Snackbar>
            <Snackbar
                open={errorSnackbarOpen}
                autoHideDuration={6000}
                onClose={() => setErrorSnackbarOpen(false)}
            >
                <Alert onClose={() => setErrorSnackbarOpen(false)} severity="error">
                    A aparut o eroare. Va rugam sa incercati din nou!
                </Alert>
            </Snackbar>
            <Button
                onClick={handleSubmit(onSubmit)}
                variant={"contained"}
                sx={{
                    backgroundColor: "#0054a6",
                    fontFamily: "Catesque",
                    width: "20%",
                    margin: "0 auto",
                }}
                disabled={loading || !file}
            >
                Uploadeaza
            </Button>
        </Box>
    );
};

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});
