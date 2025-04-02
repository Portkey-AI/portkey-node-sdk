import fs from 'fs';

function getAudioFileDuration(filePath: string) {
  const extension = filePath.split('.').pop()?.toLowerCase();
  const buffer = fs.readFileSync(filePath);

  switch (extension) {
    case 'wav':
      return calculateWavDuration(buffer);
    case 'mp3':
      return calculateMp3Duration(buffer);
    case 'mpga':
      return calculateMpgaDuration(buffer);
    case 'flac':
      return calculateFlacDuration(buffer);
    case 'ogg':
      return calculateOggDuration(buffer);
    case 'mp4':
    case 'm4a':
      return calculateMp4Duration(buffer);
    default:
      return null;
  }
}

function calculateWavDuration(buffer: any) {
  const sampleRate = buffer.readUInt32LE(24);
  const dataSize = buffer.readUInt32LE(40);
  const bitsPerSample = buffer.readUInt16LE(34);
  const channels = buffer.readUInt16LE(22);

  const durationSec = dataSize / (sampleRate * channels * (bitsPerSample / 8));
  const durationMs = Math.round(durationSec * 1000);

  return durationMs.toString();
}

function calculateMp3Duration(fileBuffer: any) {
  if (fileBuffer.length < 128) {
    return null;
  }

  for (let i = 0; i < fileBuffer.length - 4; i++) {
    if (fileBuffer[i] === 0xff && (fileBuffer[i + 1] & 0xe0) === 0xe0) {
      const bitrateIndex = (fileBuffer[i + 2] >> 4) & 0x0f;
      const sampleRateIndex = (fileBuffer[i + 2] >> 2) & 0x03;

      const bitrates: any = [
        0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320,
      ];
      const sampleRates = [44100, 48000, 32000];

      const bitrate = bitrates[bitrateIndex] * 1000;
      const sampleRate = sampleRates[sampleRateIndex];

      if (!bitrate || !sampleRate) {
        return null;
      }

      const fileSizeInBits = fileBuffer.length * 8;
      const duration = (fileSizeInBits / bitrate) * 1000;

      return duration.toFixed(0);
    }
  }

  return null;
}

function calculateMpgaDuration(fileBuffer: any) {
  if (fileBuffer.length < 128) {
    return null;
  }

  for (let i = 0; i < fileBuffer.length - 4; i++) {
    if (fileBuffer[i] === 0xff && (fileBuffer[i + 1] & 0xf0) === 0xf0) {
      const bitrateIndex = (fileBuffer[i + 2] >> 4) & 0x0f;
      const sampleRateIndex = (fileBuffer[i + 2] >> 2) & 0x03;

      const bitrates: any = [
        0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0,
      ];

      const sampleRates: any = [
        [44100, 48000, 32000, 0],
        [22050, 24000, 16000, 0],
        [11025, 12000, 8000, 0],
      ];

      const versionBits = (fileBuffer[i + 1] >> 3) & 0x03;
      const versionIndex = versionBits === 3 ? 0 : versionBits === 2 ? 1 : 2;

      if (
        bitrateIndex === 0 ||
        bitrateIndex >= bitrates.length - 1 ||
        sampleRateIndex >= 3
      ) {
        continue;
      }

      const bitrate = bitrates[bitrateIndex] * 1000;
      const sampleRate = sampleRates[versionIndex][sampleRateIndex];

      if (!bitrate || !sampleRate) {
        continue;
      }

      const fileSizeInBits = fileBuffer.length * 8;
      const duration = (fileSizeInBits / bitrate) * 1000;

      return duration.toFixed(0);
    }
  }

  return null;
}

