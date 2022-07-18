const CategoryModel = require('../api/models/equipment/Category');
const StatusModel = require('../api/models/equipment/Status');
const LocationModel = require('../api/models/equipment/Location');
const ManufacturerModel = require('../api/models/equipment/Manufacturer');

const initCategories = () => {
    const categories = ['Computadores', 'HDD', 'Periféricos', 'SSD', 'Monitores', 'Cabos'];

    categories.forEach(async (category) => {
        await CategoryModel.create({
            name: category,
        });
    });
};

const initStatuses = () => {
    const statuses = ['Disponível', 'Em manutenção', 'Defeituoso'];

    statuses.forEach(async (status) => {
        await StatusModel.create({
            name: status,
            description: '---'
        });
    });
};

const initLocation = () => {
    const locations = ['CSA', 'CDES', 'CRMP'];

    locations.forEach(async (location) => {
        await LocationModel.create({
            fullName: location,
            shortName: location,
        });
    });
};
const initManufacturers = () => {
    const manufacturers = ['Hewllett Packard', 'Samsung', 'Nvidia'];

    manufacturers.forEach(async (manufacturer) => {
        await ManufacturerModel.create({
            fullName: manufacturer,
            shortName: manufacturer,
        });
    });
};

module.exports = () => {
    initCategories();
    initLocation();
    initManufacturers();
    initStatuses();
}
