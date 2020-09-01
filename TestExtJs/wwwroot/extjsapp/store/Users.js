Ext.define('AM.store.Users', {
    extend: 'Ext.data.Store',
    model: 'AM.model.User',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'Home/UsersList',
        method: 'Get',
        //api: {
        //    read: 'Home/UsersList',
        //    update: 'extjsapp/data/users.json'
        //},
        reader: {
            type: 'json',
            root: 'personas',
            successProperty: 'success'
        }
    }
});