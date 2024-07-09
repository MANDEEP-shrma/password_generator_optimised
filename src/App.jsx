import React, { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberChecked, setNumberChecked] = useState(false);
  const [specialCharChecked, setSpecialCharChecked] = useState(false);
  const [password, setPassword] = useState("");
  //Ref hook
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let passKey = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberChecked) string += "0123456789";
    if (specialCharChecked) string += "!@#$%&*{}[]_-+=^?~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1);
      passKey += string.charAt(char);
    }

    setPassword(passKey);
  }, [length, numberChecked, specialCharChecked, setPassword]); //yha hum optimisation ki baat karte hai ki jba bhiii call ho tab optimise tarike se call ho

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberChecked, specialCharChecked, passwordGenerator]); //Yha hum kehte hai ki jab bhi inme se kisi ek dependemcies kai saath ched chaad ho ho tab phir se call karna hai
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-500 bg-gray-800">
        <h1 className="mb-4 text-center text-white"> Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipBoard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            COPY
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={28}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberChecked}
              id="numberInput"
              onChange={() => {
                setNumberChecked((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={specialCharChecked}
              id="specialCharInput"
              onChange={() => {
                setSpecialCharChecked((prev) => !prev);
              }}
            />
            <label htmlFor="specialCharInput">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
