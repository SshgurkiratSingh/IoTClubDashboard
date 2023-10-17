import Image from "next/image";
import Container from "../components/container";
import Link from "next/link";

import AttendanceTable from "../components/AttendanceTable";

export default function Home() {
  return (
    <main className=" p-4 md:p-24">
      <Container>
        <AttendanceTable />
      </Container>
    </main>
  );
}
