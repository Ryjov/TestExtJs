Ext.define('AM.model.User', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }, {
            name: 'name',
            type: 'string'
        }, {
            name: 'email',
            type: 'string'
        }, {
            name: 'passport',
            type: 'string',
        }, {
            name: 'passport_type',
            type: 'string',
        }, {
            name: 'snils',
            type: 'string',
        }, {
            name: 'inn',
            type: 'string',
        }, {
            name: 'pass_name',
            type: 'string',
        }],
    validations: [
        {
            type: 'format',
            field: 'name',
            matcher: /^([А-ЯЁ][а-яё]*) ([А-ЯЁ][а-яё]*) ([А-ЯЁ][а-яё]*)$/
        }, {
            type: 'email',
            field: 'email'
        }, {
            type: 'format',
            field: 'passport',
            matcher: /^[0-9]{4} [0-9]{6}$/
        }, {
            type: 'format',
            field: 'snils',
            matcher: /^[0-9]{3}-[0-9]{3}-[0-9]{3} [0-9]{2}$/
        }, {
            type: 'format',
            field: 'inn',
            matcher: /^[0-9]{12}$/
        }
    ]
});