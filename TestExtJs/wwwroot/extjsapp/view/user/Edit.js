Ext.define('AM.view.user.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.useredit',

    title: 'Личность',
    layout: 'fit',
    autoShow: true,

    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'hiddenfield',
                        name: 'id'
                    },
                    {
                        xtype: 'textfield',
                        name: 'name',
                        fieldLabel: 'ФИО'
                    },
                    {
                        xtype: 'textfield',
                        name: 'email',
                        fieldLabel: 'Электронная почта'
                    },
                    {
                        xtype: 'textfield',
                        name: 'passport',
                        fieldLabel: 'Серия и номер паспорта'
                    },
                    {
                        xtype: 'textfield',
                        name: 'snils',
                        fieldLabel: 'СНИЛС'
                    },
                    {
                        xtype: 'textfield',
                        name: 'inn',
                        fieldLabel: 'ИНН'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});