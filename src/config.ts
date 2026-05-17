const DEFAULT_HEXGL_BASE_PATH = '/hexgl/'

const normalizeHexglBasePath = (value: string | undefined): string => {
  const trimmed = value?.trim()

  if (!trimmed) {
    return DEFAULT_HEXGL_BASE_PATH
  }

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`
}

export const hexglBasePath = normalizeHexglBasePath(
  import.meta.env.VITE_HEXGL_BASE_PATH
)
