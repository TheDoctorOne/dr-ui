

export default function Label(props) {
  return <label {...props.labelProps}>
    <span style={{ paddingRight: 5}} {...props}>{props.text}</span>
    {props.children}
  </label>;
}