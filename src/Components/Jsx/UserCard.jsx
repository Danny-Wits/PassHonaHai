import { Avatar, Badge, Button, Card, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { numberFromStandard } from "../../Pages/Jsx/Dashboard.jsx";
import { PageRoutes } from "../../Scripts/Const.js";
import classes from "../Styles/UserCardImage.module.css";
import { FieldColor } from "./UsersTable.jsx";

export function UserCard({ user_info }) {
  const navigate = useNavigate();
  const stats = [
    { value: user_info?.seniors ?? 0, label: "Senior" },
    { value: user_info?.juniors ?? 0, label: "Junior" },
    { value: user_info?.materials ?? 0, label: "Material" },
  ];
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="md" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="xs" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card
      withBorder
      padding="xl"
      radius="md"
      mah={300}
      className={classes.card}
    >
      <Card.Section h={90}>
        <Group justify="space-between" p={"sm"}>
          <Avatar
            size={"sm"}
            name={
              user_info?.standard === ""
                ? "NO"
                : numberFromStandard(user_info?.standard)
            }
            color="initials"
          >
            {user_info?.standard === ""
              ? "NO"
              : numberFromStandard(user_info?.standard)}
          </Avatar>
          <Badge size="xs" variant="dot" color={FieldColor[user_info?.field]}>
            {user_info?.branch === "" ? "Unknown Branch" : user_info?.branch}
          </Badge>
        </Group>
      </Card.Section>
      <Avatar
        src={user_info?.profile_picture_url}
        style={{ cursor: "pointer" }}
        size={68}
        radius={68}
        mx="auto"
        mt={-40}
        name={user_info?.name}
        color={"initials"}
        className={classes.avatar}
        onClick={() => {
          navigate(PageRoutes.PublicProfile, {
            state: { user_info: user_info },
          });
        }}
      />
      <Text
        ta="center"
        fz="md"
        fw={500}
        mt="sm"
        onClick={() => {
          navigate(PageRoutes.PublicProfile, {
            state: { user_info: user_info },
          });
        }}
        truncate={"end"}
        style={{ cursor: "pointer" }}
      >
        {user_info?.name}
      </Text>
      <Text ta="center" fz="xs" c="dimmed" truncate={"end"}>
        {user_info?.bio || "Too cool for a bio"}
      </Text>
      <Group mt="sm" justify="center" gap={30}>
        {items}
      </Group>
      <Button
        fullWidth
        radius="md"
        mt="md"
        size="sm"
        variant="default"
        onClick={() =>
          navigate(PageRoutes.PublicProfile, {
            state: { user_info: user_info },
          })
        }
      >
        View Profile
      </Button>
    </Card>
  );
}
export default UserCard;
