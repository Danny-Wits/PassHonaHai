import { Avatar, Badge, Group, Table, Text } from "@mantine/core";
import { PageRoutes } from "../../Scripts/Const.js";
import { useNavigate } from "react-router-dom";

const FieldColor = {
  Science: "green",
  Commerce: "red",
  Arts: "blue",
};

export function UsersTable({ users }) {
  const navigate = useNavigate();
  const rows = users?.map((user_info, index) => (
    <Table.Tr
      key={index}
      style={{ cursor: "pointer" }}
      onClick={() =>
        navigate(PageRoutes.PublicProfile, { state: { user_info } })
      }
    >
      <Table.Td>
        <Group gap="sm" maw={150}>
          <Avatar
            size={30}
            src={user_info?.profile_picture_url}
            radius={30}
            name={user_info?.name}
            variant={"light"}
            color={"initials"}
          />
          <Text fz="sm" fw={500} truncate={"end"} w={"60%"}>
            {user_info?.name}
          </Text>
        </Group>
      </Table.Td>
      <Table.Td>
        <Badge color={FieldColor[user_info?.field]} variant="light" miw={80}>
          {user_info?.field === "" ? "Unknown " : user_info?.field}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={FieldColor[user_info?.field]} variant="dot">
          {user_info?.branch === "" ? "Unknown" : user_info?.branch}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={400} w={"100%"}>
      <Table verticalSpacing="sm" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Field</Table.Th>
            <Table.Th>Branch</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
