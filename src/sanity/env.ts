export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-23'

const rawDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim()
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()

export const dataset = rawDataset || 'production'

// Validate format — Sanity only allows a-z, 0-9 and dashes
export const projectId =
  rawProjectId && /^[a-z0-9-]+$/.test(rawProjectId) ? rawProjectId : 'placeholder'
