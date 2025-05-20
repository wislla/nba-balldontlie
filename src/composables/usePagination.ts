import { ref, computed, type Ref, watch } from 'vue'

export function usePagination<Player>(items: Ref<Player[]>, perPage = 10) {
  const currentPage = ref(1)

  const totalPages = computed(() => Math.ceil(items.value.length / perPage))

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return items.value.slice(start, start + perPage)
  })

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  watch(items, () => {
    currentPage.value = 1
  })

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
  }
}
