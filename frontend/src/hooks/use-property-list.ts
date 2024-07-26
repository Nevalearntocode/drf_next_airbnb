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

  if (route === "me") {
    const { data, isLoading } = useGetCurrentUserPropertiesQuery({
      page,
      name,
      id,
    });

    return {
      data,
      isLoading,
    };
  }

  const { data, isLoading } = useGetAllPropertiesQuery({ page, name, id });

  return { data, isLoading };
}
