Ext.define('AM.store.Passports', {
    extend: 'Ext.data.Store',
    model: 'AM.model.Passport',
    autoLoad: true,
    autoSync: true,

    proxy: {
        type: 'ajax',
        url: 'Passport/PassportsList',
        reader: {
            type: 'json',
            root: 'passports',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            root: 'passports'
        }
    }
});