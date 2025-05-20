import { computed } from 'vue'
import type { Ref } from 'vue'

export function useSort<T>(
  items: Ref<T[]>,
  orderBy: Ref<keyof T>,
  orderDirection: Ref<'asc' | 'desc'>
) {
  return computed(() => {
    return [...items.value].sort((a, b) => {
      const aVal = String(a[orderBy.value] ?? '').toLowerCase()
      const bVal = String(b[orderBy.value] ?? '').toLowerCase()
      if (orderDirection.value === 'asc') {
        return aVal.localeCompare(bVal)
      } else {
        return bVal.localeCompare(aVal)
      }
    })
  })
}
