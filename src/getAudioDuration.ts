import { isRunningInBrowser } from './core';

const isBrowser = isRunningInBrowser();

let fs: any;
let open: any;
let read: any;
let stat: any;
let close: any;

if (!isBrowser) {
  try {
    fs = require('fs');
    const { promisify } = require('util');
    open = promisify(fs.open);
    read = promisify(fs.read);
    stat = promisify(fs.stat);
    close = promisify(fs.close);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('File system operations not available in this environment');
  }
}

/**
 * Get audio file duration in milliseconds
 * Uses optimized file reading to avoid loading entire files into memory
 */
async function getAudioFileDuration(filePath: string): Promise<string | null> {
  if (isBrowser || !fs) {
    return null;
  }

  try {
    const extension = filePath.split('.').pop()?.toLowerCase();
    const fileStats = await stat(filePath);
    const fileSize = fileStats.size;

    switch (extension) {
      case 'wav':
        return calculateWavDuration(filePath);
      case 'mp3':
        return calculateMp3Duration(filePath, fileSize);
      case 'mpga':
        return calculateMpgaDuration(filePath, fileSize);
      case 'flac':
        return calculateFlacDuration(filePath);
      case 'ogg':
        return calculateOggDuration(filePath, fileSize);
      case 'mp4':
      case 'm4a':
        return calculateMp4Duration(filePath);
      default:
        return null;
    }
  } catch (error) {
    return null;
  }
}

/**
 * Helper function to read a portion of a file
 */
async function readFileChunk(
  filePath: string,
  position: number,
  length: number
): Promise<Buffer> {
  const fd = await open(filePath, 'r');
  const buffer = Buffer.alloc(length);
  try {
    const { bytesRead } = await read(fd, buffer, 0, length, position);
    if (bytesRead < length) {
      return buffer.slice(0, bytesRead);
    }
    return buffer;
  } finally {
    await close(fd);
  }
}

async function calculateWavDuration(filePath: string): Promise<string | null> {
  try {
    // For WAV files, we only need to read the header (44 bytes is sufficient)
    const buffer = await readFileChunk(filePath, 0, 44);

    // Check if buffer has enough bytes for WAV header
    if (buffer.length < 44) {
      return null;
    }

    const sampleRate = buffer.readUInt32LE(24);
    const dataSize = buffer.readUInt32LE(40);
    const bitsPerSample = buffer.readUInt16LE(34);
    const channels = buffer.readUInt16LE(22);

    const durationSec =
      dataSize / (sampleRate * channels * (bitsPerSample / 8));
    const durationMs = Math.round(durationSec * 1000);

    return durationMs.toString();
  } catch (error) {
    return null;
  }
}

async function calculateMp3Duration(
  filePath: string,
  fileSize: number
): Promise<string | null> {
  try {
    // Read the first 10KB to find the header
    const headerBuffer = (await readFileChunk(
      filePath,
      0,
      Math.min(10240, fileSize)
    )) as any;

    if (headerBuffer.length < 128) {
      return null;
    }

    for (let i = 0; i < headerBuffer.length - 4; i++) {
      if (headerBuffer[i] === 0xff && (headerBuffer[i + 1] & 0xe0) === 0xe0) {
        const bitrateIndex = (headerBuffer[i + 2] >> 4) & 0x0f;
        const sampleRateIndex = (headerBuffer[i + 2] >> 2) & 0x03;

        const bitrates = [
          0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320,
        ];
        const sampleRates = [44100, 48000, 32000];

        // Check for valid indices
        if (
          bitrateIndex >= bitrates.length ||
          sampleRateIndex >= sampleRates.length
        ) {
          continue;
        }

        // Now we know these indices are valid
        const bitrate = Number(bitrates[bitrateIndex]);
        const sampleRate = Number(sampleRates[sampleRateIndex]);

        if (!bitrate || !sampleRate) {
          continue;
        }

        const fileSizeInBits = fileSize * 8;
        const duration = (fileSizeInBits / (bitrate * 1000)) * 1000;

        return duration.toFixed(0);
      }
    }
  } catch (error) {
    // If any calculation fails, return null
  }
  return null;
}

