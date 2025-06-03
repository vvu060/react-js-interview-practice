import React, { useState } from 'react';

const ChipsInput = () => {
  const [input, setInput] = useState('');
  const [chips, setChips] = useState([]);

  const handleAddChip = () => {
    const trimmedValue = input.trim();

    setChips((prev) => [...prev, trimmedValue]);
    setInput('');
  };

  const handleRemoveChip = (index) => {
    setChips((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>ChipsInput</h1>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && input.trim() !== '') {
            handleAddChip();
          }
        }}
      />
      <div>
        {chips.length > 0 &&
          chips.map((chip, i) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'grey',
                padding: '0.5rem',
              }}
              key={i}
            >
              <span>{chip}</span>
              <button onClick={() => handleRemoveChip(i)}>x</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChipsInput;
