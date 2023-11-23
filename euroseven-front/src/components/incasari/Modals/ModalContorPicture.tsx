import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { MeterReadingEntity } from "../../../types";
import { MeterReadingService } from "../../../services/MeterReadingService";

export const ModalContorPicture = (props: {
  openModal: boolean;
  handleCloseModal: () => void;
  meterReadingId: number;
}) => {
  const { openModal, handleCloseModal, meterReadingId } = props;

  const [meterReading, setMeterReading] = useState<MeterReadingEntity | null>();
  const [imgSrc, setImgSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMeterReading = async () => {
      setIsLoading(true);
      await MeterReadingService.getMeterReadingById(meterReadingId).then(
        (res) => {
          setMeterReading(res);
          setIsLoading(false);
        }
      );
    };
    if (meterReadingId) {
      fetchMeterReading();
    }
  }, [meterReadingId]);

  useEffect(() => {
    const imageSrc = `data:image/jpeg;base64,${meterReading?.picture}`;
    setImgSrc(imageSrc);
  }, [meterReading]);

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "grid",
          gridRowGap: "20px",
          padding: "50px",
          margin: "10px 300px",
          position: "absolute" as "absolute",
          top: "40%",
          left: "40%",
          transform: "translate(-50%, -50%)",
          width: "100vh",
          minHeight: "50vh",
          bgcolor: "background.paper",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" component="h2">
          Poza Contor
        </Typography>
        <Box>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <img
              src={imgSrc}
              alt="meter-reading"
              height={"500px"}
              width={"500px"}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};