async function calculateMpgaDuration(
  filePath: string,
  fileSize: number
): Promise<string | null> {
  try {
    // Read the first 10KB to find the header
    const headerBuffer = (await readFileChunk(
      filePath,
      0,
      Math.min(10240, fileSize)
    )) as any;

    if (headerBuffer.length < 128) {
      return null;
    }

    for (let i = 0; i < headerBuffer.length - 4; i++) {
      if (headerBuffer[i] === 0xff && (headerBuffer[i + 1] & 0xf0) === 0xf0) {
        const bitrateIndex = (headerBuffer[i + 2] >> 4) & 0x0f;
        const sampleRateIndex = (headerBuffer[i + 2] >> 2) & 0x03;

        const bitrates = [
          0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0,
        ];

        const sampleRates = [
          [44100, 48000, 32000, 0],
          [22050, 24000, 16000, 0],
          [11025, 12000, 8000, 0],
        ] as any;

        const versionBits = (headerBuffer[i + 1] >> 3) & 0x03;
        const versionIndex = versionBits === 3 ? 0 : versionBits === 2 ? 1 : 2;

        // Check all indices are valid
        if (
          bitrateIndex === 0 ||
          bitrateIndex >= bitrates.length ||
          sampleRateIndex >= 3 ||
          versionIndex >= sampleRates.length
        ) {
          continue;
        }

        // Check for valid sampleRate index
        if (sampleRateIndex >= sampleRates[versionIndex]?.length) {
          continue;
        }

        // Now we know these indices are valid
        const bitrate = Number(bitrates[bitrateIndex]);
        const sampleRate = Number(sampleRates[versionIndex]?.[sampleRateIndex]);

        if (!bitrate || !sampleRate) {
          continue;
        }

        const fileSizeInBits = fileSize * 8;
        const duration = (fileSizeInBits / (bitrate * 1000)) * 1000;

        return duration.toFixed(0);
      }
    }
  } catch (error) {
    // If any calculation fails, return null
  }
  return null;
}

async function calculateFlacDuration(filePath: string): Promise<string | null> {
  try {
    // Read the first portion of the file to find FLAC metadata
    const headerBuffer = await readFileChunk(filePath, 0, 4);

    if (headerBuffer.toString() !== 'fLaC') {
      return null;
    }

    // Read up to 100KB to find the stream info block
    const metadataBuffer = (await readFileChunk(filePath, 4, 102400)) as any;

    let offset = 0;
    let isLastBlock = false;
    let foundStreamInfo = false;
    let totalSamples = 0;
    let sampleRate = 0;

    while (!isLastBlock && offset < metadataBuffer.length) {
      if (offset + 4 > metadataBuffer.length) {
        break;
      }

      isLastBlock = (metadataBuffer[offset] & 0x80) === 0x80;
      const blockType = metadataBuffer[offset] & 0x7f;
      const blockLength = metadataBuffer.readUInt32BE(offset) & 0x00ffffff;
      offset += 4;

      if (blockType === 0 && offset + 18 <= metadataBuffer.length) {
        sampleRate =
          (metadataBuffer[offset + 10] << 12) |
          (metadataBuffer[offset + 11] << 4) |
          ((metadataBuffer[offset + 12] & 0xf0) >> 4);
        totalSamples =
          ((metadataBuffer[offset + 13] & 0x0f) << 32) |
          (metadataBuffer[offset + 14] << 24) |
          (metadataBuffer[offset + 15] << 16) |
          (metadataBuffer[offset + 16] << 8) |
          metadataBuffer[offset + 17];
        foundStreamInfo = true;
        break;
      }

      offset += blockLength;
    }

    if (!foundStreamInfo || sampleRate === 0) {
      return null;
    }

    const durationSec = totalSamples / sampleRate;
    const durationMs = Math.round(durationSec * 1000);

    return durationMs.toString();
  } catch (error) {
    return null;
  }
}

