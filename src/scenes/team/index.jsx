import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { colorTokens } from "../../themes";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import UserList from "../../data/UserList";

const Team = () => {
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
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      headerAlign: "center",
      align: "left",
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="90%"
            m="10px"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? "#03C03C"
                : access === "manager"
                ? "#B36C00"
                : "#3676D1"
            }
            borderRadius="4px"
            align="left"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography
              color={
                theme.palette.mode === "light" ? colors.grey[100] : "#FFFFFF"
              }
              sx={{ ml: "5px" }}
            >
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
          rows={UserList()}
          columns={columns}
          sortModel={[{ field: "id", sort: "asc" }]}
          pageSize={25}
        />
      </Box>
    </Box>
  );
};

export default Team;
