import { Flex, chakra } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import Map from "../components/Map";
import Report from "../components/Report";
import ReportService from "../services/ReportService";

const Home = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    ReportService.getAll().then((response) => {
      setReports(response.results);
    });
  }, []);

  return (
    <Flex
      maxW="full"
      maxH="full"
      h="full"
      width="full"
      justifyContent="space-between"
      position="relative"
    >
      <chakra.div
        w="50%"
        px="5"
        py="3"
        display="flex"
        flexDir="column"
        gap="5px"
        maxHeight="calc(100vh - 60px)"
        overflowY="scroll"
      >
        {reports.map((report, key) => {
          return <Report key={key} title={report.title} />;
        })}
      </chakra.div>

      <Map isDraggable={false}>
        {reports.map((report, key) => {
          return (
            <Marker
              position={[Number(report.lat), Number(report.long)]}
              key={key}
            >
              <Popup>A simple example</Popup>
            </Marker>
          );
        })}
      </Map>
    </Flex>
  );
};

export default Home;
