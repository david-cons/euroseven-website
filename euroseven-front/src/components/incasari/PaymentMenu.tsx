import { useState } from "react";
import { PaymentEntity } from "../../types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, MenuItem } from "@mui/material";
import { InvoiceService } from "../../services/InvoiceService";
import { StyledMenu } from "../admin/StyledMenu";
import DeleteIcon from "@mui/icons-material/Delete";

export const PaymentMenu: React.FC<{
  id: number;
  payments?: PaymentEntity[] | null;
  handleOpenSnackbar: () => void;
  setPayments?: React.Dispatch<React.SetStateAction<PaymentEntity[]>> | null;
}> = ({ id, payments, handleOpenSnackbar, setPayments }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    if (payments) {
      try {
        console.log("hey");
        await InvoiceService.deletePayment(id);
        setPayments!(payments.filter((payment) => payment.id !== id));
        handleOpenSnackbar();
        handleClose();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          height: "30px",
          fontFamily: "Catesque",
          backgroundColor: "#0054a6",
        }}
      >
        Opțiuni
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete} disableRipple>
          <DeleteIcon />
          Stergere
        </MenuItem>
      </StyledMenu>
    </div>
  );
};
