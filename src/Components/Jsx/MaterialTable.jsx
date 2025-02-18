import { Badge, Group, Table, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../../Scripts/Const.js";

const FieldColor = {
  Science: "green",
  Commerce: "red",
  Arts: "blue",
};

export function MaterialTable({
  materials,
  arePapers = false,
  withoutHead = false,
}) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const rows = materials?.map((material, index) => (
    <Table.Tr
      key={index}
      style={{ cursor: "pointer" }}
      onClick={() => {
        if (arePapers) {
          window.open(material?.download_link, "_blank");
        } else {
          navigate(PageRoutes.StudyMaterial, { state: { material } });
        }
      }}
    >
      <Table.Td>
        <Group gap="sm" maw={isMobile ? 150 : 250} miw={100} w={"100%"}>
          {arePapers && (
            <Badge size={"xs"} circle>
              P
            </Badge>
          )}

          <Text fz="sm" fw={500} truncate={"end"} w={"80%"}>
            {material?.title}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge color={FieldColor[material?.field]} variant="light" miw={80}>
          {material?.field === "" ? "Unknown " : material?.field}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={FieldColor[material?.field]} variant="dot">
          {arePapers
            ? material?.year
            : material?.branch === ""
              ? "Unknown"
              : material?.branch}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={450} w={"100%"}>
      <Table verticalSpacing="sm" highlightOnHover>
        {!withoutHead && (
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Field</Table.Th>
              <Table.Th>Branch</Table.Th>
            </Table.Tr>
          </Table.Thead>
        )}

        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
