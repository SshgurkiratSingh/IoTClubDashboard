import Image from "next/image";
import Container from "../components/container";
import Link from "next/link";
import HistoryTable from "./historyPage";
import AttendanceTable from "../components/AttendanceTable";

export default function Home() {
  return (
    <main>
      <Container>
        <HistoryTable />
      </Container>
    </main>
  );
}
