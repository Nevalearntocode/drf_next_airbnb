import { Control } from "react-hook-form";
import { UseFormSetValue } from "react-hook-form";
import { AddPropertyType } from "@/modals/add-property-modal";

export type AddPropertyControl = Control<AddPropertyType>;
export type AddPropertySetValue = UseFormSetValue<AddPropertyType>;
