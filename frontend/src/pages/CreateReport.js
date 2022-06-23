import {
  Box,
  Select,
  GridItem,
  chakra,
  FormLabel,
  FormControl,
  Stack,
  Checkbox,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import ReportService from "../services/ReportService";

const CreateReport = () => {
  const [report, setReport] = useState({
    images: [],
    attachments: [],
    lat: "",
    long: "",
    full_location: "",
    description: "",
    title: "",
    nature_of_incident: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);

  const [isAnonymous, setIsAnonymous] = useState(false);

  const setLatAndLong = (lat, lng) => {
    setReport({ ...report, lat: lat, long: lng });
  };

  useEffect(() => {
    ReportService.getCategories().then((response) => {
      setCategories(response.results);
    });
  }, []);

  console.log("categories", categories);

  const submitReport = (e) => {
    const formData = new FormData();
    for (const key in report) {
      formData.append(key, report[key]);
    }
    ReportService.create(formData)
      .then((response) => {
        setCategories(response.results);
      })
      .catch((err) => {
        console.log("Error creating report", err);
      });
    e.preventDefault();
  };

  return (
    <Box
      bg="#edf3f8"
      _dark={{
        bg: "#111",
      }}
      w="full"
      p={10}
      display="flex"
      justifyContent="center"
    >
      <chakra.form
        method="POST"
        rounded={[null, "md"]}
        overflow={{
          sm: "hidden",
        }}
        width="lg"
        onSubmit={submitReport}
      >
        <Stack
          px={4}
          py={5}
          bg="white"
          _dark={{
            bg: "#141517",
          }}
        >
          <FormControl alignItems="center">
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="blue.700"
              _dark={{
                color: "gray.50",
              }}
            >
              Upload Images
            </FormLabel>
            <Input
              type="file"
              onChange={(e) => {
                setReport({
                  ...report,
                  images: [...report.images, e.target.files],
                });
              }}
            />
          </FormControl>
          <FormControl justifyContent="center">
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color="blue.700"
              _dark={{
                color: "gray.50",
              }}
            >
              Additional media attachments
            </FormLabel>
            <Input
              type="file"
              onChange={(e) => {
                setReport({
                  ...report,
                  attachments: [...report.attachments, e.target.files],
                });
              }}
            />
          </FormControl>
          <FormControl as={GridItem} colSpan={[3, 2]}>
            <FormLabel fontSize="sm" fontWeight="md" color="blue.700">
              Title
            </FormLabel>
            <Input
              type="text"
              placeholder="E.g. Pot Holes"
              focusBorderColor="blue.400"
              rounded="md"
              width="full"
              onChange={(e) => {
                setReport({
                  ...report,
                  title: e.target.value,
                });
              }}
            />
          </FormControl>
          <FormControl id="email" mt={1}>
            <FormLabel fontSize="sm" fontWeight="md" color="blue.700">
              Nature of report
            </FormLabel>
            <Select
              placeholder="Select option"
              onChange={(e) => {
                setReport({ ...report, nature_of_incident: e.target.value });
              }}
              value={report.nature_of_incident}
            >
              <option value="NORMAL">Normal</option>
              <option value="EMERGENCY">Danger</option>
            </Select>
          </FormControl>
          <FormControl id="email" mt={1}>
            <FormLabel fontSize="sm" fontWeight="md" color="blue.700">
              Content Description
            </FormLabel>
            <Textarea
              placeholder="E.g. I was passing by the road and saw pot holess"
              mt={1}
              rows={3}
              onChange={(e) => {
                setReport({
                  ...report,
                  description: e.target.value,
                });
              }}
              shadow="sm"
              focusBorderColor="blue.400"
              fontSize={{
                sm: "sm",
              }}
            />
          </FormControl>
          <FormControl id="email" mt={1}>
            <FormLabel fontSize="sm" fontWeight="md" color="blue.700">
              Category
            </FormLabel>

            <Select
              placeholder="Select Category"
              onChange={(e) => {
                setReport({ ...report, category: e.target.value });
              }}
              value={report.category}
            >
              {categories.map((category, index) => {
                return (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <FormControl id="email" mt={1}>
            <FormLabel fontSize="sm" fontWeight="md" color="blue.700">
              Marker Location
            </FormLabel>
            <Input
              mt={1}
              shadow="sm"
              focusBorderColor="blue.400"
              fontSize={{
                sm: "sm",
              }}
              value={`${report.lat} ${report.long}`}
              type="text"
              disabled
            />
          </FormControl>
          <FormControl id="email" mt={1}>
            <FormLabel fontSize="sm" fontWeight="md" color="blue.700">
              Location
            </FormLabel>
            <Input
              mt={1}
              shadow="sm"
              focusBorderColor="blue.400"
              fontSize={{
                sm: "sm",
              }}
              type="text"
              onChange={(e) => {
                setReport({ ...report, full_location: e.target.value });
              }}
            />
          </FormControl>
          <FormControl>
            <Checkbox
              onChange={(e) => setIsAnonymous(e.target.checked)}
              value={isAnonymous}
            >
              Upload as anonymous ?
            </Checkbox>
          </FormControl>
        </Stack>
        <Box
          px={{
            base: 4,
            sm: 6,
          }}
          py={3}
          bg="gray.50"
          _dark={{
            bg: "#121212",
          }}
          textAlign="right"
        >
          <Button
            type="submit"
            colorScheme="blue"
            _focus={{
              shadow: "",
            }}
            fontWeight="md"
          >
            Submit
          </Button>
        </Box>
      </chakra.form>
      <chakra.div position="relative" width="50%">
        <Map isDraggable={true} setLatAndLong={setLatAndLong} />
      </chakra.div>
    </Box>
  );
};

export default CreateReport;
