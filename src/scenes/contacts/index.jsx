import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { colorTokens } from "../../themes";
import Header from "../../components/Header";
import UserContactDetails from "../../data/UserContactDetails";

const Contacts = () => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const columns = [
    { field: "registrarId", headerName: "Registrar ID"},
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
        field: "address",
        headerName: "Address",
        flex: 1,
    },
    {
        field: "city",
        headerName: "City",
        flex: 1,
    },
    {
        field: "zipCode",
        headerName: "Zipcode",
        flex: 1,
    }
  ];
  return (
    <Box m="20px">
      <Header title="Contacts" subtitle={"List of Contacts"} />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color:
            theme.palette.mode === "light" ? colors.grey[100] : "#FFFFFF",
          },
          "& .MuiCheckbox-root": {
            color: `#f6da54 !important`,
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
          rows={UserContactDetails()}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
          //sortModel={[{ field: "id", sort: "asc" }]}
          pageSize={25}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
