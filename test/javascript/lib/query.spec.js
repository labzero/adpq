import { parseSorts, parseFilters } from 'lib/query'

describe('parseFilters', () => {

  it('parses a single filter with a single value', () => {
    const param = ["manufacturer:DELL"]
    expect(parseFilters(param)).toEqual([["manufacturer", ["dell"]]])
  })

  it('parses a single filter with a multiple values', () => {
    const param = ["manufacturer:DELL,hp"]
    expect(parseFilters(param)).toEqual([["manufacturer", ["dell", "hp"]]])
  })

  it('parses multiple filters', () => {
    const param = ["manufacturer:dell,hp", "category:thin client"]
    expect(parseFilters(param)).toEqual([["manufacturer", ["dell", "hp"]], ["category", ["thin client"]]])
  })

  it('does not parse filters with invalid field names', () => {
    const param = ["manufa:dell"]
    expect(parseFilters(param)).toEqual([])
  })
})

describe('parseSorts', () => {

  it('parses a single sort', () => {
    const param = ["list_price:asc"]
    expect(parseSorts(param)).toEqual([['list_price', 'asc']])
  })

  it('parses multiple sorts', () => {
    const param = ["list_price:asc", "manufacturer:desc"]
    expect(parseSorts(param)).toEqual([['list_price', 'asc'], ['manufacturer', 'desc']])
  })

  it('does not parse sorts with an invalid direction', () => {
    const param = ["list_price:asc", "manufacturer:sca"]
    expect(parseSorts(param)).toEqual([['list_price', 'asc']])
  })

  it('does not parse sorts with an invalid field name', () => {
    const param = ["list_price:asc", "manufact:desc"]
    expect(parseSorts(param)).toEqual([['list_price', 'asc']])
  })

  it('is case insensitive with regard to field names', () => {
    const param = ["LIST_PRICE:asc"]
    expect(parseSorts(param)).toEqual([['list_price', 'asc']])
  })

  it('is case insensitive with regard to direction', () => {
    const param = ["list_price:ASC"]
    expect(parseSorts(param)).toEqual([['list_price', 'asc']])
  })
})
