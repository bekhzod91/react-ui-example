import {
  appendParamsToUrl,
  removeItemFromSelect,
  addItemToSelect,
  sortingUrl,
  sortingStatus,
} from '../../src/helpers/urls'

describe('(URL) urls', () => {
  it('appendParamsToUrl add params custom params', () => {
    expect(appendParamsToUrl({ ids: '1,2,3,4,5' }, '/c/0/company/1/'))
      .to.equal('/c/0/company/1/?ids=1,2,3,4,5')

    expect(appendParamsToUrl({ ids: '1,2,3,4,5' }, '/c/0/company/1/?page=2'))
      .to.equal('/c/0/company/1/?page=2&ids=1,2,3,4,5')

    expect(appendParamsToUrl({ ids: '1,2,3,4,5', page: 3 }, '/c/0/company/1/?page=2'))
      .to.equal('/c/0/company/1/?page=3&ids=1,2,3,4,5')
  })

  it('removeItemFromSelect remove value from select', () => {
    expect(removeItemFromSelect('/c/0/company/1/?page=3&ids=1,2,3', 'ids', '1'))
      .to.equal('/c/0/company/1/?page=3&ids=2,3')
    expect(removeItemFromSelect('/c/0/company/1/?page=3&ids=1,2,3', 'ids', '2'))
      .to.equal('/c/0/company/1/?page=3&ids=1,3')
    expect(removeItemFromSelect('/c/0/company/1/?page=3&ids=1,2,3', 'ids', '3'))
      .to.equal('/c/0/company/1/?page=3&ids=1,2')

    expect(removeItemFromSelect('/c/0/company/1/', 'ids', '1'))
      .to.equal('/c/0/company/1/?ids=')

    expect(removeItemFromSelect('/c/0/company/1/', 'listIds', '1'))
      .to.equal('/c/0/company/1/?listIds=')

    expect(removeItemFromSelect('/c/0/company/1/?ids=1,2,3,4', 'ids', ['2', '3', '4']))
      .to.equal('/c/0/company/1/?ids=1')
  })

  it('addItemFromSelect add value to select', () => {
    expect(addItemToSelect('/c/0/company/1/?page=3&ids=2,3', 'ids', '1'))
      .to.equal('/c/0/company/1/?page=3&ids=1,2,3')
    expect(addItemToSelect('/c/0/company/1/?page=3&ids=1,3', 'ids', '2'))
      .to.equal('/c/0/company/1/?page=3&ids=1,2,3')
    expect(addItemToSelect('/c/0/company/1/?page=3&ids=1,2', 'ids', '3'))
      .to.equal('/c/0/company/1/?page=3&ids=1,2,3')

    expect(addItemToSelect('/c/0/company/1/', 'ids', '1'))
      .to.equal('/c/0/company/1/?ids=1')

    expect(addItemToSelect('/c/0/company/1/', 'listIds', '1'))
      .to.equal('/c/0/company/1/?listIds=1')

    expect(addItemToSelect('/c/0/company/1/?ids=1', 'ids', '1'))
      .to.equal('/c/0/company/1/?ids=1')

    expect(addItemToSelect('/c/0/company/1/?ids=1', 'ids', ['2', '3', '4']))
      .to.equal('/c/0/company/1/?ids=1,2,3,4')
  })

  it('sortingUrl add or change params for sorting', () => {
    expect(sortingUrl('/c/0/company/1/?page=3', 'sort', 'id')).to.equal('/c/0/company/1/?page=3&sort=id')
    expect(sortingUrl('/c/0/company/1/?page=3&sort=id', 'sort', 'id')).to.equal('/c/0/company/1/?page=3&sort=-id')
    expect(sortingUrl('/c/0/company/1/?page=3&sort=-id', 'sort', 'id')).to.equal('/c/0/company/1/?page=3&sort=')

    expect(sortingUrl('/c/0/company/1/?page=3', 'sortBy', 'id')).to.equal('/c/0/company/1/?page=3&sortBy=id')
    expect(sortingUrl('/c/0/company/1/?page=3&sortBy=id', 'sortBy', 'id')).to.equal('/c/0/company/1/?page=3&sortBy=-id')
    expect(sortingUrl('/c/0/company/1/?page=3&sortBy=-id', 'sortBy', 'id')).to.equal('/c/0/company/1/?page=3&sortBy=')

    expect(sortingUrl('/c/0/company/1/?page=3&sort=id', 'sort', 'createDate'))
      .to.equal('/c/0/company/1/?page=3&sort=createDate,id')
    expect(sortingUrl('/c/0/company/1/?page=3&sort=id,createDate', 'sort', 'createDate'))
      .to.equal('/c/0/company/1/?page=3&sort=-createDate,id')
    expect(sortingUrl('/c/0/company/1/?page=3&sort=id,-createDate', 'sort', 'createDate'))
      .to.equal('/c/0/company/1/?page=3&sort=id')

    expect(sortingUrl('/c/0/company/1/?page=3&sort=createDate,id', 'sort', 'id'))
      .to.equal('/c/0/company/1/?page=3&sort=-id,createDate')
  })

  it('sortingStatus get ordering status from sorting', () => {
    expect(sortingStatus('/c/0/company/1/?page=3', 'sort', 'id')).to.equal('not')
    expect(sortingStatus('/c/0/company/1/?page=3&sort=id', 'sort', 'id')).to.equal('asc')
    expect(sortingStatus('/c/0/company/1/?page=3&sort=-id', 'sort', 'id')).to.equal('desc')

    expect(sortingStatus('/c/0/company/1/?page=3', 'sortBy', 'id')).to.equal('not')
    expect(sortingStatus('/c/0/company/1/?page=3&sortBy=id', 'sortBy', 'id')).to.equal('asc')
    expect(sortingStatus('/c/0/company/1/?page=3&sortBy=-id', 'sortBy', 'id')).to.equal('desc')

    expect(sortingStatus('/c/0/company/1/?page=3&sort=id', 'sort', 'createDate')).to.equal('not')
    expect(sortingStatus('/c/0/company/1/?page=3&sort=id,createDate', 'sort', 'createDate')).to.equal('asc')
    expect(sortingStatus('/c/0/company/1/?page=3&sort=id,-createDate', 'sort', 'createDate')).to.equal('desc')
  })
})
