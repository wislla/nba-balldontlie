import { ref, Ref, nextTick } from 'vue'
import { usePagination } from '@/composables/usePagination'
import type { Player } from '@/interfaces/Player'

describe('usePagination', () => {
  let items: Ref<Player[]>

  beforeEach(() => {
    items = ref(
      Array.from({ length: 23 }, (_, i) => ({
        id: i + 1,
        first_name: `First${i + 1}`,
        last_name: `Last${i + 1}`,
        country: 'Country',
        team: {
          id: 100 + i,
          city: `City${i + 1}`,
          full_name: `Team ${i + 1}`,
        },
      }))
    )
  })

  it('calcula totalPages corretamente', () => {
    const { totalPages } = usePagination(items, 10)
    expect(totalPages.value).toBe(3)
  })

  it('retorna itens paginados corretamente', () => {
    const { paginatedItems, currentPage } = usePagination(items, 10)
    expect(paginatedItems.value.length).toBe(10)
    expect(paginatedItems.value[0].id).toBe(1)
    currentPage.value = 2
    expect(paginatedItems.value[0].id).toBe(11)
    currentPage.value = 3
    expect(paginatedItems.value.length).toBe(3)
    expect(paginatedItems.value[0].id).toBe(21)
  })

  it('goToPage altera currentPage quando válido', () => {
    const { currentPage, goToPage } = usePagination(items, 10)
    goToPage(2)
    expect(currentPage.value).toBe(2)
    goToPage(3)
    expect(currentPage.value).toBe(3)
  })

  it('goToPage NÃO altera currentPage se page for menor que 1', () => {
    const { currentPage, goToPage } = usePagination(items, 10)
    currentPage.value = 2
    goToPage(0)
    expect(currentPage.value).toBe(2)
  })

  it('goToPage NÃO altera currentPage se page for maior que totalPages', () => {
    const { currentPage, goToPage, totalPages } = usePagination(items, 10)
    currentPage.value = 2
    goToPage(totalPages.value + 1)
    expect(currentPage.value).toBe(2)
  })

  it('reset currentPage para 1 quando items muda', async () => {
    const { currentPage } = usePagination(items, 10)
    currentPage.value = 2
    items.value = Array.from({ length: 5 }, (_, i) => ({
      id: i + 100,
      first_name: `First${i + 100}`,
      last_name: `Last${i + 100}`,
      country: 'Country',
      team: {
        id: 200 + i,
        city: `City${i + 100}`,
        full_name: `Team ${i + 100}`,
      },
    }))
    await nextTick()
    expect(currentPage.value).toBe(1)
  })
})
