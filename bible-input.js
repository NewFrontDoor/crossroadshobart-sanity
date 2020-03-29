import React, {useState} from 'react';
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event';
import {extractAndValidate} from '@newfrontdoor/bible';

const createPatchFrom = value =>
  PatchEvent.from(value === '' ? unset() : set(value));

function validator({isValid, arrays}) {
  if (isValid[0] === null) return null;

  if (isValid.every(element => element === true)) {
    return arrays;
  }

  return false;
}

export default function BibleInput(props) {
  const [input, setInput] = useState(null);
  const [valid, setValid] = useState(null);
  const {type, value} = props;

  const isValid = valid.map(array => {
    if (Array.isArray(array) === false) return null;
    if (array.some(e => e === 'incomplete')) return 'incomplete';
    if (array.some(e => e === 'non-sequential')) return 'non-sequential';
    return array.every(e => e === true);
  });

  function handleInputChange(e) {
    const string = e.currentTarget.value;
    setInput(string);
    const [arrays, validated] = extractAndValidate(e.currentTarget.value);
    setValid(validated);
    createPatchFrom(validator(isValid, arrays));
  }

  return (
    <div>
      <h2>Passage</h2>
      <input value={input} onChange={handleInputChange} />
      <div>
        <ul>{value.map(array => array.map(item => <li>{item}</li>))}</ul>
      </div>
    </div>
  );
}
