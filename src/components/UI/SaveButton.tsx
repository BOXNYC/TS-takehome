import { PropsWithChildren } from 'react'
import '../../styles/UI/SaveButton.css'

interface Props {
  disabled: boolean
  handleOnClick: ()=>void
}

const SaveButton = (props:PropsWithChildren<Props>) => {
  const {children, disabled, handleOnClick} = props
  
  return (
    <>
      {/* feat: a11y accessible name for the icon-only "+" button */}
      <button
        type="button"
        className="save_button"
        disabled={disabled}
        aria-label="Save avatar"
        title="Save avatar"
        onClick = {handleOnClick}
      >
        <span aria-hidden="true">
          {children}
        </span>
      </button>
    </>
  )
}

export default SaveButton