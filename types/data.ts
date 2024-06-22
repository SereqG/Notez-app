export interface groupType {
  id: string
  photo?: string
  name: string
  inviteUrl: string
  invitePassword: string
  members: string[]
  admins: string[]
  files: string[]
  type?: string
  createdAt: string
}

export interface fileType {
  id: string
  name: string
  content: string
  author: string
  is_open: boolean
  createdAt: string
  groups: string[]
  photo: string
  type: string
  path: string
  filename?: string
  members: []
}

export type groupAndDataType = groupType | fileType
