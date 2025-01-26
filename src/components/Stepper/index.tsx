import Information from './Information';
import { useCallback, useMemo, useState } from 'react';
import Goals from './goals';
import FamilyInformation from './FamilyInformation';

export default function Stepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState<Record<string, unknown>>({});

  const element = useMemo(() => {
    return [
      { id: 0, Component: Information },
      { id: 1, Component: Goals },
      { id: 2, Component: FamilyInformation },
      { id: 3, Component: () => <div>{JSON.stringify(values, null, 2)}</div> },
    ];
  }, [values]);

  const handleNext = useCallback((_values: Record<string, unknown>) => {
    setActiveStep(prev => prev + 1);
    setValues(prev => ({ ...prev, ..._values }));
  }, []);

  const handleBack = useCallback((_values: Record<string, unknown>) => {
    setActiveStep(prev => prev - 1);
    setValues(prev => ({ ...prev, ..._values }));
  }, []);

  return (
    <div>
      <h1 className="text-center mb-3 text-2xl">Example Stepper</h1>
      {element
        .filter((_, index) => index === activeStep)
        .map(({ Component, id }) => (
          <Component
            key={id}
            handleNext={handleNext}
            handleBack={handleBack}
            values={{ ...values }}
          />
        ))}
    </div>
  );
}
