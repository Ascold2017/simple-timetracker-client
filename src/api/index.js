import Axios from 'axios'


const request = Axios.create({
    baseURL: 'http://localhost:3000'
})
const response = (res) => res.data.result
const err = e => { throw new Error(e.response.data.result) }

export function login (auth) {
    return request.post('/api/login', auth)
        .then(response)
        .catch(err)
}

export function createCompany (company, token) {
    console.log(company)
    return request.post('/api/createCompany', {
        name: company.name,
        email: company.email,
        username: company.username
      }, { headers: { token }})
      .then(response)
      .catch(err)
}

export function createUser (user, token) {
    return request.post('/api/register', {
        company_id: user.companyId,
        username: user.username,
        type: user.type,
        email: user.email,
        password: user.password
      }, { headers: { token }})
        .then(response)
        .catch(err)
}

export function getCompanies (token) {
    return request.get('/api/findCompanies', { headers: { token }})
    .then(response)
    .catch(err)
}

export function getCompanyUsers (companyId, token) {
    if (!companyId) {
        return request.get('/api/findUsersByCompany', { headers: { token }})
        .then(response)
        .catch(err)
    } else {
        return request.get('/api/findUsersByCompany/' + companyId,  { headers: { token }})
        .then(response)
        .catch(err)
    }
}

export function getCompanyTasks (companyId, token) {
    if (!companyId) {
        return request.get('/api/findTasksByCompany',  { headers: { token }})
        .then(response)
        .catch(err)
    } else {
        return request.get('/api/findTasksByCompany/' + companyId,  { headers: { token }})
        .then(response)
        .catch(err)
    }
    
}

export function createTask (task, token) {
    return request.post('/api/createTask', {
        name: task.name
    }, { headers: { token }})
    .then(response)
    .catch(err)
}

export function getStatByUser (userId, token) {
    if (!userId) {
        return request.get('/api/getTimetrackerStat', { headers: { token }})
        .then(response)
        .catch(err)
    } else {
        return request.get('/api/getTimetrackerStat/' + userId, { headers: { token }})
        .then(response)
        .catch(err)
    }
    
}