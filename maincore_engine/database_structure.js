/** 
 *  Columns short hand 
 *  entityname:[shorthand] 
 *  example = email:n:f-email
    :r = require (by default it has required)
    :n = nullable
    :f-[column_type] = format -> :f-string means the column will have string format
*/

const ApplicationStructure = {
    database:{
        table: [
            {
                name : 'user_test',
                column: [
                    "name",
                    "email",
                    "password",
                    "role:n"
                ],
                seeder: [
                    ['Tommy Saputra Wijaya', 'tommy.wijaya54@yahoo.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'],
                    ['Eko Saputra Wijaya', 'eko.saputra.wijaya@gmail.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'],
                    ['Shinta Purnama Sari', 'shinta.purnama.sari@outlook.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'],
                    ['Dewi Puspita Sari', 'dewi.puspita.sari@email.com','$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi']
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
                ]
            },
            {
                name : 'registration',
                column: [
                    "student_id",
                    "branch_id",
                    "reference",
                    "cashback",
                    "status:n",
                    "remarks:n"
                ]
            }
        ]
    }
    
}
