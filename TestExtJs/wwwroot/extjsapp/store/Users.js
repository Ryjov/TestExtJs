Ext.define('AM.store.Users', {
    extend: 'Ext.data.Store',
    model: 'AM.model.User',
    autoLoad: true,
    autoSync: true,

    proxy: {
        type: 'ajax',
        url: 'Home/UsersList',
        reader: {
            type: 'json',
            root: 'personas',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,//записываем всю строку целиком
            root: 'personas'
        }
    }
});