"use client";

import { useCountries } from "@/hooks/use-countries";
import { LocationType } from "../../add-property-modal";
import { FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectCountryProps {
  value?: LocationType;
  onChange: (value: LocationType) => void;
}

const SelectCountry: React.FC<SelectCountryProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  const countries = getAll();
  const filteredCountries = countries.filter((country) => {
    if (!value) {
      return false;
    }
    const lowerCaseName = value.name.toLowerCase();
    const lowerCaseCode = value.country_code.toLowerCase();
    return (
      country.name.toLowerCase().includes(lowerCaseName) ||
      country.country_code.toLowerCase().includes(lowerCaseCode)
    );
  });

  return (
    <>
      <Select
        onValueChange={() =>
          onChange({
            name: value?.name || "",
            country_code: value?.country_code || "",
          })
        }
        defaultValue={value?.name}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Where does your property locate?" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {filteredCountries.map((country) => (
            <SelectItem
              key={country.country_code}
              value={country.country_code}
              onSelect={() =>
                onChange({
                  name: country.name,
                  country_code: country.country_code,
                })
              }
            >
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </>
  );
};

export default SelectCountry;
