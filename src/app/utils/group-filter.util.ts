export function filterGroups<T extends string>(
  groups: readonly T[],
  searchText: string
): T[] {
  const query = searchText.toLowerCase().trim();
  if (!query) {
    return [...groups];
  }

  return groups.filter(group => group.toLowerCase().includes(query));
}
