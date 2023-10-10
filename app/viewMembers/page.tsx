"use client";
import Image from "next/image";
import Container from "../components/container";
import UserTable from "./viewMember";

export default function Home() {
  return (
    <Container>
      <UserTable />
    </Container>
  );
}
