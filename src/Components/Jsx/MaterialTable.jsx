import { Badge, Group, Table, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../../Scripts/Const.js";

const FieldColor = {
  Science: "green",
  Commerce: "red",
  Arts: "blue",
};

export function MaterialTable({ materials }) {
  const navigate = useNavigate();
  const rows = materials?.map((material, index) => (
    <Table.Tr
      key={index}
      style={{ cursor: "pointer" }}
      onClick={() =>
        navigate(PageRoutes.StudyMaterial, { state: { material } })
      }
    >
      <Table.Td>
        <Group gap="sm" maw={300} w={"100%"}>
          <Text fz="sm" fw={500} truncate={"end"} w={"100%"}>
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
          {material?.branch === "" ? "Unknown" : material?.branch}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={400} w={"100%"}>
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Field</Table.Th>
            <Table.Th>Branch</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
