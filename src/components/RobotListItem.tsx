import { useContext } from 'react'
import { AvatarContext, AvatarListContext } from './../context'
import { parseAvatarURL } from '../Services'
import '../styles/robotListItem.css'

interface Props {
  index: number
  name: string 
  url: string
}

const RobotListItem = (props: Props) => {
  const {index, name, url} = props
  const {deleteAvatar} = useContext(AvatarListContext)
  const {setAvatarOptions} = useContext(AvatarContext)

  return (
    <li className="avatar_item_container">
      <span className="item_avatar">
        <img
          src={url}
          alt={`robot avatar`}
        />
      </span>
      <span className="avatar_item_name">{name}</span>
      {/* feat: load this saved avatar's options (preview, active options, colors) into the editor */}
      <button
        className="avatar_edit"
        aria-label={`Edit ${name}`}
        onClick={() => setAvatarOptions(parseAvatarURL(url, name))}
        >✎</button>
      <button 
        className="avatar_delete"
        onClick={() => deleteAvatar(index)}
        >X</button>
    </li>
  )
}

export default RobotListItem