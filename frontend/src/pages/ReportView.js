import { Flex, chakra, Text, Heading, Image, Button } from "@chakra-ui/react";
import Map from "../components/Map";
import { Marker, Popup } from "react-leaflet";

const ReportView = () => {
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
        <Flex flexDirection="column" gap="10px">
          <Heading size="2xl">Stray Cows</Heading>
          <Text> Reported in the Tarakeswor category anonymously</Text>
          <Text>Stray cows are roaming around , and they look starving. </Text>
          <Flex flexDirection="column">
            <Image
              src="https://images.pexels.com/photos/5667690/pexels-photo-5667690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              height="150px"
              width="200px"
            />
          </Flex>
        </Flex>
        <Flex alignItems="center" gap="10px">
          <Text>
            This was reported in your municipality. Do you want to report to the
            local authority ?
          </Text>
          <Button>Yes</Button>
          <Button colorScheme="red">No</Button>
        </Flex>
      </chakra.div>
      <Map isDraggable={false}>
        <Marker position={[27.742188491115126, 85.31107534890455]}>
          <Popup>
            <Flex flexDir="column">
              <Image src="https://images.pexels.com/photos/5667690/pexels-photo-5667690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
              <Text>Stray Cow</Text>
              <Text>
                Stray Cows roaming around my locality. I want to invite the
                attraction of my Tarakeswor municipality
              </Text>
            </Flex>
          </Popup>
        </Marker>
      </Map>
    </Flex>
  );
};

export default ReportView;
