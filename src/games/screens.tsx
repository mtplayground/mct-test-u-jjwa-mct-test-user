import { Game2048 } from './Game2048'
import { GameHexgl } from './GameHexgl'
import { GamePacman } from './GamePacman'

export const Game2048Screen = () => {
  return <Game2048 />
}

export const PacmanScreen = () => {
  return <GamePacman />
}

export const HexglScreen = () => {
  return <GameHexgl />
}
