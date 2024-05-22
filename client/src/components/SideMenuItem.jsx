import { Typography, useTheme } from "@mui/material";
import { colorTokens } from "../themes";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

export const SideMenuItem = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: theme.palette.mode === "light" ? "#FFFFFF" : colors.grey[100]
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };