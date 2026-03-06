import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchMediaChunk } from './media-fetch.server';

const makeResponse = (
  body: Uint8Array | null,
  init: { status: number; headers?: Record<string, string> },
) => new Response(body ? new Uint8Array(body).buffer : null, init);

describe('fetchMediaChunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('uses Content-Range from the ranged GET when HEAD hides the real file size', async () => {
    const proxiedFilename = 'proxy-media-sample.mkv';
    const proxiedUrl = 'https://proxy.example.test/r/opaque-token';

    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        makeResponse(null, {
          status: 200,
          headers: {
            'content-type': 'text/plain;charset=UTF-8',
          },
        }),
      )
      .mockResolvedValueOnce(
        makeResponse(new Uint8Array([0, 1, 2, 3]), {
          status: 206,
          headers: {
            'content-type': 'application/octet-stream',
            'content-range': 'bytes 0-3/4373212360',
            'content-disposition':
              `attachment; filename="${proxiedFilename}"`,
          },
        }),
      );

    const result = await fetchMediaChunk(proxiedUrl);

    expect(result.fileSize).toBe(4_373_212_360);
    expect(result.filename).toBe(proxiedFilename);
    expect(result.filenameSource).toBe('content-disposition-get');
  });
});
