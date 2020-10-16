import React, { createContext, useCallback, useState, useContext } from 'react';

import { EvaluatorData } from '../pages/Admin/Evaluators';

interface EvaluatorProjectsContextData {
  selectedEvaluatorState: EvaluatorData;
  setSelectedEvaluatorState: (evaluator: EvaluatorData) => void;
}

const EvaluatorProjectsContext = createContext<EvaluatorProjectsContextData>(
  {} as EvaluatorProjectsContextData,
);

const EvaluatorProjectsProvider: React.FC = ({ children }) => {
  const [evaluatorState, setEvaluatorState] = useState<EvaluatorData>(
    {} as EvaluatorData,
  );

  const setSelectedEvaluatorState = useCallback((evaluator: EvaluatorData) => {
    setEvaluatorState(evaluator);
  }, []);

  return (
    <EvaluatorProjectsContext.Provider
      value={{
        selectedEvaluatorState: evaluatorState,
        setSelectedEvaluatorState,
      }}
    >
      {children}
    </EvaluatorProjectsContext.Provider>
  );
};

function useEvaluatorProjects(): EvaluatorProjectsContextData {
  const context = useContext(EvaluatorProjectsContext);

  if (!context) {
    throw new Error(
      'useEvaluatorProjects must be used within an EvaluatorProjectsProvider',
    );
  }

  return context;
}

export { EvaluatorProjectsProvider, useEvaluatorProjects };
