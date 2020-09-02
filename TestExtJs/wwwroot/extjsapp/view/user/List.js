Ext.define('AM.view.user.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userlist',

    title: 'Список зарегистрированных лиц',
    store: 'Users',

    initComponent: function () {
        this.columns = [
            { header: 'ФИО', dataIndex: 'name', flex: 1 },
            { header: 'Электронная почта', dataIndex: 'email', flex: 1 },
            { header: 'Серия и номер паспорта', dataIndex: 'passport', flex: 1 },
            { header: 'СНИЛС', dataIndex: 'snils', flex: 1 },
            { header: 'ИНН', dataIndex: 'inn', flex: 1 },
        ];

        this.callParent(arguments);
    }
});