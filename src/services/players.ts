import type { GetPlayersParams, PlayersResponse } from '@/interfaces/Player'
import { api } from '../api/index'

export async function getPlayers(
  params?: GetPlayersParams
): Promise<PlayersResponse> {
  const res = await api.get<PlayersResponse>('/players', { params })
  return res.data
}

export function fakeEditPlayer<Player>(player: Player): Promise<Player> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(player), 2500)
  })
}

export function fakeDeletePlayer<Player>(player: Player): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 2500)
  })
}
