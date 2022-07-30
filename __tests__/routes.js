module.exports = {
    create: '/equipment/create',
    getAll: '/equipment/all',
    search: `/equipment/search`,
    update: '/equipment/update',
    delete: (id) => `/equipment/delete/${id}`
}