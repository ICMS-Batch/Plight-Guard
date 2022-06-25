import { Flex, chakra, Image, Text } from "@chakra-ui/react";
import { Marker, Popup } from "react-leaflet";
import Map from "../components/Map";
import Report from "../components/Report";

const Home = () => {
  // const [reports, setReports] = useState([]);

  const reports = [
    {
      id: 13,
      lat: "27.766190642387496",
      long: "85.29870331954926",
      full_location: "Tarakeswor , Kathmandu",
      description: "Conjusted wires",
      nature_of_incident: "NORMAL",
      title: "Conjusted wires",
      created_at: "14th June , Tuesday",
      updated_at: "15th June , Wednesday",
      created_by: null,
      category: 2,
      municipality: 1,
      image:
        "https://images.unsplash.com/photo-1528724977141-d90af338860c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2110&q=80",
    },
    {
      id: 15,
      lat: "27.742188491115126",
      long: "85.31107534890455",
      full_location: "Tarakeswor , Kathmandu",
      description: "Stray cows roamind around my area",
      nature_of_incident: "NORMAL",
      title: "Stray Cows Roaming around",
      created_at: "20th June , Tuesday",
      updated_at: "2022-06-24T04:10:20.802743Z",
      created_by: null,
      category: 2,
      municipality: 1,
      image:
        "https://images.pexels.com/photos/5667690/pexels-photo-5667690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];
  // useEffect(() => {
  //   ReportService.getAll().then((response) => {
  //     setReports(response.results);
  //   });
  // }, []);

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
          return (
            <Report
              key={key}
              title={report.title}
              createdAt={report.created_at}
              id={report.id}
              image={report.image}
            />
          );
        })}
      </chakra.div>

      <Map isDraggable={false}>
        {reports.map((report, key) => {
          return (
            <Marker
              position={[Number(report.lat), Number(report.long)]}
              key={key}
            >
              <Popup>
                <Flex flexDir="column">
                  <Image src={report.image} />
                  <Text>{report.title} </Text>
                  <Text>{report.description}</Text>
                </Flex>
              </Popup>
            </Marker>
          );
        })}
      </Map>
    </Flex>
  );
};

export default Home;
