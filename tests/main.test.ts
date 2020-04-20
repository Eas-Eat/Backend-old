import { hello } from '../src/main'

describe('hello(): string', () => {
    it('Should return "H3LL0"', () => {
        expect(hello()).toEqual('H3LL0')
    })
})