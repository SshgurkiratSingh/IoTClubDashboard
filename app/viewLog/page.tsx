import Image from "next/image";
import Container from "../components/container";
import Link from "next/link";
import HistoryTable from "./historyPage";

export default function Home() {
  return (
    <main className=" p-4 md:p-24">
      <Container>
        <HistoryTable />
      </Container>
    </main>
  );
}
