import { prisma } from './lib/db'

async function main() {
  const admin = await prisma.admin.findUnique({ where: { username: 'ironlifteradmin' } })
  console.log(admin)
}

main().catch(console.error).finally(() => prisma.$disconnect())
