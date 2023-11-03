import { Box, Modal, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { MeterReadingEntity } from "../../../types";
import { MeterReadingService } from "../../../services/MeterReadingService";

export const ModalContorPicture = (props: {
  openModal: boolean;
  handleCloseModal: () => void;
  meterReadingId: number;
}) => {
  const { openModal, handleCloseModal } = props;

  const [meterReading, setMeterReading] = useState<MeterReadingEntity | null>();
  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    const fetchMeterReading = async () => {
      await MeterReadingService.getMeterReadingById(props.meterReadingId).then(
        (res) => {
          setMeterReading(res);
        }
      );
    };
    fetchMeterReading();
  }, []);

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
          <img
            src={imgSrc}
            alt="meter-reading"
            height={"500px"}
            width={"500px"}
          />
        </Box>
      </Box>
    </Modal>
  );
};
