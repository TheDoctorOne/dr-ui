import React, { useCallback, useImperativeHandle, useMemo, useRef } from "react";

export default function Form(props) {

  const formElements = useRef({});
  const formValues = useRef({});

  const onFormFieldChange = useCallback(({ name, value }) => {
    formValues.current[name] = value;
    if (props?.onFieldChange) {
      props?.onFieldChange({ name, value }, formValues.current);
    }
  }, [props]);

  const setFormValues = useCallback((nameValueMap) => {
    Object.keys(nameValueMap).forEach(name => {
      const setter = formElements.current[name];
      if (setter) {
        setter(nameValueMap[name])
      };
      onFormFieldChange({ name, value: nameValueMap[name] });
    })
  }, [onFormFieldChange]);

  const addFormFieldChangeToChildren = useCallback((children) => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.props.name) {
          const formValueSetCallback = (formValueSet) => {
            formElements.current[child.props.name] = formValueSet;
            formValueSet(formValues.current[child.props.name]);
          }
          const newChild = React.cloneElement(child, { formChange: onFormFieldChange, formValueSetCallback }, addFormFieldChangeToChildren(child.props.children));
          return newChild;
        }
        if (child?.props?.children) {
          return React.cloneElement(child, {}, addFormFieldChangeToChildren(child.props.children));
        }
        return child;
      });
  }, [onFormFieldChange]);

  const modifiedChildren = useMemo(() => {
    formElements.current = {};
    return addFormFieldChangeToChildren(props?.children);
  }, [props?.children, addFormFieldChangeToChildren]);

  useImperativeHandle(props.ref, () => {
    return {
      setFormValues,
      getFormValues: () => formValues.current
    };
  }, [setFormValues]);

  return <>
    {modifiedChildren}
  </>
}