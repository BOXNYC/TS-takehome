import { createContext, type Dispatch, type SetStateAction } from "react"
import type { AvatarList, AvatarListItem, AvatarOptions, AvatarURL } from "./Types"

interface AvatarContextValue {
  avatarOptions: AvatarOptions
  setAvatarOptions: Dispatch<SetStateAction<AvatarOptions>>
}

interface AvatarListContextValue {
  avatarList: AvatarList
  saveAvatar: (avatar: AvatarListItem) => void
  deleteAvatar: (index: number) => void
}

export const AvatarContext = createContext<AvatarContextValue>({
  avatarOptions: undefined,
  setAvatarOptions: () => {},
})
export const AvatarURLContext = createContext<AvatarURL>(undefined)
export const AvatarListContext = createContext<AvatarListContextValue>({
  avatarList: [],
  saveAvatar: () => {},
  deleteAvatar: () => {},
})
