import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Box, Typography, useTheme } from "@mui/material";
import { colorTokens } from "../themes";
let theme = "";
const CustomTheme = () => {
  theme = useTheme();
  theme.palette.mode = "light";
};
const colors = colorTokens(<CustomTheme />);

export const contactColumns = [
  { field: "registrarId", headerName: "Registrar ID" },
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
  },
];

export const teamColumns = [
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
          data-testid="access-level-cell"
        >
          {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
          {access === "manager" && <SecurityOutlinedIcon />}
          {access === "user" && <LockOpenOutlinedIcon />}
          <Typography
            color={<CustomTheme /> ? colors.grey[100] : "#FFFFFF"}
            sx={{ ml: "5px" }}
          >
            {access}
          </Typography>
        </Box>
      );
    },
  },
];
