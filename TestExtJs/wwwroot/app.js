Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'AM',

    controllers: [
        'Users'
    ],

    appFolder: 'extjsapp',

    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'column',
            width: '100%',
            height: '100%',
            id: 'main',
            items: [
                {
                    xtype: 'userlist',
                    columnWidth: 0.5
                }, {
                    xtype: 'button',
                    columnWidth: 0.5,
                    text: 'Добавить лицо',
                    margin: '50 0 0 50',
                    handler: function () {
                        var view = Ext.widget('useredit');
                    }
                }
            ]
        })
    }
});