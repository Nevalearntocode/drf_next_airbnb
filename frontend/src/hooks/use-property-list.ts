import {
  useGetAllPropertiesQuery,
  useGetCurrentUserPropertiesQuery,
} from "@/redux/features/property-slice";
import { PropertyRoute } from "@/types/property";
import { usePathname, useSearchParams } from "next/navigation";

export const usePropertyList = (route: PropertyRoute) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const landlordId = pathname.split("/")[2];

  const page = searchParams.get("page") || undefined;
  const name = searchParams.get("name") || undefined;
  const id = searchParams.get("id") || undefined;
  const category = searchParams.get("category") || undefined;
  const location = searchParams.get("location") || undefined;
  const checkIn = searchParams.get("check-in") || undefined;
  const checkOut = searchParams.get("check-out") || undefined;
  const guests = searchParams.get("guests") || undefined;

  // Conditionally define the query arguments
  const queryArgs =
    route === "me"
      ? { page, name, id, category, location, checkIn, checkOut, guests } // For current user
      : { page, name, id, category, location, checkIn, checkOut, guests }; // For all properties

  // Call the appropriate query *outside* the conditional
  const { data: allPropertiesData, isLoading: allPropertiesLoading } =
    useGetAllPropertiesQuery(queryArgs);
  const { data: myPropertiesData, isLoading: myPropertiesLoading } =
    useGetCurrentUserPropertiesQuery(queryArgs);
  const { data: landlordPropertiesData, isLoading: landlordPropertiesLoading } =
    useGetAllPropertiesQuery({ landlord: landlordId });
  const { data: favoritePropertiesData, isLoading: favoritePropertiesLoading } =
    useGetAllPropertiesQuery({
      favorites: "true",
      ...queryArgs,
    });

  // Now, conditionally return the data and loading state
  if (route === "me") {
    return {
      data: myPropertiesData,
      isLoading: myPropertiesLoading,
    };
  }

  if (route === "landlord") {
    return {
      data: landlordPropertiesData,
      isLoading: landlordPropertiesLoading,
    };
  }

  if (route === "favorite") {
    console.log(favoritePropertiesData);
    return {
      data: favoritePropertiesData,
      isLoading: favoritePropertiesLoading,
    };
  }

  return {
    data: allPropertiesData,
    isLoading: allPropertiesLoading,
  };
};
