import {
  useGetAllPropertiesQuery,
  useGetCurrentUserPropertiesQuery,
} from "@/redux/features/property-slice";
import { PropertyRoute } from "@/types/property";
import { useSearchParams } from "next/navigation";

export const usePropertyList = (route: PropertyRoute) => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || undefined;
  const name = searchParams.get("name") || undefined;
  const id = searchParams.get("id") || undefined;

  // Conditionally define the query arguments
  const queryArgs =
    route === "me"
      ? { page, name, id } // For current user
      : { page, name, id }; // For all properties

  // Call the appropriate query *outside* the conditional
  const { data: allPropertiesData, isLoading: allPropertiesLoading } =
    useGetAllPropertiesQuery(queryArgs);
  const { data: myPropertiesData, isLoading: myPropertiesLoading } =
    useGetCurrentUserPropertiesQuery(queryArgs);

  // Now, conditionally return the data and loading state
  if (route === "me") {
    return {
      data: myPropertiesData,
      isLoading: myPropertiesLoading,
    };
  }

  return {
    data: allPropertiesData,
    isLoading: allPropertiesLoading,
  };
};
