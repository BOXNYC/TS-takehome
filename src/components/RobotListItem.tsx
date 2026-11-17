import { useContext } from 'react'
import { AvatarContext, AvatarListContext } from './../context'
import { encodeAvatarConfig, parseAvatarURL } from '../Services'
import '../styles/robotListItem.css'

interface Props {
  index: number
  name: string 
  url: string
  // feat: lets the parent react to an edit, e.g. close the mobile offcanvas
  onEdit?: () => void
}

const RobotListItem = (props: Props) => {
  const {index, name, url, onEdit} = props
  const {deleteAvatar} = useContext(AvatarListContext)
  const {setAvatarOptions} = useContext(AvatarContext)

  return (
    <li className="avatar_item_container">
      <span className="item_avatar">
        {/* feat: a11y alt text includes the avatar name */}
        <img
          src={url}
          alt={`${name} robot avatar`}
        />
      </span>
      <span className="avatar_item_name">{name}</span>
      {/* feat: load this saved avatar's options (preview, active options, colors) into the editor */}
      {/* feat: open the share page for this avatar in a new window */}
      {/* feat: a11y icon buttons get aria-labels/titles naming the avatar, glyph text is aria-hidden */}
      <button
        type="button"
        className="avatar_share"
        aria-label={`Share ${name} (opens in a new window)`}
        title="Share (opens in a new window)"
        onClick={() => window.open(
          `/share?avatar=${encodeURIComponent(encodeAvatarConfig(parseAvatarURL(url, name)))}`,
          '_blank',
          'noopener'
        )}
        >
        {/* feat: three connected nodes, the standard share glyph */}
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4" />
        </svg>
      </button>
      <button
        type="button"
        className="avatar_edit"
        aria-label={`Edit ${name}`}
        title="Edit"
        onClick={() => { setAvatarOptions(parseAvatarURL(url, name)); onEdit?.() }}
        ><span aria-hidden="true">✎</span></button>
      <button 
        type="button"
        className="avatar_delete"
        aria-label={`Delete ${name}`}
        title="Delete"
        onClick={() => deleteAvatar(index)}
        ><span aria-hidden="true">X</span></button>
    </li>
  )
}

export default RobotListItem