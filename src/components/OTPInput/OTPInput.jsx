import { useEffect, useRef, useState } from 'react';

const OTP_DIGITS_COUNT = 5;

const OTPInput = () => {
  const [inputArr, setInputArr] = useState(
    new Array(OTP_DIGITS_COUNT).fill('')
  );
  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleInputChange = (value, index) => {
    if (isNaN(value)) return;

    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);

    newValue && refArr.current[index + 1]?.focus();
  };

  const handleBackspace = (e, index) => {
    if (!e.target.value && e.key === 'Backspace') {
      refArr.current[index - 1]?.focus();
    }
  };

  return (
    <div>
      <h1>OTPInput</h1>
      {inputArr.map((value, index) => (
        <input
          key={index}
          value={inputArr[index]}
          type='text'
          ref={(input) => (refArr.current[index] = input)}
          onChange={(e) => handleInputChange(e.target.value, index)}
          onKeyDown={(e) => handleBackspace(e, index)}
          style={{
            height: '40px',
            width: '40px',
            border: '1px solid black',
            fontSize: '40px',
            textAlign: 'center',
            margin: '5px',
            borderRadius: '4px',
          }}
        />
      ))}
    </div>
  );
};
export default OTPInput;
