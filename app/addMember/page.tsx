import Container from "../components/container";
import AddUserCard from "./addUserCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 w-full">
      <Container>
        <AddUserCard />
      </Container>
    </main>
  );
}
