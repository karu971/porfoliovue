import Vue from 'vue'
import axios from 'axios'


export default {
  editField(apiRouteServer, valueId, routeId, routeCategory, category) {
    axios
      .get(`${apiRouteServer}/${category}/${routeId}`)
      .then((result) => {
        console.log(result.data.result)
      })
  },
  editCategory(apiRouteServer, route, params, category) {
    if (route.id == undefined) {
      axios.get(`${apiRouteServer}/${route.category}`)
        .then((result) => {
          route.id = result.data.result[result.data.result.length - 1].id
        })
    }
    for (let value of params) {
      axios
        .get(`${apiRouteServer}/${category}/${value.id}/${route.id}`)
        .then((result) => {
          if (value.checked == true && result.data.status == "error") {
            if (category == "compbyexp") {
              this.addCompbyExp(apiRouteServer, category, route.id, value.id)
            } else {
              this.addLangByExp(apiRouteServer, category, route.id, value.id)
            }
          } else if (value.checked != true && result.data.status == "success") {
            this.deleteCategory(apiRouteServer, category, result.data.result.id)
          }
        })
        .catch((err) => console.log("err"))
    }
  },
  addCompbyExp(apiRouteServer, category, experience, competence) {
    axios
      .post(`${apiRouteServer}/${category}`, {
        competence: competence,
        experience: experience
      })
      .then((result) => {
        if (result.data.status == "success") {
          console.log(result.data.result)
        } else {
          console.log(result.data.result)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  addLangByExp(apiRouteServer, category, experience, language) {
    console.log(`${apiRouteServer}/${category}`)
    axios
      .post(`${apiRouteServer}/${category}`, {
        language: language,
        experience: experience
      })
      .then((result) => {
        if (result.data.status == "success") {
          console.log(result.data.result)
        } else {
          console.log(result.data.result)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  dropTable(apiServer, category, id) {
    axios
      .get(`${apiServer}/${category}/${id}`)
      .then((result) => {
        if (result.data.status === "success") {
          for (let value in result.data.result) {
            // axios
            //   .delete(`${apiServer}/${category}/${result.data.result[value].id}`)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteCategory(apiRouteServer, category, id) {
    axios
      .delete(`${apiRouteServer}/${category}/${id}`)
  },
  checkActiveCategory(routeParams, params, category) {
    let getCheckActiveCategory = []
    for (let value in params) {
      axios
        .get(`${process.env.API_SERVER}/${category}/${params[value].id}/${routeParams.id}`)
        .then((result) => {

          if (result.data.status == "success") {
            params[value]["active"] = true
          } else {
            params[value]["active"] = false
          }
          getCheckActiveCategory.push(params[value])
        })
    }
    return getCheckActiveCategory
  },
  changeDate(value) {
    const changeValue = value.split('/')[2] + "-" + value.split('/')[1] + "-" + value.split('/')[0]
    return changeValue
  },
  getCategoryAll(apiServer, routeParams, category) {
    return new Promise((next) => {
      axios
        .get(`${apiServer}/${category}`)
        .then((result) => {
          return result.data.result
        })
        .then((result) => {
          console.log(result)
          next(result)
        })
        .catch((err) => console.log(err))
    })
  },
  addCkeckedFalse(datas) {
    for (let value in datas) {
      datas[value]["checked"] = false
    }
    return datas
  },
  checkCategoryByExp(apiServer, routeParams, results, categoryByExp, category) {
    let categoryArray = []
    return new Promise((next) => {
      axios
        .get(`${apiServer}/${categoryByExp}/${routeParams.id}`)
        .then((result) => {
          if (result.data.status == "success") {
            return result.data.result
          } else {
            next(results)
          }
        })
        .then((result2) => {
          console.log("test")
          if (result2 != undefined) {
            axios
              .get(`${apiServer}/${category}`)
              .then((result3) => {
                this.addCkeckedFalse(result3.data.result)
                for (let datas in result3.data.result) {
                  for (let datas2 of result2) {
                    if (datas2.language == result3.data.result[datas].id) {
                      result3.data.result[datas]["checked"] = true
                    }
                  }
                }
                next(result3.data.result)
              })
              .catch((err) => {
                console.log(`err`)
              })
          } else {
            next(results)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }
}
