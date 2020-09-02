Ext.define('AM.controller.Users', {
    extend: 'Ext.app.Controller',

    views: [
        'user.List',
        'user.Edit'
    ],
    
    stores: ['Users'],

    models: [
        'User'
    ],

    init: function () {
        this.control({
            'viewport > userlist': {
                itemdblclick: this.editUser
            },
            //'useredit button[action=save]': {
            //    click: this.updateUser
            //},
            'useredit button[action=save]': {
                click: this.createUser
            }
        });
    },

    editUser: function (grid, record) {
        var view = Ext.widget('useredit');

        var rec = view.down('form').loadRecord(record);
    },

    //updateUser: function (button) {
    //    var win = button.up('window'),
    //        form = win.down('form'),
    //        record = form.getRecord(),
    //        values = form.getValues(),
    //        store = Ext.widget('userlist').getStore();
    //    record.set(values);
    //    store.load()
    //    win.close();
    //    store.sync();
    //},

    createUser: function (button) {
        var win = button.up('window'),
            form = win.down('form'),
            values = form.getValues();
        Ext.Ajax.request({
            url: 'Home/UsersAdd',
            params: values,
            //function (response, options) {
            //var data = Ext.decode(response.responseText);
        });
        win.close();
        Ext.Msg.alert('Пользователь добавлен', 'Пользователь ' + values.name + ' был создан');
        var store = Ext.widget('userlist').getStore();
        store.load();    
    },
        //    newuser = Ext.create('AM.model.User');
        //var store = Ext.widget('userlist').getStore();
        //newuser.set('name', values.name);
        //newuser.set('email', values.email);
        //newuser.set('passport', values.passport);
        //newuser.set('snils', values.snils);
        //newuser.set('inn', values.inn);
        //store.add(newuser);
        //win.close();
        //store.sync();
        //alert('Создан новый пользователь: ' + values.name);
});