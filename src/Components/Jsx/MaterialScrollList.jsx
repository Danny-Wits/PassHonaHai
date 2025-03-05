import { ActionIcon, Group, ScrollArea } from "@mantine/core";
import React from "react";
import { MdCancel } from "react-icons/md";
import MaterialCard from "./MaterialCard";

function MaterialScrollList({ materials, setMaterials }) {
  return (
    <ScrollArea p={"sm"} w={"100%"} offsetScrollbars>
      <Group wrap="nowrap">
        {materials?.map((material, index) => {
          return (
            !!material && (
              <Group key={index} pos={"relative"} miw={240}>
                <MaterialCard
                  material={material}
                  isPaper={false}
                ></MaterialCard>
                {setMaterials && (
                  <ActionIcon
                    style={{ zIndex: 999 }}
                    variant="light"
                    size={"md"}
                    pos={"absolute"}
                    onClick={() =>
                      setMaterials(materials.filter((_, i) => i !== index))
                    }
                    bottom={5}
                    right={0}
                  >
                    <MdCancel color="red" />
                  </ActionIcon>
                )}
              </Group>
            )
          );
        })}
      </Group>
    </ScrollArea>
  );
}

export default MaterialScrollList;
