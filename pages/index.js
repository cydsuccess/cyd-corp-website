import dynamic from "next/dynamic";
const CYDWebsite = dynamic(() => import("../components/CYDWebsite"), { ssr: false });
export default function Home() { return <CYDWebsite />; }
