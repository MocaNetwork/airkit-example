import { Button } from "../common/Button";
import { useNavigate } from "react-router";

export const ExperimentFunctions = () => {
  const navigate = useNavigate();

  // Placeholder experiment function
  const runReclaimDemo = () => {
    navigate("/reclaim-demo");
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <h2 className="text-2xl font-bold">Experiment Functions</h2>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={runReclaimDemo} variant="outline">
          Reclaim demo
        </Button>
      </div>
    </div>
  );
};
