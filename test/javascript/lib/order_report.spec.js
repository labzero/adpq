import groupBy from 'lodash/fp/groupBy'
import mapValues from 'lodash/fp/mapValues'
import sumBy from 'lodash/fp/sumBy'
import flow from 'lodash/fp/flow'
import flatMap from 'lodash/fp/flatMap'

import salesByCategoryDepartment from 'lib/order_report'

const data = [
  {"user_id":20,"status":"SUBMITTED","items":[],"id":2,"department":"CDE"},
  {"user_id":21,"status":"SUBMITTED","items":
    [
      {"sub_category":"Power","sku":"some content","quantity":5,"price":1000,"name":"HP Laptop","manufacturer":"some content","id":4,"category":"Laptops"},
      {"sub_category":"Power","sku":"some content","quantity":1,"price":1000,"name":"HP Laptop","manufacturer":"some content","id":5,"category":"Laptops"},
      {"sub_category":"Power","sku":"some content","quantity":1,"price":1000,"name":"HP Laptop","manufacturer":"some content","id":6,"category":"Laptops"},
      {"sub_category":"Power","sku":"some content","quantity":1,"price":1000,"name":"HP Laptop","manufacturer":"some content","id":7,"category":"Laptops"},
      {"sub_category":"Power","sku":"some content","quantity":1,"price":1000,"name":"HP Laptop","manufacturer":"some content","id":8,"category":"Laptops"}
    ], "id":3,"department":"PARKS"}
  ]

  describe("salesByCategoryDepartment", () => {

    test("it roll up the sales data by category and department", () => {
      expect(salesByCategoryDepartment(data)).toEqual({"CDE":{}, "PARKS": {"Laptops": 9000}})
    })
  })
