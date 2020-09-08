Ext.define('AM.view.user.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.useredit',

    title: 'Личность',
    layout: 'fit',
    autoShow: true,

    initComponent: function () {
        Ext.apply(Ext.form.field.VTypes, {
            snils: function (val, field) {
                return /^([0-9][0-9][0-9])-([0-9][0-9][0-9])-([0-9][0-9][0-9]) ([0-9][0-9])$/i.test(val);
            },
            snilsInvalidText: 'СНИЛС введен неверно',
            snilsMask: /[\d- ]/i
        });
        Ext.apply(Ext.form.field.VTypes, {
            inn: function (val, field) {
                return /^([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])$/i.test(val);
            },
            innInvalidText: 'ИНН введен неверно',
            innlsMask: /[\d]/i
        });
        Ext.apply(Ext.form.field.VTypes, {
            fio: function (val, field) {
                return /^([А-ЯЁ][а-яё]*) ([А-ЯЁ][а-яё]*) ([А-ЯЁ][а-яё]*)$/i.test(val);
            },
            fioInvalidText: 'ФИО введен неверно',
            fioMask: /[А-ЯЁа-яё ]/i
        });
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
                        fieldLabel: 'ФИО',
                        emptyText: 'Иванов Иван Иванович',
                        vtype: 'fio'
                    },
                    {
                        xtype: 'textfield',
                        name: 'email',
                        fieldLabel: 'Электронная почта',
                        emptyText: 'aaa@gmail.com',
                        vtype: 'email'
                    },
                    {
                        xtype: 'form',
                        fieldLabel: 'Документ, удостоверяющий личность',
                        itemid: 'comboform',
                        items:
                        [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Паспорт',
                                    name: 'passport_type',
                                    store: 'Passports',
                                    valueField: 'id',
                                    displayField: 'type',
                                    queryMode: 'remote'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'passport',
                                    fieldLabel: 'Серия и номер'
                                }
                        ]
                    },
                    {
                        xtype: 'textfield',
                        name: 'snils',
                        fieldLabel: 'СНИЛС',
                        emptyText: '000-000-000 00',
                        vtype: 'snils'
                    },
                    {
                        xtype: 'textfield',
                        name: 'inn',
                        fieldLabel: 'ИНН',
                        emptyText: '000000000000',
                        vtype: 'inn'
                    }
                ],
            }
        ];

        this.buttons = [
            {
                text: 'Сохранить',
                action: 'save'
            },
            {
                text: 'Отмена',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});