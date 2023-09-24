import { Input } from '../ui'
import FormItem from './FormItem'

const TextInput = ({ inputProps = {}, ...props }) => (
  <FormItem {...props}>
    <Input {...inputProps} />
  </FormItem>
)

export default TextInput
