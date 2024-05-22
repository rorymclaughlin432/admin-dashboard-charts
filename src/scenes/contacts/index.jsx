import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { colorTokens } from "../../themes";
import Header from "../../components/Header";
import UserContactDetails from "../../data/UserContactDetails";
import { contactColumns } from "../../data/DataColumns";

const Contacts = () => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const columns = contactColumns;
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
