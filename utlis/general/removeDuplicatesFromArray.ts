function removeDuplicates<T>(array: T[]): T[] {
  const uniqueMap: Map<string, T> = new Map()

  for (const obj of array) {
    const objString = JSON.stringify(obj)
    if (!uniqueMap.has(objString)) {
      uniqueMap.set(objString, obj)
    }
  }
  return Array.from(uniqueMap.values())
}
