import { Box } from "@mui/material";
import Header from "../../components/Header";
import MapChart from "../../components/MapChart";

const Map = () => {
  return (
    <Box m="20px">
      <Header title="Map Chart" subtitle="" />
      <Box height="">
        <MapChart />
      </Box>
    </Box>
  );
};

export default Map;