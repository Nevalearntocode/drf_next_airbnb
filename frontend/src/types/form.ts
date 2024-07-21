import { Control } from "react-hook-form";
import { UseFormSetValue } from "react-hook-form";
import { PropertyFormType } from "@/modals/add-property-modal";
import { PropertyReservationFormType } from "@/app/properties/_components/property-reservation";

export type AddPropertyControl = Control<PropertyFormType>;
export type AddPropertySetValue = UseFormSetValue<PropertyFormType>;

export type AddReservationControl = Control<PropertyReservationFormType>;
