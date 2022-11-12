import { Autocomplete, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MoveOrder() {
  const [data, setData] = useState<any[]>([]);
  const [getCounty, setCounty] = useState<any[]>([]);
  const [getState, setState] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((response) => {
        // console.log(response);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const country = Array.from(data.map((item) => item.country));
  // console.log(country);

  // console.log(data);

  const handleCountry = (event: any, value: any) => {
    let states = data.filter((state) => state.country === value);
    states = Array.from(states.map((item) => item.name));
    states.sort();
    setState(states);
  };

  return (
    <Container>
      <Typography>Dependent Select Field</Typography>
      <Autocomplete
        onChange={(event, value) => handleCountry(event, value)}
        id="country"
        getOptionLabel={(country) => `${country}`}
        options={country}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        noOptionsText={"No Available Data"}
        renderOption={(props, country) => (
          <Box component="li" {...props} key={country} value={getCounty}>
            {country}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
      <Autocomplete
        id="city"
        getOptionLabel={(getState) => `${getState}`}
        options={getState}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        noOptionsText={"No Available User"}
        renderOption={(props, getState) => (
          <Box component="li" {...props} key={getState}>
            {getState}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label="City" />}
      />
      {/* <Autocomplete /> */}
    </Container>
  );
}
