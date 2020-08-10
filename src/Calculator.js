import React, { useState } from 'react';

function Calculator() {
  const [input, setInput] = useState('0');
  const [output, setOutput] = useState('');

  function clickHandler(e) {
    const value = e.target.textContent;

    // reset display on AC click
    if (value === 'AC') {
      setInput('0');
      setOutput('');
      return;
    }

    // number should not start with multiple zeros
    if (input[0] === '0') {
      setInput(input.slice(1))
    }

    // number should not have two decimal points .
    if (input.includes('.') && value === '.') {
      return;
    } else if (value === '.') {
      setInput(input + value);
      setOutput(output + value);
    }

    // incase of two consective operators, last one to be taken
    // except - minus
    if (/[+-/*]/.test(input[input.length - 1]) && /[+-/*]/.test(value) && value !== '-') {
      if (/[+-/*]/.test(output[output.length - 2])) {
        setInput(value);
        setOutput(output.slice(0, output.length - 2) + value)
      }
      return;
    }

    // operator followed by = should start the new calculation based
    // on previous evalution
    if (output.includes('=')) {
      if (/[0-9]/.test(value)) {
        setOutput(value);
        setInput(value);
        return;
      }

      if (/[+-/*]/.test(value)) {
        const prevResult = output.slice(output.indexOf('=') + 1);
        setOutput(prevResult + value);
        setInput(value);
        return;
      }
    }

    // handle operators
    if (/[/+*-]/.test(value)) {
      console.log('iam');
      setInput(value);
      setOutput(output + value);
    }

    // handle digits [0-9]
    if (/[0-9]/.test(value)) {
      setInput(prevInput => prevInput.replace(/[/+*-]/, '') + value);
      setOutput(output + value);
    }

    // handle =
    if (value === '=') {
      // todo
      try {
        const total = eval(output).toString();
        setOutput(output + '=' + total);
        setInput(total);
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  return (
    <div id='calculator' onClick={clickHandler}>
      <div id='display-box'>
        <div id='expression'>{output}</div>
        <div id='display'>{input}</div>
      </div>
      <div id='clear'>AC</div>
      <div id='divide'>/</div>
      <div id='multiply'>*</div>
      <div id='seven'>7</div>
      <div id='eight'>8</div>
      <div id='nine'>9</div>
      <div id='subtract'>-</div>
      <div id='four'>4</div>
      <div id='five'>5</div>
      <div id='six'>6</div>
      <div id='add'>+</div>
      <div id='one'>1</div>
      <div id='two'>2</div>
      <div id='three'>3</div>
      <div id='equals'>=</div>
      <div id='zero'>0</div>
      <div id='decimal'>.</div>
    </div>
  );
}

export default Calculator;