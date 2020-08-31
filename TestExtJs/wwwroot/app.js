Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'AM',

    controllers: [
        'Users'
    ],

    appFolder: 'extjsapp',

    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'userlist'
            }
        });
    }
});