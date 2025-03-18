import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TextInput from './components/Inputs/TextInput'
import Label from './components/Label'
import Form from './components/Form/Form'

function App() {
  const [count, setCount] = useState(0)

  const handle = useRef({ t: 't' });

  useEffect(() => {
    handle.current.setFormValues({ input: "123", input2: "i2" })
  }, []);

  const submit = () => {
    const values = handle.current.getFormValues();
    console.log(values);
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Form ref={handle} onFieldChange={(change, allFields) => console.log(change, allFields)}>
        <Label text='Test'>
          <TextInput name='input' />
        </Label>
        <div>
          {count % 2 == 0 && <TextInput name='input2' />}
        </div>
        <button onClick={submit}>Submit</button>
      </Form>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
