export default {
    name: 'adminUser',
    type: 'document',
    title: 'Admin User',
    fields: [
       {name: 'name',
        type: 'string',
        title: 'Name'},

        {name: 'email',
        type: 'string',
        title: 'Email'},

        {name: 'password',
        type: 'string',
        title: 'Password',
        hidden: true
    },
    {name: 'mobile',
    type: 'string',
    title: 'Mobile Number',
    },
    {
        name: 'role',
        title: 'Role',
        type: 'string',
        initialValue: 'admin',
        readonly: true,
        
    }
    ]
}