<?php

use App\Models\MainCore;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {


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

        Schema::create('user_test', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('password');
            $table->string('role')->nullable();
            $table->integer('created_by')->nullable();
            $table->timestamps();
        });

        Schema::create('schedule', function (Blueprint $table) {
            $table->id();
            $table->date('day');
            $table->string('time_slot');
            $table->string('subject');
            $table->string('classroom');
            $table->string('duration');
            $table->date('date');
            $table->integer('created_by')->nullable();
            $table->timestamps();
        });

        Schema::create('registration', function (Blueprint $table) {
            $table->id();
            $table->integer('student_id');
            $table->integer('branch_id');
            $table->string('reference');
            $table->string('cashback');
            $table->string('status')->nullable();
            $table->string('remarks')->nullable();
            $table->integer('created_by')->nullable();
            $table->timestamps();
        });

        Schema::create('student', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('address');
            $table->date('join_date');
            $table->date('exit_date');
            $table->integer('created_by')->nullable();
            $table->timestamps();
        });

        Schema::create('branch', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->string('phone');
            $table->string('email');
            $table->string('status')->nullable();
            $table->integer('created_by')->nullable();
            $table->timestamps();
        });


        $seeder = array(
            array(
                fake()->name(),
                fake()->safeEmail(),
                fake()->text(),
                fake()->randomElement(['admin', 'user']),
            ),
            array('Tommy Saputra Wijaya', 'tommy.wijaya54@yahoo.com', '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'),
            array('Eko Saputra Wijaya', 'eko.saputra.wijaya@gmail.com', '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'),
            array('Shinta Purnama Sari', 'shinta.purnama.sari@outlook.com', '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'),
            array('Dewi Puspita Sari', 'dewi.puspita.sari@email.com', '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi')
        );
        $column = array('name', 'email', 'password', 'role');
        $tablename = "user_test";
        runSeederInBatch($seeder, $column, $tablename);




        for ($x = 1; $x <= 20; $x++) {
            $arr =
                [
                    'day' => fake()->date(),
                    'time_slot' => fake()->time(),
                    'subject' => fake()->text(),
                    'classroom' => fake()->text(),
                    'duration' => fake()->randomElement(["1", "1.5", "2"]),
                    'date' => fake()->date(),
                ];
            DB::table('schedule')->insert($arr);
        }




        for ($x = 1; $x <= 30; $x++) {
            $arr =
                [
                    'name' => fake()->name(),
                    'email' => fake()->safeEmail(),
                    'phone' => fake()->phoneNumber(),
                    'address' => fake()->address(),
                    'join_date' => fake()->date(),
                    'exit_date' => fake()->date(),
                ];
            DB::table('student')->insert($arr);
        }




        for ($x = 1; $x <= 4; $x++) {
            $arr =
                [
                    'name' => fake()->name(),
                    'address' => fake()->address(),
                    'phone' => fake()->phoneNumber(),
                    'email' => fake()->safeEmail(),
                    'status' => fake()->text(),
                ];
            DB::table('branch')->insert($arr);
        }

        $students = DB::table('student')->pluck('id');
        $branchs = DB::table('branch')->pluck('id');
        for ($x = 1; $x <= 50; $x++) {
            $arr =
                [
                    'student_id' => $students->random(),
                    'branch_id' => $branchs->random(),
                    'reference' => fake()->text(),
                    'cashback' => fake()->randomElement([100000, 280000, 300000]),
                    'status' => fake()->text(),
                    'remarks' => fake()->text(),
                ];
            DB::table('registration')->insert($arr);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        foreach ($this->DBData['Entity'] as $entity) {
            Schema::dropIfExists($entity['TableName']);
        }
    }
};