async function calculateOggDuration(
  filePath: string,
  fileSize: number
): Promise<string | null> {
  try {
    // Read the beginning of the file to check signature
    const headerBuffer = await readFileChunk(filePath, 0, 4);

    if (headerBuffer.toString() !== 'OggS') {
      return null;
    }

    // For Ogg, we need to read the beginning for the sample rate and end for granule position
    const headPart = await readFileChunk(
      filePath,
      0,
      Math.min(10000, fileSize)
    );

    // Read the last 10KB of the file to find the last page
    const tailSize = Math.min(10240, fileSize);
    const tailPart = await readFileChunk(
      filePath,
      Math.max(0, fileSize - tailSize),
      tailSize
    );

    let sampleRate = 0;
    let offset = 0;

    // Find sample rate in the header part
    while (offset < headPart.length - 7) {
      if (
        offset + 7 <= headPart.length &&
        headPart.slice(offset, offset + 7).toString() === '\x01vorbis'
      ) {
        if (offset + 16 < headPart.length) {
          sampleRate = headPart.readUInt32LE(offset + 12);
          break;
        }
      }
      offset++;
    }

    if (sampleRate === 0) {
      return null;
    }

    // Find the last granule position in the tail part
    let lastGranulePos = 0;
    offset = 0;

    while (offset < tailPart.length - 27) {
      if (
        offset + 4 <= tailPart.length &&
        tailPart.slice(offset, offset + 4).toString() === 'OggS'
      ) {
        if (offset + 14 < tailPart.length) {
          const granulePos = Number(tailPart.readBigInt64LE(offset + 6));
          if (granulePos > lastGranulePos) {
            lastGranulePos = granulePos;
          }

          if (offset + 27 >= tailPart.length) {
            break;
          }

          const pageSegments = tailPart[offset + 26] as any;
          const headerSize = 27 + pageSegments;
          let pageSize = headerSize;

          for (
            let i = 0;
            i < pageSegments && offset + 27 + i < tailPart.length;
            i++
          ) {
            pageSize += tailPart[offset + 27 + i];
          }

          offset += pageSize;
        } else {
          break;
        }
      } else {
        offset++;
      }
    }

    if (lastGranulePos === 0) {
      return null;
    }

    const durationSec = lastGranulePos / sampleRate;
    const durationMs = Math.round(durationSec * 1000);

    return durationMs.toString();
  } catch (error) {
    return null;
  }
}

async function calculateMp4Duration(filePath: string): Promise<string | null> {
  try {
    const fd = await open(filePath, 'r');
    try {
      return await findMp4Duration(fd, filePath, 0);
    } finally {
      await close(fd);
    }
  } catch (error) {
    return null;
  }
}

async function findMp4Duration(
  fd: number,
  filePath: string,
  position: number
): Promise<string | null> {
  try {
    const headerSize = 8;
    const headerBuffer = Buffer.alloc(headerSize);

    const { bytesRead } = await read(fd, headerBuffer, 0, headerSize, position);
    if (bytesRead < headerSize) return null;

    const atomSize = headerBuffer.readUInt32BE(0);
    if (atomSize < 8) return null;

    const atomType = headerBuffer.slice(4, 8).toString();

    if (atomType === 'moov') {
      // Read the entire moov atom, which contains duration info
      const moovBuffer = await readFileChunk(filePath, position, atomSize);

      // Search for mvhd atom inside moov
      for (let offset = 8; offset < moovBuffer.length - 8; offset++) {
        if (
          offset + 4 <= moovBuffer.length &&
          moovBuffer.slice(offset, offset + 4).toString() === 'mvhd'
        ) {
          if (offset + 5 >= moovBuffer.length) break;

          const version = moovBuffer[offset + 4];
          let timescale, duration;

          if (version === 0) {
            if (offset + 24 >= moovBuffer.length) break;
            timescale = moovBuffer.readUInt32BE(offset + 16);
            duration = moovBuffer.readUInt32BE(offset + 20);
          } else {
            if (offset + 36 >= moovBuffer.length) break;
            timescale = moovBuffer.readUInt32BE(offset + 24);
            const durationHigh = moovBuffer.readUInt32BE(offset + 28);
            const durationLow = moovBuffer.readUInt32BE(offset + 32);
            duration = durationHigh * Math.pow(2, 32) + durationLow;
          }

          if (timescale > 0) {
            const durationSec = duration / timescale;
            const durationMs = Math.round(durationSec * 1000);
            return durationMs.toString();
          }
        }
      }
    } else if (['trak', 'mdia', 'minf', 'stbl'].includes(atomType)) {
      // Read and recursively search these container atoms
      return findMp4Duration(fd, filePath, position + 8);
    }

    // If we didn't find duration in this atom, try the next one
    if (atomSize > 0) {
      return findMp4Duration(fd, filePath, position + atomSize);
    }
  } catch (e) {
    return null;
  }

  return null;
}

export default getAudioFileDuration;
