import React from "react";
import { Stack, Text } from "@mantine/core";

function Scratch({ value, label }) {
  return (
    <Stack gap={0} align={"center"}>
      <Text c={"bright"} size={"md"} fw={900}>
        {value ?? 0}
      </Text>
      <Text c={"dimmed"} size={"xs"}>
        {label ?? "----"}
      </Text>
    </Stack>
  );
}

export default Scratch;
