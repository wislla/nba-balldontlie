import type { Player } from '@/interfaces/Player'

export function normalizeEditablePlayer(p?: Partial<Player>): Player {
  return {
    id: p?.id ?? 0,
    first_name: p?.first_name ?? '',
    last_name: p?.last_name ?? '',
    country: p?.country ?? '',
    team: {
      id: p?.team?.id ?? 0,
      full_name: p?.team?.full_name ?? '',
      city: p?.team?.city ?? '',
    },
  }
}
