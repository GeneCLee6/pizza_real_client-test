import {
  darken,
  mode,
  StyleFunctionProps,
  whiten,
} from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";

export const ButtonStyles = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    add: {
      bg: "red.500", // Notice the use of color directly here
      color: "white",
      rounded: "full",
      fontSize: "18px",
      outline: "none",
      _hover: {
        bg: "red.500",
        color: "white",
      },
      _active: {
        outline: "none",
      },
      _focus: {
        boxShadow: "none",
      },
    },
    minus: {
      bg: "gray.600", // Notice the use of color directly here
      color: "white",
      rounded: "full",
      fontSize: "18px",
      outline: "none",
      _hover: {
        bg: "gray.600",
        color: "white",
      },
      _active: {
        outline: "none",
      },
      _focus: {
        boxShadow: "none",
      },
    },
    language: {
      bg: "red.500",
      color: "white",
      size: "lg",
      _hover: {
        bg: "red.500",
        color: "white",
      },
      _active: {
        bg: "red.500",
        color: "white",
      },
    },
  },
  // default values for `size` and `variant`
  defaultProps: {},
};
