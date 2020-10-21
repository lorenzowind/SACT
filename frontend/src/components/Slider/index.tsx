import React from 'react';
import Slider from '@material-ui/core/Slider';

import { Container } from './styles';

interface Props {
  value: number;
  index: number;
  criterionIndex: number;
  min_grade: number;
  max_grade: number;
  setValue(grade: number, index: number, criterionIndex: number): void;
}

const SliderInput: React.FC<Props> = ({
  value,
  index,
  criterionIndex,
  min_grade,
  max_grade,
  setValue,
}) => {
  return (
    <Container>
      <Slider
        value={value}
        onChange={(_e, val) => setValue(Number(val), index, criterionIndex)}
        aria-labelledby="discrete-slider"
        step={5}
        min={min_grade}
        max={max_grade}
      />
    </Container>
  );
};

export default SliderInput;
