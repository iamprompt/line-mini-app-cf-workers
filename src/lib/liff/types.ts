import GetProfileModule from '@line/liff/get-profile'

export type Profile = Awaited<
  ReturnType<ReturnType<typeof GetProfileModule.prototype.install>>
>
