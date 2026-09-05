export interface Env {
  ASSETS: Fetcher
  ANALYTICS: AnalyticsEngineDataset
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url)
    const cf = request.cf

    ctx.waitUntil(
      (async () => {
        try {
          env.ANALYTICS?.writeDataPoint({
            blobs: [
              url.pathname,
              String(cf?.country ?? 'XX'),
              String(cf?.city ?? ''),
              request.headers.get('referer') ?? '',
            ],
            doubles: [Number(cf?.latitude ?? 0), Number(cf?.longitude ?? 0)],
            indexes: [String(cf?.country ?? 'XX')],
          })
        } catch {
          // analytics must never break the response
        }
      })(),
    )

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
