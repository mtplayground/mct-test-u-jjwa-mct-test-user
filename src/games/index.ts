import type { ComponentType } from 'react'

import type { GameId } from '../context/session'
import { Game2048Screen, HexglScreen, PacmanScreen } from './screens'

export type GameDefinition = {
  id: GameId
  label: string
  component: ComponentType
}

export const gameRegistry: GameDefinition[] = [
  {
    id: '2048',
    label: '2048',
    component: Game2048Screen,
  },
  {
    id: 'pacman',
    label: 'Pac-Man',
    component: PacmanScreen,
  },
  {
    id: 'hexgl',
    label: 'HexGL',
    component: HexglScreen,
  },
]

export const gameRegistryById: Record<GameId, GameDefinition> = {
  '2048': gameRegistry[0],
  pacman: gameRegistry[1],
  hexgl: gameRegistry[2],
}
