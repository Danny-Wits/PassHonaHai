import { Grid, SimpleGrid, Text, ThemeIcon, Title } from "@mantine/core";
import {
  FaBolt,
  FaExchangeAlt,
  FaInfinity,
  FaUserFriends,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import classes from "../Styles/FeaturesTitle.module.css";

const features = [
  {
    icon: FaInfinity,
    title: "Free for Life",
    description:
      "All the services are free for you to use for as long as you want. No hidden fees!",
  },
  {
    icon: FaUserFriends,
    title: "Community Based",
    description:
      "Connect with peers, seniors, and juniors to share knowledge and resources.",
  },
  {
    icon: FaBolt,
    title: "Easy to Use",
    description:
      "A simple and intuitive interface designed to make studying and sharing effortless.",
  },
  {
    icon: FaExchangeAlt,
    title: "Request for Changes",
    description:
      "Have suggestions? Request changes and help improve the platform together!",
  },
];

export default function Features() {
  const navigate = useNavigate();
  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon size={44} radius="md">
        <feature.icon size={26} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className={classes.wrapper}>
      <Grid gutter={80}>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Title className={classes.title} order={2}>
            Empowering Your Learning Journey
          </Title>
          <Text c="dimmed">
            Pass Hona Hai is designed to make studying and knowledge-sharing
            easier. With a community-driven approach, a user-friendly interface,
            and a commitment to staying free forever, we ensure that you have
            all the tools you need to succeed.
          </Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
            {items}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </div>
  );
}
