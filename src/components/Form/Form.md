Example Form Usage:

```js
// Define form ref.
const handle = useRef({});

// Setting form values at any given time.
useEffect(() => {
  handle.current.setFormValues({ input: "123", input2: "i2" })
}, []);

// Example way to get form values at any given time.
const submit = () => {
  const values = handle.current.getFormValues();
  console.log(values);
}

// Track field changes.
// change: { name, value }, allFields: { [name]: value }
const onFieldChange = (change, allFields) => console.log(change, allFields);

// Form manages input fields with prop defined `name`
<Form ref={handle} onFieldChange={onFieldChange}>
  <Label text='Test'>
    <TextInput name='input' />
  </Label>
  <button onClick={submit}>Submit</button>
</Form>
```