export const getShift = ({ steps = 2, stepChar = ''}: { steps?: any, stepChar?: string } = {}): string[] => {
  let step;
  let shift = ['\n']; // array of shifts

  switch (stepChar) {
    case 'SPACE':
      stepChar = ' ';
      break;
    case 'TAB':
      stepChar = '	';
      break;
    default:
      stepChar = stepChar.length > 0 ? stepChar : ' ';
  }

  if (isNaN(parseInt(steps))) {
    step = stepChar;
  } else {
    step = '';
    for (let i = 0; i < steps; i++) {
      step += stepChar;
    }
  }

  let maxdeep = 100, // nesting level
    ix = 0;

  // initialize array with shifts //
  for (ix = 0; ix < maxdeep; ix++) {
    shift.push(shift[ix] + step);
  }

  return shift;
}
