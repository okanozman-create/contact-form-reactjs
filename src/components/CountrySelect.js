import { useEffect, useState } from "react";

import Select from "react-select";

const initalValueCountry = { value: "", label: "---Choose Country---" };

const CountrySelect = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(initalValueCountry);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        );
        const data = await response.json();

        setCountries(data.countries);
        setSelectedCountry(initalValueCountry);
      } catch (error) {}
    }

    fetchData();
  }, []);

  return (
    <Select
      options={countries}
      value={selectedCountry}
      onChange={(a) => setSelectedCountry(a)}
    />
  );
};

export default CountrySelect;
