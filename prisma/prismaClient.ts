import { Prisma, PrismaClient } from "@prisma/client"

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (import.meta.env.NODE_ENV !== "production") {
  // eslint-disable-next-line functional/immutable-data
  globalThis.prismaGlobal = prisma
}

function prismaClientSingleton(): PrismaClient<Prisma.PrismaClientOptions, never> {
  const prisma = new PrismaClient(
    {
      log: [
        {
          emit: "event",
          level: "query",
        },
        {
          emit: "stdout",
          level: "error",
        },
        {
          emit: "stdout",
          level: "info",
        },
        {
          emit: "stdout",
          level: "warn",
        },
      ],
    },
  )

  // A décommenter pour déboguer Prisma
  // prisma.$on("query", (eventType) => {
  //   const blueColor = "\x1b[36m%s\x1b[0m"
  //   const whiteColor = "\x1b[0m"

  //   console.log(blueColor, "---------------")
  //   console.log(blueColor, "Query:", whiteColor, eventType.query)
  //   console.log("")
  //   console.log(blueColor, "Params:", whiteColor, eventType.params)
  //   console.log("")
  //   console.log(blueColor, "Duration:", whiteColor, eventType.duration, "ms")
  // })

  return prisma
}
