import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import UserList from "../../data/UserList";
import { teamColumns } from "../../data/DataColumns";
import Team from "./index";
import { render, screen } from "@testing-library/react";
import { colorTokens } from "../../themes";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

jest.mock("@mui/material");
jest.mock("@mui/x-data-grid");
jest.mock("../../themes");
jest.mock("../../components/Header");
jest.mock("../../data/UserList");
jest.mock("../../data/DataColumns");

describe("<Team>", () => {
  it("renders the Header component with the correct title and subtitle", () => {
    render(<Team />);
    const header = screen.getByRole("heading", { name: "TEAM" });
    expect(header).toHaveTextContent("TEAM");
    expect(header).toHaveTextContent("Managing the Team Members");
  });

  it("should set records state to an empty array", () => {
    render(<Team />);
    const userList = screen.find(<UserList />);
    expect(userList.prop("records")).toEqual([]);
    expect(userList.prop("records")).toEqual([]);
    expect(userList.prop("records")).toEqual([]);
  });

  it("should render a DataGrid component with the correct props", () => {
    const { render: view } = render(<Team />);
    const dataGrid = view.find(DataGrid);
    expect(dataGrid.prop("checkboxSelection")).toEqual(true);
    expect(dataGrid.prop("rows")).toEqual(UserList());
    expect(dataGrid.prop("columns")).toEqual(teamColumns);
    expect(dataGrid.prop("sortModel")).toEqual([{ field: "id", sort: "asc" }]);
    expect(dataGrid.prop("pageSize")).toEqual(25);
    expect(dataGrid.prop("pageSize")).toEqual(25);
  });

  it("should render the Access Level column with the correct styling and content", () => {
    const { render: view } = render(<Team />);
    const accessLevelColumn = view.findWhere(
      (node) => node.prop("field") === "accessLevel"
    );
    const renderCell = accessLevelColumn.prop("renderCell");
    const mockRow = { access: "admin" };
    const mockTheme = { palette: { mode: "light" } };
    const mockColors = colorTokens(mockTheme.palette.mode);

    expect(renderCell(mockRow)).toEqual(
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: mockColors.primary[400],
          color: mockColors.grey[100],
          borderRadius: "5px",
          padding: "5px",
          width: "100px",
        }}
      >
        <AdminPanelSettingsOutlinedIcon />
        <Typography variant="body2">admin</Typography>
      </Box>
    );
  });
});
