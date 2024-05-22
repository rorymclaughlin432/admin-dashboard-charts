import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { colorTokens } from "../../themes";
import Header from "../../components/Header";
import UserList from "../../data/UserList";
import { teamColumns } from "../../data/DataColumns";

const Team = () => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const columns = teamColumns;

  return (
    <Box m="20px">
      <div aria-label="Team Data">
        <Header title="TEAM" subtitle="Managing the Team Members" />
        <Box
          data-testid="access-level-cell"
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
            "& .MuiTablePagination-toolbar": {
              color: theme.palette.mode === "light" ? "#FFFFFF" : "#FFFFFF",
            },

            "& MuiTablePagination-actions": {
              color: theme.palette.mode === "light" ? "#FFFFFF" : "#FFFFFF",
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
      </div>
    </Box>
  );
};

export default Team;