function calculateFlacDuration(buffer: any) {
  if (buffer.slice(0, 4).toString() !== 'fLaC') {
    return null;
  }

  let offset = 4;

  let isLastBlock = false;
  let foundStreamInfo = false;
  let totalSamples = 0;
  let sampleRate = 0;

  while (!isLastBlock && offset < buffer.length) {
    isLastBlock = (buffer[offset] & 0x80) === 0x80;
    const blockType = buffer[offset] & 0x7f;
    const blockLength = buffer.readUInt32BE(offset) & 0x00ffffff;
    offset += 4;

    if (blockType === 0) {
      sampleRate =
        (buffer[offset + 10] << 12) |
        (buffer[offset + 11] << 4) |
        ((buffer[offset + 12] & 0xf0) >> 4);
      totalSamples =
        ((buffer[offset + 13] & 0x0f) << 32) |
        (buffer[offset + 14] << 24) |
        (buffer[offset + 15] << 16) |
        (buffer[offset + 16] << 8) |
        buffer[offset + 17];
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
}

function calculateOggDuration(buffer: any) {
  if (buffer.slice(0, 4).toString() !== 'OggS') {
    return null;
  }

  let lastGranulePos = 0;
  let offset = 0;

  while (offset < buffer.length - 27) {
    if (buffer.slice(offset, offset + 4).toString() === 'OggS') {
      const granulePos = Number(buffer.readBigInt64LE(offset + 6));
      if (granulePos > lastGranulePos) {
        lastGranulePos = granulePos;
      }

      const pageSegments = buffer[offset + 26];
      const headerSize = 27 + pageSegments;
      let pageSize = headerSize;

      for (let i = 0; i < pageSegments; i++) {
        pageSize += buffer[offset + 27 + i];
      }

      offset += pageSize;
    } else {
      offset++;
    }
  }

  let sampleRate = 0;
  offset = 0;

  while (offset < Math.min(buffer.length, 10000)) {
    if (buffer.slice(offset, offset + 7).toString() === '\x01vorbis') {
      sampleRate = buffer.readUInt32LE(offset + 12);
      break;
    }
    offset++;
  }

  if (sampleRate === 0) {
    return null;
  }

  const durationSec = lastGranulePos / sampleRate;
  const durationMs = Math.round(durationSec * 1000);

  return durationMs.toString();
}

function calculateMp4Duration(buffer: any) {
  try {
    return findMp4Duration(buffer, 0, buffer.length);
  } catch (error) {
    return null;
  }
}

function findMp4Duration(
  buffer: any,
  start: number,
  end: number
): string | null {
  let offset = start;

  while (offset < end - 8) {
    if (offset + 4 > buffer.length) {
      break;
    }

    let atomSize = buffer.readUInt32BE(offset);
    if (atomSize === 0) {
      atomSize = end - offset;
    } else if (atomSize === 1) {
      if (offset + 16 > buffer.length) break;
      const atomSizeHigh = buffer.readUInt32BE(offset + 8);
      const atomSizeLow = buffer.readUInt32BE(offset + 12);
      atomSize = atomSizeHigh * Math.pow(2, 32) + atomSizeLow;
      offset += 8;
    }

    if (atomSize < 8 || offset + atomSize > buffer.length) {
      offset += 4;
      continue;
    }

    const atomType = buffer.slice(offset + 4, offset + 8).toString();

    if (atomType === 'mvhd') {
      const version = buffer[offset + 8];
      let timescale, duration;

      if (version === 0) {
        if (offset + 28 > buffer.length) break;
        timescale = buffer.readUInt32BE(offset + 20);
        duration = buffer.readUInt32BE(offset + 24);
      } else {
        if (offset + 40 > buffer.length) break;
        timescale = buffer.readUInt32BE(offset + 28);

        const durationHigh = buffer.readUInt32BE(offset + 32);
        const durationLow = buffer.readUInt32BE(offset + 36);
        duration = durationHigh * Math.pow(2, 32) + durationLow;
      }

      if (timescale > 0) {
        const durationSec = duration / timescale;
        const durationMs = Math.round(durationSec * 1000);
        return durationMs.toString();
      }
    }

    if (['moov', 'trak', 'mdia', 'minf', 'stbl'].includes(atomType)) {
      try {
        const result = findMp4Duration(buffer, offset + 8, offset + atomSize);
        if (result !== null) {
          return result;
        }
      } catch (e) {
        return null;
      }
    }

    offset += atomSize;
  }

  if (start === 0) {
    return null;
  }

  return null;
}

export default getAudioFileDuration;
