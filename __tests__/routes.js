module.exports = {
    equipment: {
        create: '/equipment/create',
        getAll: '/equipment/all',
        search: `/equipment/search`,
        update: '/equipment/update',
        delete: (id) => `/equipment/delete/${id}`
    },

    authentication: {
        register: '/auth/register',
        authenticate: '/auth/authenticate',
        checkToken: '/auth/check_token'
    },

    user: {
        delete : (id) => `/user/delete/${id}`,
        update : '/user/update',
    }
}