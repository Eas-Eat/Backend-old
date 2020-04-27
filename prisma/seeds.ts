import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const cuisineChinese = await prisma.cuisine.create({
    data: {
      type: 'chinese',
      svgName: 'icon_chinese.svg',
    },
  })
  console.log(cuisineChinese)

  const cuisineJapanese = await prisma.cuisine.create({
    data: {
      type: 'japanese',
      svgName: 'icon_japanese.svg',
    },
  })
  console.log(cuisineJapanese)

  const cuisineFrench = await prisma.cuisine.create({
    data: {
      type: 'french',
      svgName: 'icon_french.svg',
    },
  })
  console.log(cuisineFrench)

  const cuisineItalian = await prisma.cuisine.create({
    data: {
      type: 'italian',
      svgName: 'icon_italian.svg',
    },
  })
  console.log(cuisineItalian)

  const cuisineBritish = await prisma.cuisine.create({
    data: {
      type: 'british',
      svgName: 'icon_british.svg',
    },
  })
  console.log(cuisineBritish)

  const cuisineAmerica = await prisma.cuisine.create({
    data: {
      type: 'america',
      svgName: 'icon_america.svg',
    },
  })
  console.log(cuisineAmerica)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.disconnect()
  })
