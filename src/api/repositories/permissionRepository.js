const { models } = require('../../utils/paths');
const PermissionModel = require(models.permission);

module.exports = {
   createPermision : async permission => {
        try {
            return await PermissionModel.create(permission);
        } catch (error) {
           
            throw 'Create permission attempt failed';
        }
   },
   setLinkBetween : async (user, permissions) => {
        try {
            return {
                user : await user.addPermissions(permissions),
                permissions : await permission.addUser(user)
            };
        } catch (error) {
            console.log(error);
            throw 'To set link attempt has been failed';
        }
   }
}