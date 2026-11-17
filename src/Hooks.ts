import { useCallback, useEffect, useState } from 'react'
import { AvatarList, AvatarListItem } from './Types'

const STORAGE_KEY = 'avatars'

/*
  refactor: use local storage to persist avatar list and provide a single hook for managing it
  refactor: instead of saving each avatar as an individual item, save the entire list as a single entry array in local storage.
  fix: refactor above removes the random key generated local storage entries and unique jsx keys. Major bugs resolved in refactor.
 */

const readAvatarList = (): AvatarList => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.log(error)
    return []
  }
}

const writeAvatarList = (list: AvatarList) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch (error) {
    console.log(error)
  }
}

export const useAvatarList = () => {
  const [avatarList, setAvatarList] = useState<AvatarList>(readAvatarList)

  // persist after every change so the callbacks below can use functional updates and stay referentially stable
  useEffect(() => {
    writeAvatarList(avatarList)
  }, [avatarList])

  const saveAvatar = useCallback((avatar: AvatarListItem) => {
    setAvatarList((prev) => [...prev, avatar])
  }, [])

  const deleteAvatar = useCallback((index: number) => {
    setAvatarList((prev) => prev.filter((_, i) => i !== index))
  }, [])

  return { avatarList, saveAvatar, deleteAvatar }
}
