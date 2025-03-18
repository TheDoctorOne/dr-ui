import { useCallback, useEffect, useState, useMemo } from "react";

export default function useInput(props) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props?.value);
  }, [props?.value]);

  const onChange = useCallback((e) => {
    e.preventDefault();
    const value = e.target.value;
    setValue(value);
    if (props?.onChange) {
      props.onChange(value, props?.name);
    }
    if(props?.formChange && props?.name) {
      props.formChange({
        name: props.name,
        value: value
      })
    }
  }, [props]);

  const formValueSet = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  useEffect(() => {
    props?.formValueSetCallback(formValueSet)
  }, [props, formValueSet]);

  const field = useMemo(() => {
    return <input
      value={value}
      onChange={onChange}
      {...props}
    >
      {props.children}
    </input>;
  }, [props, onChange, value]);

  return {
    field: <>{field}</>,
    name: props?.name,
    value,
    setValue
  };
}