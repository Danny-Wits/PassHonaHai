import {
  ActionIcon,
  Avatar,
  Container,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import mascot1 from "../../assets/mascot1.png";
import classes from "../Styles/FooterLinks.module.css";
const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Support", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Updates", link: "#" },
    ],
  },

  {
    title: "Legal",
    links: [
      { label: "Terms of Service", link: "#" },
      { label: "Privacy Policy", link: "#" },
    ],
  },
];

export default function LandingFooter() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Group w={"100%"}>
            <Avatar src={mascot1} size={80} radius="xl"></Avatar>
            <Title order={3}>Pass Hona Hai</Title>
          </Group>
          <Text size="xs" c="dimmed" className={classes.description}>
            A community for learning and sharing knowledge
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2025 Ocean of Sites. All rights reserved.
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <FaTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <FaFacebook size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IoMail size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
