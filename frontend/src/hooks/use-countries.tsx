import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  country_code: country.cca2,
  country: country.name.common,
}));

export function useCountries() {
  const getAll = () => formattedCountries;
  const getByValue = (country_code: string) => {
    return formattedCountries.find((item) => item.country_code === country_code);
  };
  return {
    getAll,
    getByValue,
  };
}
