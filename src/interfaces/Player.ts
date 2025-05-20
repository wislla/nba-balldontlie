export interface Player {
  id: number
  first_name: string
  last_name: string
  country: string
  team: {
    id: number
    city: string
    full_name: string
  }
}

export interface PlayersResponse {
  data: Player[]
  meta: {
    next_cursor: number
    per_page: number
  }
}

export interface GetPlayersParams {
  page?: number
  per_page?: number
  search?: string
  cursor?: number
}

export interface UsePlayersParams {
  initialSearch?: string
  initialPerPage?: number
}
