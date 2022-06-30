import Image from "next/image";
import { chakra } from "@chakra-ui/react";

const ChakraNextImage = chakra(Image, {
  shouldForwardProp: (prop) =>
    [
      "width",
      "height",
      "src",
      "alt",
      "objectFit",
      "layout",
      "id",
      "rounded",
      "priority",
      "roundedTop",
      "rounded",
    ].includes(prop),
});

export default ChakraNextImage;
