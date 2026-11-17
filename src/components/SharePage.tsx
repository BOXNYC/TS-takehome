import { buildURL, decodeAvatarConfig } from '../Services'
import '../styles/sharePage.css'

// feat: public page for /share?avatar=[base64 config]
const SharePage = () => {
  const encoded = new URLSearchParams(window.location.search).get('avatar')
  const options = encoded ? decodeAvatarConfig(encoded) : undefined

  return (
    <div className="share_page">
      {options ? (
        <>
          <div className="share_avatar">
            <img src={buildURL(options)} alt={`${options.name} robot avatar`} />
          </div>
          <h1 className="share_name">{options.name}</h1>
        </>
      ) : (
        // fix: show a message instead of crashing on a missing or malformed link
        <p className="share_error">This share link is invalid.</p>
      )}
      {/* feat: link styled as a button via share_button */}
      <a className="share_button" href="/">Create your own</a>
    </div>
  )
}

export default SharePage
