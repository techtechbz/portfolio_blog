export const fullPathToPostId = (filePath: string): string => filePath.replace(/\/app\/posts\/([a-z0-9-/]+)\.md/, "$1")