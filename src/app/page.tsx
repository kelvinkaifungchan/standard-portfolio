import { HorizontalLine } from "@/components/HorizontalLine";
import { getPortName } from "@/lib/portName";
import { AccessCode } from "@/components/AccessCode";

export default async function Home() {
  try {
    const name = await getPortName();

    return (
      <main className="flex h-full w-full font-light overflow-y-hidden overflow-x-hidden">
        <div className="w-full h-full flex flex-col border-r border-[#FFFFFF55]">
          <div className="p-5 text-xl">{name}</div>
          <HorizontalLine />
        </div>
        <AccessCode />
      </main>
    );
  } catch (err) {
    return (
      <main className="flex h-full w-full font-light overflow-y-hidden overflow-x-hidden">
        <div className="w-full h-full flex flex-col border-r border-[#FFFFFF55]">
          <div className="p-5 text-xl">Portfolio</div>
          <HorizontalLine />
        </div>
        <AccessCode />
      </main>
    );
  }
}
