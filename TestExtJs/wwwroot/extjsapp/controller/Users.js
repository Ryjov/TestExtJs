﻿Ext.define('AM.controller.Users', {
    extend: 'Ext.app.Controller',

    views: [
        'user.List',
        'user.Edit'
    ],
    stores: ['Users', 'Passports'],
    models: ['User','Passport'],

    init: function () {
        this.control({
            'viewport > userlist': {
                itemdblclick: this.editUser
            },
            'actioncolumn': {
                deleteRowClick: this.deleteUserOnActionColumn
            },
            'useredit button[action=save]': {
                click: this.updateUser
            },
            //'toolbar': {
            //    deleteClick: this.deleteUserSelection
            //},
        });
    },

    editUser: function (grid, record) {
        Ext.Ajax.request({
            method: 'GET',
            url: 'Home/UsersOne',
            params: {
                id: record.get('id'),
            },
            success: function (response, options) {
                var view = Ext.widget('useredit');
                var obj = new AM.model.User(Ext.decode(response.responseText));
                view.down('form').loadRecord(obj);
                },
            failure: function (response, options) {
                console.log('server-side failure with status code ' + response.status);
            }
        })
    },

    updateUser: function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            values = form.getValues(),
            store = Ext.widget('userlist').getStore();
        if (values.id == 0) {
            Ext.Ajax.request({
                method: 'POST',
                url: 'Home/UsersAdd',
                params: values,
                success: function (response, options) {
                    var data = Ext.decode(response.responseText);
                    if (data) {
                        win.close();
                        Ext.Msg.alert('Пользователь добавлен', 'Пользователь ' + values.name + ' был создан');
                        store.sync();
                        store.load();
                    }
                    else {
                        Ext.Msg.alert('Неуспех', 'Пользователь ' + values.name + ' был создан, но данные не были схвачены.');
                    }
                },
                failure: function (response, options) {
                    Ext.Msg.alert('Ошибка сервера', 'Текст: ' + response.responseText)
                }
            });
        }
        else {
            record = form.getRecord(),
            oldname = record.get('name'),
            Ext.Ajax.request({
                method: 'PUT',
                url: 'Home/UsersEdit',
                params: values,
                success: function (response, options) {
                    var data = Ext.decode(response.responseText);
                    if (data) {
                        win.close();
                        Ext.Msg.alert('Пользователь изменен', 'Данные пользователя ' + values.name + ' (' + oldname + ') были изменены ');
                        store.sync();
                        store.load();
                    }
                    else {
                        Ext.Msg.alert('Неуспех', 'Пользователь ' + values.name + ' был создан, но данные не были схвачены.');
                    }
                },
                failure: function (response, options) {
                    Ext.Msg.alert('Ошибка сервера', 'Текст: ' + response.responseText)
                }
            });
        }
    },

    deleteUserOnActionColumn: function (view, rowIndex, colIndex, item, e, record, row) {
        store = Ext.widget('userlist').getStore();
        Ext.Msg.confirm('Подтвердите удаление', 'Вы уверены, что хотите удалить пользователя ' + record.get('name') + '?', function (button) {
            if (button === "no") {}
            else if(button === "yes") {               
                Ext.Ajax.request({
                    method: 'DELETE',
                    url: 'Home/UsersDelete',
                    params: {
                        id: record.get('id'),
                    },
                    success: function (response, options) {
                        store.sync();
                        store.load();
                        Ext.Msg.alert('Пользователь удален', 'Пользователь ' + record.get('name') + ' был удален');
                    },
                    failure: function (response, options) {
                        Ext.Msg.alert('Ошибка сервера', 'Текст: ' + response.responseText)
                    }
                });
            }
        }, this);
    },

    deleteUserSelection: function (view) {
        Ext.Msg.alert('Delete','delete')
        //var store = Ext.widget('userlist').getStore();
        //var selection = this.getView().getSelectionModel().getSelection();
        //if (selection.length > 1) {
        //    store.removeAll(selection);
        //}
        //else {
        //    store.remove(selection);
        //}
        //store.sync();
    }
});