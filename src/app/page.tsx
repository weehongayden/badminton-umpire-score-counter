"use client";

import { Court } from "@/app/components/Court";
import { Panel } from "@/app/components/Panel";
import { SetupWizard } from "@/app/components/SetupWizard";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <main className="flex min-h-screen h-full flex-col p-10 lg:p-24">
      <RecoilRoot>
        <Court />
        <div className="my-3"></div>
        <SetupWizard />
        <Panel />
      </RecoilRoot>
    </main>
  );
}
