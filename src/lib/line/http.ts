import ky from 'ky'

export const lineInstance = ky.create({
  prefixUrl: 'https://api.line.me',
})
