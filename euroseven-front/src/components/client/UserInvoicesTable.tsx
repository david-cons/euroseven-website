import { useEffect, useState } from "react";
import { InvoiceEntity } from "../../types";
import { InvoiceService } from "../../services/InvoiceService";
import { Box, Typography, Button } from "@mui/material";
import axios from "../../axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CustomNoRowsOverlay from "../incasari/CustomNoRowsOverlay";
import { reverseArray } from "../../utils";

export const UserInvoicesTable = (props: {
  codClient: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<String>>;
}) => {
  const [invoices, setInvoices] = useState<InvoiceEntity[]>([]);

  const columns: GridColDef[] = [
    {
      field: "id",
    },
    {
      field: "paid",
      type: "boolean",
    },
    {
      field: "nrFactura",
      headerName: "Factură",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return <div>{`Nr. ${params.value}`}</div>;
      },
    },
    {
      field: "price",
      headerName: "Sumă",
      width: 175,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <div
            style={{
              fontWeight: "bold",
            }}
          >
            {params.value + " RON"}
          </div>
        );
      },
    },
    {
      field: "restDePlata",
      headerName: "Rest de Plată",
      width: 175,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <div
            style={{
              fontWeight: "bold",
            }}
          >
            {params.value + " RON"}
          </div>
        );
      },
    },
    {
      field: "created_date",
      headerName: "Dată Emitere",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "due_date",
      headerName: "Dată Scadentă",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "descarca",
      headerName: "Descarcă",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <Button
            variant="outlined"
            onClick={() => handleDownload(params.row.nrFactura)}
          >
            Descarcă
          </Button>
        );
      },
      align: "center",
      headerAlign: "center",
    },
    {
      field: "plateste",
      headerName: "Plătește",
      width: 175,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return params.row.paid === true ? (
          <Box
            sx={{
              height: "30px",
              width: "115px",
              background: "#0054a6",
              borderRadius: "5px",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography fontFamily={"Catesque"} color={"white"}>
              Plătită
            </Typography>
          </Box>
        ) : (
          <Button
            variant="outlined"
            onClick={() => checkoutInvoice(params.row.id)}
          >
            Plătește
          </Button>
        );
      },
      align: "center",
      headerAlign: "center",
    },
  ];

  const checkoutInvoice = async (invoiceId: number) => {
    axios
      .post(
        "http://localhost:8081/api/checkout/create-checkout-session/" +
          invoiceId
      )
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      });
  };

  const handleDownload = async (nrFactura: number) => {
    try {
      const axiosResponse = await InvoiceService.downloadInvoice(
        `factura-${nrFactura}`
      );
      const blobData = axiosResponse.data;
      // Create a blob URL
      const blob = new Blob([blobData], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      // Use a temporary <a> element to initiate the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `factura-${nrFactura}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading the invoice:", error);
    }
  };
  
  useEffect(() => {
    const fetchUserInvoices = async () => {
      await InvoiceService.searchInvoices(props.codClient.toString())
        .then((res) => {
          setInvoices(res);
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchUserInvoices();
  }, []);

  return (
    <Box>
      {invoices.length === 0 ? (
        <Typography fontFamily="Catesque">Nici-o factură.</Typography>
      ) : (
        <DataGrid
          rows={reverseArray(invoices)}
          columns={columns}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
                paid: false,
              },
            },
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          autoHeight
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          sx={{
            fontFamily: "Catesque",
            backgroundColor: "transparent",
            borderRadius: "25px",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#E4E5E6",
            },
            "& .MuiDataGrid-columnsContainer": {
              marginLeft: "16px", // Adjust the value as needed
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            width: "80%",
            margin: "0 auto",
          }}
        />
      )}
    </Box>
  );
};
