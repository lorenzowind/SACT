import React from 'react';
import Slider from '@material-ui/core/Slider';

import { Container } from './styles';

interface Props {
  value: number;
  index: number;
  criterionIndex: number;
  setValue(grade: number, index: number, criterionIndex: number): void;
}

const SliderInput: React.FC<Props> = ({
  value,
  index,
  criterionIndex,
  setValue,
}) => {
  return (
    <Container>
      <Slider
        value={value}
        onChange={(_e, val) => setValue(Number(val), index, criterionIndex)}
        aria-labelledby="discrete-slider"
        step={5}
        min={60}
        max={100}
      />
    </Container>
  );
};

export default SliderInput;
