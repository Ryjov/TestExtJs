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
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            region: 'north',
                            layout: {
                                type: 'hbox',
                                align: 'begin'
                            },
                            dock: 'top',
                            items: [{
                                xtype: 'button',
                                id: 'adduserbutton',
                                text: 'Добавить',
                                icon: '../extjs/examples/restful/images/add.png',
                                margin: '50 5 5 50',
                                handler: function () {
                                    var view = Ext.widget('useredit');
                                }
                            }, {
                                xtype: 'button',
                                id: 'deleteuserbutton',
                                disabled: true,
                                icon: '../extjs/examples/restful/images/delete.png',
                                text: 'Удалить',
                                margin: '50 5 5 50'
                            }]
                        }
                    ]
                }]
            })
        }
    }
);