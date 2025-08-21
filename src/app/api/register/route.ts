export const runtime = 'edge'

export const POST = async () => {
  return new Response('Registration endpoint is not implemented yet', {
    status: 501,
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
