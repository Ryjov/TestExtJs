Ext.define('AM.view.user.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userlist',

    title: 'Список зарегистрированных лиц',
    store: 'Users',
    selType: 'checkboxmodel',
    columnLines: true,


    initComponent: function () {
        this.columns = [
            //{ xtype: 'hiddenfield', dataIndex: 'id'},
            { header: 'ФИО', dataIndex: 'name', flex: 1 },
            { header: 'Электронная почта', dataIndex: 'email', flex: 1 },
            { header: 'Серия и номер паспорта', dataIndex: 'passport', flex: 1 },
            { header: 'СНИЛС', dataIndex: 'snils', flex: 1 },
            { header: 'ИНН', dataIndex: 'inn', flex: 1 },
            {
                xtype: 'actioncolumn',
                items: [{
                    icon: '../extjs/examples/restful/images/delete.png',
                    tooltip: 'Удалить личность',
                    handler: function (view, rowIndex, colIndex, item, e, record, row) {
                        this.fireEvent('itemClick', view, rowIndex, colIndex, item, e, record, row, 'edit');
                    }
                }]
            }
        ];

        this.callParent(arguments);
    }
});