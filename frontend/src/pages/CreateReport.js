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
import { useNavigate } from "react-router-dom";
import ReportService from "../services/ReportService";

const CreateReport = () => {
  const [report, setReport] = useState({
    images: [],
    attachments: [],
    lat: "",
    long: "",
    full_location: "",
    description: "",
    municipality: "",
    title: "",
    nature_of_incident: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);

  const [municipalities, setMunicipalities] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const navigate = useNavigate();

  const setLatAndLong = (lat, lng) => {
    setReport({ ...report, lat: lat, long: lng });
  };

  useEffect(() => {
    ReportService.getCategories().then((response) => {
      setCategories(response.results);
    });

    ReportService.getMunicipalities().then((response) => {
      setMunicipalities(response.results);
    });
  }, []);

  console.log("categories", categories);

  const submitReport = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in report) {
      if (key === "images") {
        for (let image of report["images"]) {
          formData.append(key, image);
        }
      } else if (key === "attachments") {
        for (let image of report["attachments"]) {
          formData.append(key, image);
        }
      } else {
        formData.append(key, report[key]);
      }
    }

    ReportService.create(formData)
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        console.log("Error creating report", err);
      });
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
                  images: e.target.files,
                });
              }}
              multiple={true}
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
              multiple={true}
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
              Municipality
            </FormLabel>

            <Select
              placeholder="Select Municipality"
              onChange={(e) => {
                setReport({ ...report, municipality: e.target.value });
              }}
              value={report.municipality}
            >
              {municipalities.map((municipality, index) => {
                return (
                  <option key={index} value={municipality.id}>
                    {municipality.name}
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
              type="text"
              value={`${report.lat} ${report.long}`}
              disabled={true}
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
