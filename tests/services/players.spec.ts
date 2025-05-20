import * as playersService from '@/services/players'

jest.mock('@/api/index', () => ({
  api: {
    get: jest.fn(),
  },
}))

describe('playersService', () => {
  const api = require('@/api/index').api

  it('getPlayers faz chamada correta e retorna data', async () => {
    api.get.mockResolvedValueOnce({ data: { my: 'data' } })
    const params = { page: 1 }
    const result = await playersService.getPlayers(params)
    expect(api.get).toHaveBeenCalledWith('/players', { params })
    expect(result).toEqual({ my: 'data' })
  })

  it('fakeEditPlayer resolve com player', async () => {
    jest.useFakeTimers()
    const player = { id: 123 }
    const promise = playersService.fakeEditPlayer(player)
    jest.advanceTimersByTime(2500)
    const result = await promise
    expect(result).toEqual(player)
    jest.useRealTimers()
  })

  it('fakeDeletePlayer resolve void', async () => {
    jest.useFakeTimers()
    const promise = playersService.fakeDeletePlayer({ id: 456 } as any)
    jest.advanceTimersByTime(2500)
    await expect(promise).resolves.toBeUndefined()
    jest.useRealTimers()
  })
})
