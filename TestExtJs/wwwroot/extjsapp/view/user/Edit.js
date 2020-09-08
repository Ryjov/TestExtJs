Ext.define('AM.view.user.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.useredit',

    title: 'Личность',
    layout: 'fit',
    autoShow: true,

    initComponent: function () {
        Ext.apply(Ext.form.field.VTypes, {
            snils: function (val, field) {
                return /^[0-9]{3}-[0-9]{3}-[0-9]{3} [0-9]{2}$/i.test(val);
            },
            snilsInvalidText: 'СНИЛС должен состоять из трех наборов трезначных чисел, чередующихся с тире (\'-\'), после чего, через пробел записаны последние две цифры',
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
            fioInvalidText: 'Должны быть введены три слова с заглавной буквы, через пробел',
            fioMask: /[А-ЯЁа-яё ]/i
        });
        Ext.apply(Ext.form.field.VTypes, {
            pass: function (val, field) {
                return /^[0-9]{4} [0-9]{6}$/i.test(val);
            },
            passInvalidText: 'Должны быть введены 4 символа серии и 6 символов номера',
            passMask: /[\d ]/i
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
                        vtype: 'fio',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        name: 'email',
                        fieldLabel: 'Электронная почта',
                        emptyText: 'aaa@gmail.com',
                        vtype: 'email',
                        allowBlank: false
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
                                    queryMode: 'remote',
                                    readonly: true,
                                    editable: false,
                                    allowBlank: false
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'passport',
                                    fieldLabel: 'Серия и номер',
                                    vtype: 'pass',
                                    allowBlank: false
                                }
                        ]
                    },
                    {
                        xtype: 'textfield',
                        name: 'snils',
                        fieldLabel: 'СНИЛС',
                        emptyText: '000-000-000 00',
                        vtype: 'snils',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        name: 'inn',
                        fieldLabel: 'ИНН',
                        emptyText: '000000000000',
                        vtype: 'inn',
                        allowBlank: false
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