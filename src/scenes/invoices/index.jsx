import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { colorTokens } from "../../themes";
import Header from "../../components/Header";
import UserInvoices from "../../data/UserInvoices";

const Invoices = () => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: ({ row: { cost } }) => {
        return <Typography color={colors.grey[100]}>{`$${cost}`}</Typography>;
      },
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Invoice Date",
      flex: 1,
    },
  ];
  return (
    <Box m="20px">
      <Header title="Invoices" subtitle="List of Invoices" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color:
              theme.palette.mode === "light" ? colors.grey[100] : "#FFFFFF",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#3676D1",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#3676D1",
          },
          "& .MuiCheckbox-root": {
            color: `#f6da54 !important`,
          },
          "& MuiCheckbox-root": {
            color:
              theme.palette.mode === "light" ? colors.grey[100] : "#FFFFFF",
          },
          "& .MuiTablePagination-toolbar" : {
            color:
              theme.palette.mode === "light" ? "#FFFFFF" : "#FFFFFF",
          },

          "& MuiTablePagination-actions" : {
            color:
              theme.palette.mode === "light" ? "#FFFFFF" : "#FFFFFF",
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={UserInvoices()}
          columns={columns}
          sortModel={[{ field: "id", sort: "asc" }]}
          pageSize={25}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
