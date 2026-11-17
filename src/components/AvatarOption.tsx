import { useState } from 'react'
import '../styles/avatarOption.css'

interface Props {
  src: string | undefined
  onClick: () => void
  isActive?: boolean
  label: string
}

// feat: show a spinner until the avatar image has finished loading
const AvatarOption = ({ src, onClick, isActive = false, label }: Props) => {
  // track which src finished loading so a new src shows the spinner again without an effect
  const [settledSrc, setSettledSrc] = useState<string | undefined>()
  const isLoading = settledSrc !== src

  // feat: option_active highlights the option currently applied to the preview
  // feat: tile gets option_loading (#00d3dd background) while the image loads
  return (
    // feat: a11y real button with a name, pressed state and busy state instead of a clickable div
    <button
      type="button"
      className={`option_selection${isLoading ? " option_loading" : ""}${isActive ? " option_active" : ""}`}
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={isActive}
      aria-busy={isLoading}
    >
      {isLoading && <span className="option_spinner" aria-hidden="true" />}
      <img
        src={src}
        alt=""
        className={isLoading ? "option_img_loading" : ""}
        onLoad={() => setSettledSrc(src)}
        onError={() => setSettledSrc(src)}
      />
    </button>
  )
}

export default AvatarOption
