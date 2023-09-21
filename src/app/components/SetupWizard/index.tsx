import { ErrorBoundary } from "@/app/components/ErrorBoundary";
import { Form } from "@/app/components/SetupWizard/Form";
import { gameInfo } from "@/app/states/game";
import { useRecoilValue } from "recoil";

export function SetupWizard() {
  const info = useRecoilValue(gameInfo);

  return (
    !info.isSetupComplete && (
      <ErrorBoundary>
        <Form />
      </ErrorBoundary>
    )
  );
}
