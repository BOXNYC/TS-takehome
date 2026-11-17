import type { ChangeEvent } from 'react'
import '../../styles/UI/textinput.css'

interface Props {
  name: string;
  label: string;
  placeholder?: string; 
  className?: string;
  value: string;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextInput = (props: Props) => {
  const { 
    name,
    label,
    placeholder,
    className,
    value,
    handleOnChange } = props

  return (
    <>
      <label>
        {label}
        <input 
          name={name}
          // feat: a11y the visible label can be empty, so fall back to the placeholder or name
          aria-label={label || placeholder || name}
          autoComplete="off"
          value={value}
          className={className ? className: ""}
          type="Text"
          placeholder={placeholder ? placeholder : ""}
          onChange={handleOnChange}
          maxLength={25}
        />
      </label>
    </>
  )
}

export default TextInput