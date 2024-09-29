import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { IconType } from "react-icons/lib";

export type CategoryConstant = {
  label: string;
  icon: IconType;
  description: string;
};

export enum STEPS {
  CATEGORY = 0,
  DESCRIPTION = 1,
  DETAILS = 2,
  LOCATION = 3,
  PRICE = 4,
}

export enum SEARCHSTEPS {
  LOCATION = 0,
  DATES = 1,
  GUESTS = 2,
}

export enum SOCIALPROVIDERS {
  google = "google-oauth2",
}

export const DefaultPropertyValues = {
  category: "",
  name: "",
  description: "",
  image: null,
  guests: 0,
  bedrooms: 0,
  bathrooms: 0,
  price: 0,
  location: {
    name: "",
    country_code: "",
  },
  address: "",
};

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description:
      "This property is located near crystal clear waters, with sandy beaches and warm sunshine.",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description:
      "This property is situated in a picturesque countryside, surrounded by rolling hills and charming windmills.",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description:
      "This property is a sleek and stylish villa, designed with modern architecture and luxurious amenities.",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description:
      "This property is nestled in the heart of the countryside, surrounded by lush green forests and rolling hills.",
  },
  {
    label: "Pools",
    icon: TbPool,
    description:
      "This property boasts a serene and inviting pool, perfect for relaxing and enjoying the warm weather.",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description:
      "This property is located on a secluded island, surrounded by crystal clear waters and pristine beaches.",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description:
      "This property is situated by a picturesque lake, with opportunities for boating, fishing, and other water sports.",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description:
      "This property is located in a scenic ski resort, offering breathtaking views and world-class skiing facilities.",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description:
      "This property is a timeless castle, with medieval architecture and rich history.",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    description:
      "This property is situated in a mystical cave system, with ancient rock formations and hidden treasures.",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description:
      "This property is surrounded by a lush forest, perfect for camping and outdoor adventures.",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description:
      "This property is located in a frozen tundra, with endless snow-covered landscapes and polar bears.",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description:
      "This property is situated in a scorching desert, with sand dunes and exotic cacti.",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description:
      "This property is a charming barn, with rustic architecture and cozy interior.",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description:
      "This property is a luxurious resort, with top-notch amenities and world-class service.",
  },
];
