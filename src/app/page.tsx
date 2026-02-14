import Navbar from "../../components/shared/Navbar";
import Hero from "../../components/sections/Hero";
import Problem from "../../components/sections/problem";
import Mission from "../../components/sections/mission";
import DemandMapFeature from "../../components/sections/demand-maps";
import ProPath from "../../components/sections/proPath";
import EarningsFeature from "../../components/sections/Earnings";
import SafetyFeature from "../../components/sections/Safety";
import UserPath from "../../components/sections/userPath";
import Footer from "../../components/shared/Footer";

export default function Home() {
  return (
    <main className="relative bg-white min-h-screen">
      <Navbar />
      <section id="home"><Hero /></section>
      <section id="problem"><Problem /></section>
      <section id="mission"><Mission /></section>
      <section id="pro"><ProPath /></section>
      <section id="demand-maps"><DemandMapFeature /></section>
      <section id="earnings"><EarningsFeature /></section>
      <section id="safety"><SafetyFeature /></section>
      <section id="user"><UserPath /></section>
      <Footer />
    </main>
  );
}