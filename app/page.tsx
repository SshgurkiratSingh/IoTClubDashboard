import Image from "next/image";
import Container from "./components/container";
import MainPageBox from "./components/MainPage";
import Link from "next/link";
import ClientOnly from "./components/ClientOnly";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between ">
      <Container>
        <div className="dbse-m">
          <style>
            {`
          .dbse-m {
ssss            display: grid;
            place-items: center;
            margin: 0rem;
            overflow: hidden;  
          }

          h1, h2, h3, p {
            margin: 0rem;
            backdrop-filter: blur(10px);

          }

          .dbse {
            width: 640px;
            position: relative;
            background-color: rgb(16 16 16);
            border: 1px solid rgb(255 255 255 / 10%);
            border-radius: 1.5rem;
            padding: 1rem;
          }
          .dbse:before {  
            content: "";
            height: 140px;
            width: 2px;  
            position: absolute;  
            right: -1px;
            top: 65%;
            transition: top, opacity;
            transition-duration: 600ms;
            transition-timing-function: ease;
            background: linear-gradient(
              transparent,
              red,
              transparent
            );
            opacity: 0;
          }

          .dbse:before {  
            top: 5%;
            opacity: 0;
          }

          .dbse:hover:before {
            top: 65%;
            opacity: 1;
          }
          .dbse:after {  
            content: "";
            height: 140px;
            width: 2px;  
            position: absolute;  
            left: -1px;
            top: 65%;
            transition: top, opacity;
            transition-duration: 600ms;
            transition-timing-function: ease;
            background: linear-gradient(
              transparent,
              red,
              transparent
            );
            opacity: 0;
          }

          .dbse:after {  
            top: 65%;
            opacity: 0;
          }

          .dbse:hover:after {
            top: 10%;
            opacity: 1;
          }

          .dbse-content {  
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            background-image: radial-gradient(
              rgba(116, 169, 217, 0.8) 1px, 
              transparent 1px
            );
            background-position: 50% 50%;
            background-size: 1.1rem 1.1rem;
            padding: 4rem;
            border-radius: 1.25rem;
            overflow: hidden;
          }

          .dbse-content > :is(h1, h3, p) {
            text-align: center;
          }

          .dbse-content > h1 {
           
            font-size: 2.6rem;
          }

          .dbse-content > h3 {
            color: red;
            text-transform: uppercase;
          
          }

          .dbse-content > p {
            color: rgb(255 255 255 / 75%);
            line-height: 1.5rem;
          }

          @media(max-width: 700px) {
            .dbse {
              width: calc(100% - 2rem);
              margin: 0rem 1rem;
              padding: 0.75rem;
              border-radius: 1rem;
            }
          }

          @media(max-width: 600px) {
            .dbse-content {
              padding: 3rem;
            }
  
            .dbse-content > h1 {
              font-size: 2.2rem;
            }
          }
        `}
          </style>
          <ClientOnly>
            <div className="dbse">
              <div className="dbse-content group">
                <h3 className="font-md text-xl ">CLUB PORTAL </h3>
                <h1 className="font-bold group-hover:text-blue-400 transition">
                  ISTC IOT CLUB
                </h1>
                <p>
                  Welcome to the ISTC IoT Club Student Portal!{" "}
                  <br className="gap-2"></br>
                  <br />
                  {/* <Link
                  href="/login"
                  className="btn marker:btn-info btn-md border-neutral-100 rounded-xl"
                >
                  Attendence Page
                </Link> */}
                  <Link
                    href="/AttendenceSystem"
                    className="btn marker:btn-info btn-md border-neutral-100 rounded-xl"
                  >
                    Attendence Page
                  </Link>
                </p>
              </div>
            </div>
          </ClientOnly>
        </div>
      </Container>
    </main>
  );
}
