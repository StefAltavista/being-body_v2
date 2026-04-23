type Entry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, Entry>();

export function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0].trim();
  }

  const forwarded = req.headers.get("forwarded");
  if (forwarded) {
    const match = forwarded.match(/for="?(\[?[a-fA-F0-9:.]+\]?)/);
    if (match) return match[1];
  }

  return "unknown";
}

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || now > current.resetAt) {
    const next: Entry = {
      count: 1,
      resetAt: now + windowMs,
    };
    store.set(key, next);
    return {
      ok: true,
      remaining: limit - 1,
      resetAt: next.resetAt,
    };
  }

  if (current.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      resetAt: current.resetAt,
    };
  }

  current.count += 1;
  store.set(key, current);

  return {
    ok: true,
    remaining: Math.max(0, limit - current.count),
    resetAt: current.resetAt,
  };
}
