import { useState } from 'react'
import '../styles/avatarOption.css'

interface Props {
  src: string | undefined
  onClick: () => void
  isActive?: boolean
}

// feat: show a spinner until the avatar image has finished loading
const AvatarOption = ({ src, onClick, isActive = false }: Props) => {
  // track which src finished loading so a new src shows the spinner again without an effect
  const [settledSrc, setSettledSrc] = useState<string | undefined>()
  const isLoading = settledSrc !== src

  // feat: option_active highlights the option currently applied to the preview
  // feat: tile gets option_loading (#00d3dd background) while the image loads
  return (
    <div className={`option_selection${isLoading ? " option_loading" : ""}${isActive ? " option_active" : ""}`} onClick={onClick}>
      {isLoading && <span className="option_spinner" role="status" aria-label="Loading avatar" />}
      <img
        src={src}
        alt="avatar"
        className={isLoading ? "option_img_loading" : ""}
        onLoad={() => setSettledSrc(src)}
        onError={() => setSettledSrc(src)}
      />
    </div>
  )
}

export default AvatarOption
