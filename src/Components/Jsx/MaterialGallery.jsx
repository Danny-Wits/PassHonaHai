import { Carousel } from "@mantine/carousel";
import { Box, Center, Stack, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import MaterialCard from "./MaterialCard";
function MaterialGallery({ data, title, icon }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const autoplay = useRef(Autoplay({ delay: 1000 }));
  const slides = data?.map((material) => (
    <Carousel.Slide key={material.material_id}>
      <Center mb={20}>
        <MaterialCard material={material} isPaper={false}></MaterialCard>
      </Center>
    </Carousel.Slide>
  ));
  return (
    <Stack>
      <Title mb={"md"} px="sm" order={isMobile ? 4 : 2} fw={800}>
        {title}
        <Box p={"sm"} display={"inline"}>
          {icon}
        </Box>
      </Title>
      <Carousel
        slideSize={{
          base: "100%",
          sm: "50%",
          md: data.length > 4 ? "33.33%" : "50%",
        }}
        slideGap={{ base: 10, sm: "sm" }}
        align={isMobile ? "center" : "start"}
        controlSize={isMobile ? 30 : 40}
        loop={true}
        withIndicators
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        styles={{
          indicator: {
            width: 12,
            height: 12,
            transform: "translateY(20px)",
            backgroundColor: "var(--mantine-color-dimmed)",
          },
        }}
      >
        {slides}
      </Carousel>
    </Stack>
  );
}

export default MaterialGallery;
