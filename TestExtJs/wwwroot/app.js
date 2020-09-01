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
            },
            {
                xtype: 'panel',
                title: 'Child Panel 2',
                height: 100,
                columnWidth: 0.5
            }]
        })
    }
});