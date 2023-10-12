import React, { useEffect, useState } from "react";
import { InvoiceEntity, PaymentEntity } from "../../types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Divider, MenuItem } from "@mui/material";
import { InvoiceService } from "../../services/InvoiceService";
import { StyledMenu } from "../admin/StyledMenu";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ModalEditFactura } from "./Modals/ModalEditFactura";

export const InvoiceMenu: React.FC<{
  id: number;
  invoices?: InvoiceEntity[] | null;
  handleOpenSnackbar: () => void;
  setInvoices?: React.Dispatch<React.SetStateAction<InvoiceEntity[]>> | null;
}> = ({ id, invoices, handleOpenSnackbar, setInvoices }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [invoice, setInvoice] = useState<InvoiceEntity | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    if (invoices) {
      try {
        await InvoiceService.deleteInvoice(id);
        setInvoices!(invoices.filter((invoice) => invoice.id !== id));
        handleOpenSnackbar();
        handleClose();
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const fetchedInvoice = await InvoiceService.getInvoiceById(id);
        setInvoice(fetchedInvoice);
      } catch (e) {
        console.log(e);
      }
    };

    fetchInvoice();
    if (localStorage.getItem("role") === "ROLE_ADMIN") {
      setIsAdmin(true);
    }
  }, []);

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
        {isAdmin && (
          <React.Fragment>
            <MenuItem onClick={handleOpenModal} disableRipple>
              <EditIcon />
              Editează
            </MenuItem>
            <ModalEditFactura
              invoice={invoice!}
              openModal={openModal}
              handleCloseModal={handleCloseModal}
              handleOpenSnackbar={handleOpenSnackbar}
              setInvoices={setInvoices}
              invoices={invoices!}
            />
            <Divider sx={{ my: 0.5 }} />
          </React.Fragment>
        )}
        <MenuItem onClick={handleDelete} disableRipple>
          <DeleteIcon />
          Stergere
        </MenuItem>
      </StyledMenu>
    </div>
  );
};
