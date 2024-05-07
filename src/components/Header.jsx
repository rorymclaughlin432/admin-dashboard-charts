import { Typography, Box, useTheme } from "@mui/material";
import { colorTokens } from "../themes";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  return (
    <Box mb="20px">
      <Typography
        variant="h2"
        color= {theme.palette.mode === "light" ? "#000000" : colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color= {theme.palette.mode === "light" ? "#000000" : "#f6da54"}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;