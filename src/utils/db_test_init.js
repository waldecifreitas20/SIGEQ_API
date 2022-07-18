const CategoryModel = require('../api/models/equipment/Category');
const StatusModel = require('../api/models/equipment/Status');

const initCategories = async () => {
    const categories = ['Computadores', 'HDD', 'Periféricos', 'SSD', 'Monitores', 'Cabos'];

    categories.forEach(category => {
        await CategoryModel.create({
            name: category,
        });
    });
};

const initStatuses = async () => {
    const statuses = ['Disponível', 'Em manutenção', 'Defeituoso'];

    statuses.forEach(status => {
        await StatusModel.create({
            name: status,
            description: '---'
        });
    });
};

const initLocation = async () => {
    const locations = ['CSA', 'CDES', 'CRMP'];

    locations.forEach(location => {
        await StatusModel.create({
            fullName: location,
            shortName: location,
        });
    });
};
const initManufacturers = async () => {
    const manufacturers = ['Hewllett Packard', 'Samsung', 'Nvidia'];

    manufacturers.forEach(manufacturer => {
        await StatusModel.create({
            ullName: location,
            shortName: location,
        });
    });
};

module.exports = () => {
    initCategories();
    initLocation();
    initManufacturers();
    initStatuses();
}
