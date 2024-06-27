export interface searchParams {
  typedName: string
  time?: 'the newest' | 'the oldest' | ''
  fileName?: 'alphabetically' | 'reverse alphabetically' | ''
  authorId: string
  markedByStar?: boolean
}
