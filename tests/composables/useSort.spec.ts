import { ref, Ref } from 'vue'
import { useSort } from '@/composables/useSort'

describe('useSort', () => {
  let items: Ref<any[]>
  let orderBy: Ref<string>
  let orderDirection: Ref<'asc' | 'desc'>

  beforeEach(() => {
    items = ref([
      { id: 1, name: 'Carlos' },
      { id: 2, name: 'ana' },
      { id: 3, name: 'Bruno' },
      { id: 4, name: null },
    ])
    orderBy = ref('name')
    orderDirection = ref('asc')
  })

  it('ordena ascendente (asc)', () => {
    const sorted = useSort(items, orderBy, orderDirection)
    expect(sorted.value.map((i) => i.name)).toEqual([
      null,
      'ana',
      'Bruno',
      'Carlos',
    ])
  })

  it('ordena descendente (desc)', () => {
    orderDirection.value = 'desc'
    const sorted = useSort(items, orderBy, orderDirection)
    expect(sorted.value.map((i) => i.name)).toEqual([
      'Carlos',
      'Bruno',
      'ana',
      null,
    ])
  })

  it('ordena corretamente se orderBy está undefined', () => {
    orderBy.value = undefined as any
    const sorted = useSort(items, orderBy, orderDirection)
    const sortedNames = sorted.value.map((i) => i.name)
    expect(sortedNames).toContain('ana')
    expect(sortedNames).toContain('Bruno')
    expect(sortedNames).toContain('Carlos')
    expect(sortedNames).toContain(null)
    expect(sortedNames.length).toBe(4)
  })

  it('ordena corretamente se um valor for undefined', () => {
    items.value = [
      { id: 1 },
      { id: 2, name: 'Ana' },
      { id: 3, name: undefined },
    ]
    const sorted = useSort(items, orderBy, orderDirection)
    expect(sorted.value.map((i) => i.name)).toEqual([
      undefined,
      undefined,
      'Ana',
    ])
  })
})
