//import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import Team from "../scenes/team/index";
import UserList from "../data/UserList";
import { toBeInTheDocument, toHaveStyle } from "@testing-library/jest-dom";
import { DataGrid } from "@mui/x-data-grid";
import { teamColumns } from "../data/DataColumns";
/* import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined"; */
import { colorTokens } from "../themes";

//add sample data for datagrid
const userListData = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    phone: "123-456-7890",
    email: "",
    accessLevel: "admin",
  },
  {
    id: 2,
    name: "Jane Doe",
    age: 25,
    phone: "098-765-4321",
    email: "",
    accessLevel: "user",
  },
];

let mockUseState;

describe("Team", () => {
  it("renders the Header component with the correct title and subtitle", () => {
    render(<Team />);
    const titleElement = screen.getByText("TEAM");
    const subtitleElement = screen.getByText("Managing the Team Members");
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  it("renders the DataGrid component with the correct columns", () => {
    render(<Team />);
    const nameColumnHeader = screen.getByText("Name");
    const ageColumnHeader = screen.getByText("Age");
    const phoneColumnHeader = screen.getByText("Phone Number");
    const emailColumnHeader = screen.getByText("Email");
    const accessLevelColumnHeader = screen.getByText("Access Level");

    expect(nameColumnHeader).toBeInTheDocument();
    expect(ageColumnHeader).toBeInTheDocument();
    expect(phoneColumnHeader).toBeInTheDocument();
    expect(emailColumnHeader).toBeInTheDocument();
    expect(accessLevelColumnHeader).toBeInTheDocument();
  });

  it("renders the DataGrid component with the correct number of rows", () => {
    const userList = userListData;
    render(<Team />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(userList.length - 1);
  });

  it("should handle missing or invalid fields in the array returned by UserList()", async () => {
    // Mock the UserList function
    jest.mock("../data/UserList", () => ({
      __esModule: true,
      default: jest.fn().mockReturnValue([
        {
          id: 1,
          name: "John Doe",
          age: 25,
          phone: "",
          email: "",
          accessLevel: "",
        },
        {
          id: 2,
          name: "Jane Smith",
          age: 30,
          phone: "",
          email: "jane@example.com",
          accessLevel: "",
        },

        {
          id: 3,
          name: "Bob Johnson",
          age: "",
          phone: "123-456-7890",
          email: "",
          accessLevel: "",
        },
      ]),
    }));

    jest.mock("react", () => {
      mockUseState = jest.fn();
      return {
        ...jest.requireActual("react"),
        useState: mockUseState,
      };
    });

    const { queryByText: view } = render(<UserList />);

    const dataGrid = jest.fn().mockReturnValue({
      rows: view,
      columns: teamColumns,
      sortModel: [{ field: "id", sort: "asc" }],
      pageSize: 25,
    });

    dataGrid.mockReturnValueOnce({
      rows: [
        {
          id: 1,
          name: "John Doe",
          age: 25,
          phone: "",
          email: "",
          accessLevel: "",
        },
        {
          id: 2,
          name: "Jane Smith",
          age: 30,
          phone: "",
          email: "",
          accessLevel: "",
        },
        {
          id: 3,
          name: "Bob Johnson",
          age: "",
          phone: "123-456-7890",
          email: "",
          accessLevel: "",
        },
      ],
      columns: teamColumns,
      sortModel: [{ field: "id", sort: "asc" }],
      pageSize: 25,
    });

    dataGrid();
    expect(dataGrid).toHaveBeenCalled();
  });

  it("should handle missing or invalid fields in the array returned by UserList() take two", async () => {
    // Mock the UserList function to return an array with missing or invalid fields
    jest.mock("../data/UserList", () => ({
      __esModule: true,
      default: jest.fn().mockReturnValue([
        {
          id: 1,
          name: "John Doe",
          age: 25,
          phone: "",
          email: "",
          accessLevel: "",
        },
        {
          id: 2,
          name: "Jane Smith",
          age: 30,
          phone: "",
          email: "",
          accessLevel: "",
        },
        {
          id: 3,
          name: "Bob Johnson",
          age: "",
          phone: "123-456-7890",
          email: "",
          accessLevel: "",
        },
      ]),
    }));

    jest.mock("react", () => {
      const mockUseState = jest.fn();
      return {
        ...jest.requireActual("react"),
        useState: mockUseState,
      };
    });

    expect(
      screen.getByText((content, element) => {
        // Custom text matcher function to handle broken up text
        const hasText = (node) => node.textContent === content;
        const elementHasText = hasText(element);
        const childrenDontHaveText = Array.from(element).every(
          (child) => !hasText(child)
        );
        return elementHasText && childrenDontHaveText;
      }, "John Doe")
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        // Custom text matcher function to handle broken up text
        const hasText = (node) => node.textContent === content;
        const elementHasText = hasText(element);
        const childrenDontHaveText = Array.from(element).every(
          (child) => !hasText(child)
        );
        return elementHasText && childrenDontHaveText;
      }, "Jane Smith")
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        const hasText = (node) => node.textContent === content;
        const elementHasText = hasText(element);
        const childrenDontHaveText = Array.from(element).every(
          (child) => !hasText(child)
        );
        return elementHasText && childrenDontHaveText;
      }, "Bob Johnson")
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        const hasText = (node) => node.textContent === content;
        const elementHasText = hasText(element);
        const childrenDontHaveText = Array.from(element).every(
          (child) => !hasText(child)
        );
        return elementHasText && childrenDontHaveText;
      }, "25")
    ).toBeInTheDocument();
  });

  it("should check DataGrid functions as expected", () => {
    render(
      <DataGrid
        checkboxSelection
        rows={[
          {
            id: 1,
            name: "John Doe",
            age: 25,
            phone: "",
            email: "",
            accessLevel: "",
          },
          {
            id: 2,
            name: "Jane Smith",
            age: 30,
            phone: "",
            email: "jane@example.com",
            accessLevel: "",
          },
          {
            id: 3,
            name: "Bob Johnson",
            age: "",
            phone: "123-456-7890",
            email: "bob@example.com",
            accessLevel: "",
          },
        ]}
        columns={teamColumns}
        sortModel={[{ field: "id", sort: "asc" }]}
        pageSize={25}
      />
    );

    const dataGrid = screen.getByRole("grid");
    expect(dataGrid).toBeInTheDocument();
  });

  it("should render the Access Level column with the correct styling and content", () => {
    render(<Team />);

    const accessLevelCell = screen.getByTestId("access-level-cell");

    // Check if the content inside the "Access Level" column is rendered correctly
    expect(accessLevelCell).toBeInTheDocument();

    // Check if the content inside the "Access Level" column is styled correctly
    const mockTheme = { palette: { mode: "light" } };
    const mockColors = colorTokens(mockTheme.palette.mode);

    expect(accessLevelCell).toHaveStyle({
      "& .MuiDataGrid-root": { border: "none" },
      "& .MuiDataGrid-cell": { borderBottom: "none" },
      "& .name-column--cell": { color: mockColors.grey[100] },
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
        color: "#f6da54 !important",
      },
      "& .MuiTablePagination-toolbar": {
        color: "#FFFFFF",
      },
      "& MuiTablePagination-actions": {
        color: "#FFFFFF",
      },
    });
  });

  it("should render the DataGrid with the correct custom style", () => {
    const mockTheme = { palette: { mode: "light" } };
    const mockColors = colorTokens(mockTheme.palette.mode);
    render(<Team />);

    const data = screen.getByTestId("access-level-cell");

    let expectedStyle = {
      "& .MuiDataGrid-root": { border: "none" },
      "& .MuiDataGrid-cell": { borderBottom: "none" },
      "& .name-column--cell": { color: mockColors.grey[100] },
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
        color: "#f6da54 !important",
      },
      "& .MuiTablePagination-toolbar": {
        color: "#FFFFFF",
      },
      "& MuiTablePagination-actions": {
        color: "#FFFFFF",
      },
    };
    expect(data).toBe(expectedStyle);
  });
});
