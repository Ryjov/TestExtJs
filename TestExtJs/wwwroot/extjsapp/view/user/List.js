Ext.define('AM.view.user.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userlist',

    title: 'Список зарегистрированных лиц',
    store: 'Users',
    selType: 'checkboxmodel',
    columnLines: true,

    dockedItems: [
        {
            xtype: 'toolbar',
            layout: {
                type: 'hbox',
                align: 'begin'
            },
            dock: 'top',
            items: [{
                xtype: 'button',
                text: 'Добавить',
                icon: '../extjs/examples/restful/images/add.png',
                margin: '50 5 5 50',
                handler: function () {
                    var view = Ext.widget('useredit');
                }
            }, {
                xtype: 'button',
                //disabled: true,
                icon: '../extjs/examples/restful/images/delete.png',
                text: 'Удалить',
                margin: '50 5 5 50',
                handler: function (view) {
                    this.fireEvent('deleteClick', view, 'edit');
                }
            }]
        }
    ],

    initComponent: function () {
        this.columns = [
            //{ xtype: 'hiddenfield', dataIndex: 'id'},
            { header: 'ФИО', dataIndex: 'name', flex: 1 },
            { header: 'Электронная почта', dataIndex: 'email', flex: 1 },
            { header: 'Документ, удостоверяющий личность', dataIndex: 'pass_name', flex: 2 },
            { header: 'Серия и номер паспорта', dataIndex: 'passport', flex: 1 },
            { header: 'СНИЛС', dataIndex: 'snils', flex: 1 },
            { header: 'ИНН', dataIndex: 'inn', flex: 1 },
            {
                xtype: 'actioncolumn',
                items: [{
                    icon: '../extjs/examples/restful/images/delete.png',
                    tooltip: 'Удалить личность',
                    handler: function (view, rowIndex, colIndex, item, e, record, row) {
                        this.fireEvent('deleteRowClick', view, rowIndex, colIndex, item, e, record, row, 'edit');
                    }
                }]
            }
        ];

        this.callParent(arguments);
    }
});