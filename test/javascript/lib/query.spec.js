import { generateQuery, parseSorts, parseFilters } from 'lib/query'

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
    const param = ["manufacturer:dell,hp", "simple_category:thin client"]
    expect(parseFilters(param)).toEqual([["manufacturer", ["dell", "hp"]], ["simple_category", ["thin client"]]])
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

describe('generateQuery', () => {
  it('returns empty string if no sorts or filters', () => {
    expect(generateQuery()).toEqual('')
  })

  it('returns a sort', () => {
    const sorts = [['name', 'asc']];
    const filters = null;
    expect(generateQuery(sorts, filters)).toEqual('?sort=name:asc')
  })

  it('returns a lowercase sort', () => {
    const sorts = [['NAME', 'ASC']];
    const filters = null;
    expect(generateQuery(sorts, filters)).toEqual('?sort=name:asc')
  })

  it('returns a lowercase filter', () => {
    const sorts = null;
    const filters = [['simple_category', ['Workstation']]];
    expect(generateQuery(sorts, filters)).toEqual('?filter=simple_category:workstation')
  })

  it('returns a filter with multiple values', () => {
    const sorts = null;
    const filters = [['simple_category', ['workstation', 'ultralight']]];
    expect(generateQuery(sorts, filters)).toEqual('?filter=simple_category:workstation,ultralight')
  })

  it('returns multiple filters', () => {
    const sorts = null;
    const filters = [['simple_category', ['workstation']], ['brand', ['dell']]]
    expect(generateQuery(sorts, filters)).toEqual('?filter=simple_category:workstation&filter=brand:dell')
  })

  it('returns sort and filter', () => {
    const sorts = [['name', 'asc']];
    const filters = [['simple_category', ['workstation']]];
    expect(generateQuery(sorts, filters)).toEqual('?sort=name:asc&filter=simple_category:workstation')
  })
})
