import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchMediaChunk } from './media-fetch.server';

const makeResponse = (
  body: Uint8Array | null,
  init: { status: number; headers?: Record<string, string> },
) => new Response(body ? new Uint8Array(body).buffer : null, init);

const createMockZipWithDirectory = (): Uint8Array => {
  const dirName = new TextEncoder().encode('Folder/');
  const dirHeader = new Uint8Array(30 + dirName.length);
  const dirView = new DataView(dirHeader.buffer);
  dirView.setUint32(0, 0x04034b50, true);
  dirView.setUint16(4, 20, true);
  dirView.setUint16(8, 0, true);
  dirView.setUint32(18, 0, true);
  dirView.setUint32(22, 0, true);
  dirView.setUint16(26, dirName.length, true);
  dirView.setUint16(28, 0, true);
  dirHeader.set(dirName, 30);

  const fileName = new TextEncoder().encode('Folder/inner-video.mkv');
  const fileHeader = new Uint8Array(30 + fileName.length + 4);
  const fileView = new DataView(fileHeader.buffer);
  fileView.setUint32(0, 0x04034b50, true);
  fileView.setUint16(4, 20, true);
  fileView.setUint16(8, 0, true);
  fileView.setUint32(18, 4, true);
  fileView.setUint32(22, 4, true);
  fileView.setUint16(26, fileName.length, true);
  fileView.setUint16(28, 0, true);
  fileHeader.set(fileName, 30);
  fileHeader.set(new Uint8Array([0xaa, 0xbb, 0xcc, 0xdd]), 30 + fileName.length);

  const buffer = new Uint8Array(dirHeader.length + fileHeader.length);
  buffer.set(dirHeader, 0);
  buffer.set(fileHeader, dirHeader.length);
  return buffer;
};

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

  it('uses verified inner archive size for stored zip entries', async () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        makeResponse(null, {
          status: 200,
          headers: {
            'content-type': 'application/octet-stream',
            'content-length': '999',
            'content-disposition': 'attachment; filename="outer.zip"',
          },
        }),
      )
      .mockResolvedValueOnce(
        makeResponse(createMockZipWithDirectory(), {
          status: 206,
          headers: {
            'content-type': 'application/octet-stream',
            'content-range': 'bytes 0-255/999',
          },
        }),
      );

    const result = await fetchMediaChunk('https://example.com/archive');

    expect(result.fileSize).toBe(4);
    expect(Array.from(result.buffer)).toEqual([0xaa, 0xbb, 0xcc, 0xdd]);
    expect(result.archiveEntry).toMatchObject({
      name: 'Folder/inner-video.mkv',
      sizeStatus: 'verified',
      sizeSource: 'zip-local-header',
    });
  });
});
