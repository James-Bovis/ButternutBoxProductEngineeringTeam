import { generateGreeting } from '../components/Clock'

const { describe, it, expect } = global

describe('generateGreeting', (): void => {
  describe('when the hour is less than 12', (): void => {
    it('should say Good Morning', (): void => {
      const hour = 9

      const expected = 'Good Morning'
      const actual = generateGreeting(hour)

      expect(actual)
        .toEqual(expected)
    })
  })

  describe('when the hour is greater than or equal to than 19', (): void => {
    it('should say Good Morning', (): void => {
      const hour = 19

      const expected = 'Good Evening'
      const actual = generateGreeting(hour)

      expect(actual)
        .toEqual(expected)
    })
  })

  describe('when the hour is less than or equal to than 19', (): void => {
    it('should say Good Morning', (): void => {
      const hour = 15

      const expected = 'Good Afternoon'
      const actual = generateGreeting(hour)

      expect(actual)
        .toEqual(expected)
    })
  })
})
