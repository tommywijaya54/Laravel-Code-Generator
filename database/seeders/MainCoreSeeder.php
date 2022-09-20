<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MainCoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        function runSeederInBatch($seeder, $column, $tablename)
        {
            foreach ($seeder as $seed) {
                $insert = [];
                foreach ($column as $index => $col) {
                    if (isset($seed[$index])) {
                        $insert[$col] = $seed[$index];
                    }
                }
                DB::table($tablename)->insert($insert);
            }
        };

        $seeder = array(
            array('Tommy Saputra Wijaya', 'tommy.wijaya54@yahoo.com', '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'),
            array('Eko Saputra Wijaya', 'eko.saputra.wijaya@gmail.com', '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'),
            array('Shinta Purnama Sari', 'shinta.purnama.sari@outlook.com', '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'),
            array('Dewi Puspita Sari', 'dewi.puspita.sari@email.com', '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi')
        );
        $column = array('name', 'email', 'password');
        $tablename = "users";
        runSeederInBatch($seeder, $column, $tablename);



        $managers = DB::table('managers')->pluck('id');

        for ($x = 1; $x <= 4; $x++) {
            $arr =
                [
                    'name' => fake()->name(),
                    'address' => fake()->address(),
                    'phone' => fake()->phoneNumber(),
                    'manager_id' => $managers->random(),
                    'email' => fake()->safeEmail(),
                    'open_date' => fake()->date(),
                    'status' => fake()->text(10),
                ];
            DB::table('branches')->insert($arr);
        }
    }
}
