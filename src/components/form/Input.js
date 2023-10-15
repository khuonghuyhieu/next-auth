import Input from "../ui/Input";
import FormItem from "./FormItem";

const TextInput = ({ inputProps = {}, ...props }) => (
  <FormItem {...props}>
    <Input {...inputProps} />
  </FormItem>
);

export default TextInput;
