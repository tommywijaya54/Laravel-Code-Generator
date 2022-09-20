let ApplicationStructure = {
    database:{
        table: [
            {
                name : 'user',
                column: [
                    "name",
                    "email",
                    "password"
                ],
                seeder: [
                    ['Tommy Saputra Wijaya', 'tommy.wijaya54@yahoo.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'],
                    ['Eko Saputra Wijaya', 'eko.saputra.wijaya@gmail.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'],
                    ['Shinta Purnama Sari', 'shinta.purnama.sari@outlook.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'],
                    ['Dewi Puspita Sari', 'dewi.puspita.sari@email.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi']
                ],
                controller: ["index","edit"],
                simpleview:"name,email",
                dontIncludeOnGenerateMigrate:true
            },

            {
                name : 'employee',
                column: [
                    'nik',
                    'name',
                    'address',
                    'phone',
                    'email',
                    'roles', // Employee can have multiple role
                    'emergency_name',
                    'emergency_phone',
                    'join_date',
                    'exit_date',
                    'note',
                    'users_id',
                    'branches_id:n',
                ],
                factory:30

            },

            {
                name: 'manager',
                column: [
                    'employees_id',
                    'branches_id:n',
                    'note'
                ],
                factory:4
            },

            {
                name : 'branch',
                tablename : 'branches',
                column: [
                    "name",
                    "address",
                    "phone",
                    "managers_id:n",
                    "email",
                    "open_date",
                    "status:n"
                ],
                factory:4,
                controller: ["index","create","edit","delete"],
                simpleview:"Name,Address"
            },


            {
                name : 'expense', // Branch Expenses
                column : [
                    'branches_id',
                    'expense_type',  // Listrik, Air, Internet, IPL, Others
                    'description',
                    'amount',
                    'date',
                    'approve_by:n'
                ]
            },
            
            {
                name : 'rental', // Branch Rental Expenses
                column : [
                    'branches_id',
                    'start_date',
                    'end_date',
                    'amount',
                    'owner_name',
                    'owner_phone',
                    'notaris_name',
                    'notaris_phone'
                ]
            },
            
            {
                name : 'asset', // Branch Asset
                column : [
                    'item_name',
                    'qty',
                    'cost',
                    'note'
                ]
            },
            
            {
                name:'parent',
                column:[
                    'nik:n',
                    'name',
                    'address',
                    'phone',
                    'email:n',
                    'birth_date:n',
                    'emergency_name:n',
                    'emergency_phone:n',
                    'bank_account_name:n',
                    'virtual_account_name:n',
                    'note:n',
                    'user_id:n',
                    'blacklist:n', // true , false
                ]
            },
            
            {
                name : 'student',
                column: [
                    "parents_id",
                    "schools_id",
                    "grade", // ["tka, tkb, k1, k2, Grade 1 - 12 "]
                    "name",
                    "email",
                    "phone",
                    "address",
                    "join_date",
                    "exit_date",
                    "exit_reason",
                    "birth_date",
                    "type", // [regular/private]
                    "health_condition",
                    "note"
                ],
                controller: ["index","create","edit","delete"],
                factory:30,
                simpleview:"Name,Email,Phone"
            },
            
            {
                name: 'school',
                column : [
                    'name',
                    'address:n',
                    'city:n',
                    'type:n', // ['National','International','National + Internatiol']
                    'color_code:n',
                ]
            },
            
            {
                name: 'pricelist',
                column : [
                    'start_date', // start period
                    'end_date', // end period
                    'level',
                    'school_type',
                    'subject',
                    'price',
                    'week',
                    'branches_id'
                ]
            },
            
            {
                name: 'promolist',
                column : [
                    'start_date', // start period
                    'end_date', // end period
                    'label', // discount 30%, discount group, promo registasi
                    'discount_value', // discount 30%, -300000
                    'branches_id'
                ]
            },
            
            {
                name : 'registration',
                column: [
                    "students_id",
                    "branches_id",
                    "date", //registration
                    "reference", // note
                    "cashback", // untuk transfer ke temen  
                    "status:n", // 'In Progress' : 'Complete' : 'Active' // ToDo : Untuk di bahas
                    "note:n",
                ],
                controller: ["index","create","edit","delete"],
                factory:50
            },
            
            {
                name: 'registrationitem', // item list of registration
                column : [
                    'registrations_id',
                    'pricelists_id:n',
                    'promolists_id:n',
                    'charges', // ["Late Payment Charges", "Adjustment Tagihan"]
                    'price:n',
                    'discount_amount:n'
                ]
            },
            
            {
                name:'salary',
                column: [
                    'employees_id',
                    'amount',
                    'start_date',
                    'end_date',
                    'note'
                ]
            },
            
            
            
            {
                name: 'advisor',
                column: [
                    'employees_id',
                    'note'
                ]
            },
            
            {
                name: 'teacher',
                column: [
                    'employees_id',
                    'subject',
                    'note'
                ]
            },
            
            {
                name: 'subject', // Subject Untuk Teacher
                column: [
                    'teachers_id',
                    'subject',
                    'school'
                ]
            },
            
            {
                name : 'employeerole',
                column:[
                    'employees_id',
                    'role_title',
                    'start_date:n',
                    'end_date:n'
                ]
            },
            
            {
                name: 'roletype', // user role
                column: [
                    'title' // ['Owner', 'Super Admin','Admin','Branch Manager','Advisor','Teacher','HRD','Finance']
                ]
            },
            
            {
                name: 'actionhistory',
                column: [
                    'action'
                ]
            },
            
            {
                name : 'schedule',
                column: [
                    "day",
                    "time_slot",
                    "subject",
                    "classroom",
                    "duration",
                    "date"
                ],
                controller: ["index","create","edit","delete"],
                factory:20,
                view:["index:simple"],
                simpleview:"Day,Subject,Duration"
            }
        ]
    },
    default : {
        controller : ["index,edit"] ,
        factory : 10
    }
}

// Adding Auto Value for 
// controller   : ["index,edit"] 
// factory      : 10

const AS_Default = ApplicationStructure.default;


(table => {
    table.forEach((table) => {
        table.controller = table.controller || AS_Default.controller;
        table.factory = table.factory || AS_Default.factory;
    });
})(ApplicationStructure.database.table)