import { Hero } from "@/components/Hero";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        padding: 0,
        backgroundColor: "white",
        zIndex: -1,
        minHeight: "100vh",
      }}
    >
      <Hero />
    </Container>
  );
}
