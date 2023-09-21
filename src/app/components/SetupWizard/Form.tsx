"use client";

import { SwapPosition } from "@/app/components/SetupWizard//SwapPosition";
import { Mode } from "@/app/components/SetupWizard/Mode";
import { Player } from "@/app/components/SetupWizard/Player";
import { Serve } from "@/app/components/SetupWizard/Serve";
import { useState } from "react";

export type ModeProp = {
  onNext?: () => void;
  onReset?: () => void;
};

export function Form() {
  const [step, setStep] = useState(1);

  const onNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const onResetStep = () => {
    setStep(1);
  };

  return (
    <>
      {step === 1 && <Mode onNext={onNextStep} />}
      {step === 2 && <Player onNext={onNextStep} />}
      {step === 3 && <Serve onNext={onNextStep} />}
      {step === 4 && <SwapPosition onReset={onResetStep} />}
    </>
  );
}
