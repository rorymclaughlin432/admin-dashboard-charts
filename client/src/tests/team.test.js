import { render, screen } from "@testing-library/react";
import Team from "./src/scenes/team/index";
//import Header from "../components/Header";
import UserList from "./src/data/UserList";
import { DataGrid } from "@mui/x-data-grid";
import { colorTokens } from "./src/themes";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { Typography, Box } from "@mui/material";
import { colors } from "@mui/material";
import { teamColumns } from "./src/data/DataColumns";
import { toHaveStyle } from '@testing-library/jest-dom';
import * as XDataGrid from '@mui/x-data-grid';

jest.mock('@mui/x-data-grid', () => {
  return {
    DataGrid: jest.fn(),
  };
});

jest.mock('@mui/material', () => {
  return {
    Box: jest.fn(),
    Typography: jest.fn(),
    colors: jest.fn(),
    useTheme: jest.fn(),
  };
});

jest.mock('@mui/icons-material/AdminPanelSettingsOutlined', () => {
  return {
    default: jest.fn(),
  };
});

jest.mock('./src/themes', () => {
  return {
    colorTokens: jest.fn(),
  };
});

jest.mock('./src/data/UserList', () => {
  return jest.fn();
});

jest.mock('./src/data/DataColumns', () => {
  return {
    teamColumns: jest.fn(),
  };
});


describe("Team", () => {
  it("should render the Header component with the correct title and subtitle", () => {
    render(<Team />);
    const header = screen.getByRole("heading", { name: "TEAM" });
    //expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("TEAM");
    expect(header).toHaveTextContent("Managing the Team Members");
  });

  // UserList() returns an empty array
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

  // Renders the Access Level column with a colored box and corresponding icon and text based on the access level value
  it("should render the Access Level column with the correct styling and content", () => {
    const { render: view } = render(<Team />);
    const accessLevelColumn = view.findWhere(
      (node) => node.prop("field") === "accessLevel"
    );
    const renderCell = accessLevelColumn.prop("renderCell");
    const mockRow = { access: "admin" };
    const mockTheme = { palette: { mode: "light" } };
    const mockColors = colorTokens(mockTheme.palette.mode);
    const { render: mockIcon } = render(<AdminPanelSettingsOutlinedIcon />);
    const { render: mockTypography } = render(<Typography />);
    const { render: mockBox } = render(<Box />);
    const mockUseTheme = jest
      .spyOn(require("@mui/material"), "useTheme")
      .mockReturnValue(mockTheme);
    const mockColorTokens = jest
      .spyOn(require("../../themes"), "colorTokens")
      .mockReturnValue(mockColors);
    const mockAdminPanelSettingsOutlinedIcon = jest
      .spyOn(
        require("@mui/icons-material/AdminPanelSettingsOutlined"),
        "default"
      )
      .mockReturnValue(mockIcon);
    const mockTypographyComponent = jest
      .spyOn(require("@mui/material"), "Typography")
      .mockReturnValue(mockTypography);
    const mockBoxComponent = jest
      .spyOn(require("@mui/material"), "Box")
      .mockReturnValue(mockBox);
    renderCell({ row: mockRow });
    expect(mockBox.prop("backgroundColor")).toEqual("#03C03C");
    expect(mockIcon.exists()).toBe(true);
    expect(mockTypography.prop("color")).toEqual(colors.grey[100]);
    expect(mockTypography.text()).toEqual("admin");
    mockUseTheme.mockRestore();
    mockColorTokens.mockRestore();
    mockAdminPanelSettingsOutlinedIcon.mockRestore();
    mockTypographyComponent.mockRestore();
    mockBoxComponent.mockRestore();
  });

  // Renders the DataGrid with a custom style defined in the sx prop
  it("should render the DataGrid with the correct custom style", () => {
    const mockTheme = { palette: { mode: "light" } };
    const mockColors = colorTokens(mockTheme.palette.mode);
    //render(<Team />);

    const { render: view } = render(<Team />);
    
    const dataGrid = jest.fn().mockReturnValue({
      rows: view,
      columns: teamColumns,
      sortModel: [{ field: "id", sort: "asc" }],
      pageSize: 25,
    });

    jest.restoreAllMocks(); // Restore all mocked functions
    //jest.spyOn(require("@mui/system"), "useTheme").mockReturnValue(mockTheme);
    const mockColorTokens = jest
      .spyOn(require("./src/themes"), "colorTokens")
      .mockReturnValue(mockColors);

    const mockDataGrid = jest
      .spyOn(require("@mui/x-data-grid"), "DataGrid")
      .mockReturnValue(dataGrid);

    const mockBox = jest.spyOn(require("@mui/material"), "Box");

    const mockDataGridComponent = jest.spyOn(require("@mui/x-data-grid"), "DataGrid");

    //const dataGrid = view.find(DataGrid);

    expect(mockBox.prop("m")).toEqual("40px 0 0 0");

    expect(mockBox.prop("height")).toEqual("75vh");

    expect(mockBox.prop("sx")).toEqual({
      "& .MuiDataGrid-root": {
        border: "none",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: "none",
      },
      "& .name-column--cell": {
        color: mockTheme.palette.mode === "light" ? colors.grey[100] : "#FFFFFF",
      },
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "#3676D1",
        borderBottom: "none",
      },
      "& .MuiDataGrid-virtualScroller": {
        backgroundColor: mockColors.primary[400],
      },
      "& .MuiDataGrid-footerContainer": {
        borderTop: "none",
        backgroundColor: "#3676D1",
      },
      "& .MuiCheckbox-root": {
        color: `#f6da54 !important`,
      },
      "& .MuiTablePagination-toolbar": {
        color: mockTheme.palette.mode === "light" ? "#FFFFFF" : "#FFFFFF",
      },
      "& MuiTablePagination-actions": {
        color: mockTheme.palette.mode === "light" ? "#FFFFFF" : "#FFFFFF",
      },
    });

    mockTheme.mockRestore();
    mockColorTokens.mockRestore();
    mockDataGrid.mockRestore();
    mockBox.mockRestore();
    mockDataGridComponent.mockRestore();


    

  });
});
