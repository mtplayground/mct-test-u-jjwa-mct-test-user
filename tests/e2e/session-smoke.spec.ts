import { expect, type Page, test } from '@playwright/test'

const GAME_PAUSE_MS = 2200

const parseDurationToSeconds = (value: string) => {
  const match = value.match(/(\d+)\s+minute(?:s)?\s+(\d+)\s+second(?:s)?/i)

  if (!match) {
    throw new Error(`Unable to parse duration string: ${value}`)
  }

  const [, minutesText, secondsText] = match
  return Number(minutesText) * 60 + Number(secondsText)
}

const readGameDuration = async (page: Page, gameLabel: string) => {
  const row = page
    .getByText(gameLabel, { exact: true })
    .locator('xpath=ancestor::div[contains(@class,"justify-between")][1]')
  const durationText = await row.locator('span').nth(1).textContent()

  if (!durationText) {
    throw new Error(`Unable to find duration for ${gameLabel}`)
  }

  return parseDurationToSeconds(durationText)
}

test('smoke flow tracks time across all games and goodbye summary balances', async ({
  page,
}) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Choose a game to start playing' })
  ).toBeVisible()

  await page.getByRole('button', { name: /cartridge 2048 go/i }).click()
  await expect(page.getByRole('heading', { name: '2048' })).toBeVisible()
  await page.waitForTimeout(GAME_PAUSE_MS)

  await page.getByRole('button', { name: /cartridge pac-man go/i }).click()
  await expect(page.getByRole('heading', { name: 'Pac-Man' })).toBeVisible()
  await page.waitForTimeout(GAME_PAUSE_MS)

  await page.getByRole('button', { name: /cartridge hexgl go/i }).click()
  await expect(page.getByRole('heading', { name: 'HexGL' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Launch Race' })).toBeVisible()
  await expect(page.getByLabel('HexGL game frame')).toHaveAttribute(
    'src',
    'about:blank'
  )
  await page.waitForTimeout(GAME_PAUSE_MS)

  await page.getByRole('button', { name: /end playing/i }).click()
  await expect(
    page.getByRole('heading', { name: 'Thanks for playing!' })
  ).toBeVisible()

  const summaryText = await page.locator('main').textContent()

  if (!summaryText) {
    throw new Error('Goodbye summary text was empty')
  }

  const totalMatch = summaryText.match(
    /Total play time:\s*(\d+\s+minute(?:s)?\s+\d+\s+second(?:s)?)/i
  )

  if (!totalMatch) {
    throw new Error('Unable to find total play time in goodbye summary')
  }

  const totalSeconds = parseDurationToSeconds(totalMatch[1])
  const gameDurations = await Promise.all([
    readGameDuration(page, '2048'),
    readGameDuration(page, 'Pac-Man'),
    readGameDuration(page, 'HexGL'),
  ])

  expect(totalSeconds).toBeGreaterThan(0)
  expect(gameDurations[0]).toBeGreaterThan(0)
  expect(gameDurations[1]).toBeGreaterThan(0)
  expect(gameDurations[2]).toBeGreaterThan(0)
  expect(gameDurations[0] + gameDurations[1] + gameDurations[2]).toBe(
    totalSeconds
  )
})
