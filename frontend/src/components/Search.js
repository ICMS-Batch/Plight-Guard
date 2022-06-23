import React, { useRef, useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  List,
  ListItem,
  useOutsideClick,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import Baato from "@baatomaps/baato-js-client";
import { useMap } from "react-leaflet";

const Search = ({ setPosition }) => {
  const [places, setPlaces] = useState([]);
  const containerRef = useRef(null);
  const map = useMap();

  const [isSearchOpen, setIsSearchOpen] = useState(true);

  const searchLocationByName = (query) => {
    new Baato.Search()
      .setApiVersion("1.0") // default
      .setBaseUrl(`https://api.baato.io/api`) // detault Baato base URL
      .setKey("bpk.gLoMj9kAtLnQg8YWv4x7_kHYSr4DlwvZ6H3CZ5mTMd_-")
      .setQuery(query) // string query to search for
      .setLimit(5) // limit the number of responses
      .doRequest()
      .then((response) => {
        setPlaces(response.data);
      });
  };

  const markLocation = (placeId) => {
    new Baato.Places()
      .setApiVersion("1.0") // default
      .setBaseUrl(`https://api.baato.io/api`) // detault Baato base URL
      .setKey("bpk.gLoMj9kAtLnQg8YWv4x7_kHYSr4DlwvZ6H3CZ5mTMd_-")
      .setPlaceId(placeId)
      .doRequest()
      .then((response) => {
        const { lat, lon } = response.data[0].centroid;
        console.log("marking location", response);

        setPosition(JSON.stringify([lat, lon]));
        map.setView([lat, lon], 20);
      });
  };

  useOutsideClick({
    ref: containerRef,
    handler: () => setIsSearchOpen(false),
  });

  return (
    <Flex flexDirection="column">
      <InputGroup>
        <Input
          type="text"
          placeholder="Enter location name"
          borderRadius="md"
          width="sm"
          onChange={(e) => searchLocationByName(e.target.value)}
          onClick={() => setIsSearchOpen(true)}
        />
        <InputRightElement pointerEvents="none" children={<FaSearch />} />{" "}
      </InputGroup>

      {isSearchOpen && (
        <List ref={containerRef}>
          {places.map((place, index) => (
            <ListItem
              key={index}
              py={2}
              px={3}
              cursor="pointer"
              _hover={{
                bgColor: "gray.200",
              }}
              onClick={() => markLocation(place.placeId)}
            >
              {place.name}
            </ListItem>
          ))}
        </List>
      )}
    </Flex>
  );
};

export default Search;
