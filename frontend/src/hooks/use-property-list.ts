import {
  useGetAllPropertiesQuery,
  useGetCurrentUserPropertiesQuery,
} from "@/redux/features/property-slice";
import { PropertyRoute } from "@/types/property";
import { useSearchParams } from "next/navigation";

export function usePropertyList(route: PropertyRoute) {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || undefined;
  const name = searchParams.get("name") || undefined;
  const id = searchParams.get("id") || undefined;

  if (route === "me") {
    const { data } = useGetCurrentUserPropertiesQuery({
      page,
      name,
      id,
    });

    return {
      data,
    };
  }

  const { data } = useGetAllPropertiesQuery({ page, name, id });

  return { data };
}
