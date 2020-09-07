Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'AM',

    controllers: [
        'Users'
    ],

    appFolder: 'extjsapp',

    launch: function () {
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            width: '100%',
            height: '100%',
            id: 'main',
            items: [
                {
                    xtype: 'userlist',
                    region: 'center',
                    frame: true,
                }
            ]
            })
        }
    }
);