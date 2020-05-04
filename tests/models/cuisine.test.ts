import { createTestClient } from 'apollo-server-testing'
import { server } from '../../src/server'
import { GET_ALL_CUISINES } from './queries/cuisine.queries'

const { query } = createTestClient(server)

describe('Cuisine Model', () => {
  it('Should return all the available cuisines', async () => {
    const response = await query({
      query: GET_ALL_CUISINES,
    })

    expect(response?.data?.getAllCuisines).toMatchObject([
      {
        svgName: 'icon_chinese.svg',
        type: 'chinese',
      },
      {
        svgName: 'icon_japanese.svg',
        type: 'japanese',
      },
      {
        svgName: 'icon_french.svg',
        type: 'french',
      },
      {
        svgName: 'icon_italian.svg',
        type: 'italian',
      },
      {
        svgName: 'icon_british.svg',
        type: 'british',
      },
      {
        svgName: 'icon_america.svg',
        type: 'america',
      },
    ])
  })
})


