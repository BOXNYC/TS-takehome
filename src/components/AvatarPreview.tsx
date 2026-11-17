import { useContext } from 'react'
import '../styles/avatarPreview.css'
import { AvatarURLContext } from '../context'

const AvatarPreview = () => {
  const avatarURL = useContext(AvatarURLContext)

  return (
      <div className="avatar_preview_container">
        <div className="avatar_preview">
        {/* feat: a11y meaningful alt text for the preview image */}
        <img
            src={avatarURL}
            alt="Avatar preview"
          />
        </div>
      </div> 
  )
}

export default AvatarPreview