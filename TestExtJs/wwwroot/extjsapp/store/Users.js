Ext.define('AM.store.Users', {
    extend: 'Ext.data.Store',
    model: 'AM.model.User',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'extjsapp/data/users.json',
        //api: {
        //    read: 'http://localhost:44327/Home/UsersList',
        //    //update: 'data/updateUsers.json'
        //},
        reader: {
            type: 'json',
            root: 'personas',
            successProperty: 'success'
        }
    }
});