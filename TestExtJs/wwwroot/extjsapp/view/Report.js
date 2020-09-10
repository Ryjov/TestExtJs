Ext.define('AM.view.Report', {
    extend: 'Ext.window.Window',
    alias: 'widget.usersreport',

    title: 'Отчет',
    layout: 'fit',
    autoShow: true,
    height: 594,
    width: 420,

    initComponent: function () {
        this.items = [
            {
                xtype: 'image',
                src: 'report/getreport'
            }
        ];

        this.buttons = [
            {
                text: 'Сохранить',
                action: 'saveReport'
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