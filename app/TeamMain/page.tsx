import Image from "next/image";
import MainPageBox from "../components/MainPage";
import Container from "../components/container";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container>
        <MainPageBox />
      </Container>
    </main>
  );
}
