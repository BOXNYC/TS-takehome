export type AvatarOptions = {
  name: string,
  backgroundColor: string,
  baseColor: string,
  eyes:  string,
  face:  string,    
  mouth:  string,
  sides: string,
  texture: string,
  top: string,
} | undefined 

export type AvatarURL = string | undefined

export interface Avatar {
  url: AvatarURL
  options: AvatarOptions  
}

// fix: named union so option keys are typed instead of string
export type OptionKey = "name" | "backgroundColor" | "baseColor" | "eyes" | "face" | "mouth" | "sides" | "texture" | "top"

export interface OverrideOption {
  name: OptionKey
  value: string
}

export type TabData = {
  label:string,
  option:OptionKey
}

export interface CustomizationOptions {
  label:string,
  option:OptionKey
  values:string[]
}

export interface AvatarListItem {
  URL: string;
  name: string;
}
export type AvatarList = AvatarListItem[]
