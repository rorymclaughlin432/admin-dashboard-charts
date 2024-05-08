import { Box, Typography, useTheme } from "@mui/material";
import { colorTokens } from "../themes";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: theme.palette.mode === "light" ? "#000000" : "#f6da54" }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.mode === "light" ? "#000000" : "#f6da54" }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;