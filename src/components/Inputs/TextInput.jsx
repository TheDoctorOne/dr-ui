import useInput from "../../hooks/useInput";

export default function TextInput(props) {
  const { field } = useInput(props);

  return field;
}