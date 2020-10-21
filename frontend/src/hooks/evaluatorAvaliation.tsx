import React, { createContext, useCallback, useState, useContext } from 'react';

import { AvaliationData } from '../pages/Evaluator/ProjectsList';

interface EvaluatorAvaliationContextData {
  selectedAvaliationState: AvaliationData;
  setSelectedAvaliationState: (avaliation: AvaliationData) => void;
}

const EvaluatorAvaliationContext = createContext<
  EvaluatorAvaliationContextData
>({} as EvaluatorAvaliationContextData);

const EvaluatorAvaliationProvider: React.FC = ({ children }) => {
  const [avaliationState, setAvaliationState] = useState<AvaliationData>(
    {} as AvaliationData,
  );

  const setSelectedAvaliationState = useCallback(
    (avaliation: AvaliationData) => {
      setAvaliationState(avaliation);
    },
    [],
  );

  return (
    <EvaluatorAvaliationContext.Provider
      value={{
        selectedAvaliationState: avaliationState,
        setSelectedAvaliationState,
      }}
    >
      {children}
    </EvaluatorAvaliationContext.Provider>
  );
};

function useEvaluatorAvaliation(): EvaluatorAvaliationContextData {
  const context = useContext(EvaluatorAvaliationContext);

  if (!context) {
    throw new Error(
      'useEvaluatorAvaliation must be used within an EvaluatorAvaliationProvider',
    );
  }

  return context;
}

export { EvaluatorAvaliationProvider, useEvaluatorAvaliation };
