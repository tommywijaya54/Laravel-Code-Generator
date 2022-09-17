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


        Schema::create('schedules', function (Blueprint $table) {
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


        Schema::create('students', function (Blueprint $table) {
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


        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->string('phone');
            $table->string('email');
            $table->string('status')->nullable();
            $table->integer('created_by')->nullable();
            $table->timestamps();
        });


        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->integer('student_id');
            $table->integer('branch_id');
            $table->string('reference');
            $table->integer('cashback');
            $table->string('status')->nullable();
            $table->string('remarks')->nullable();
            $table->integer('created_by')->nullable();
            $table->timestamps();
        });

        $seeder = array(
            array('Tommy Saputra Wijaya', 'tommy.wijaya54@yahoo.com', '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'),
            array('Eko Saputra Wijaya', 'eko.saputra.wijaya@gmail.com', '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'),
            array('Shinta Purnama Sari', 'shinta.purnama.sari@outlook.com', '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi'),
            array('Dewi Puspita Sari', 'dewi.puspita.sari@email.com', '$2y$10$5jVX3q8h6GnAqwN9KR9sVekmwYZQh0daV5.i65bzdXJMRYi/mtMZi')
        );
        $column = array('name', 'email', 'password');
        $tablename = "users";
        runSeederInBatch($seeder, $column, $tablename);




        for ($x = 1; $x <= 20; $x++) {
            $arr =
                [
                    'day' => fake()->date(),
                    'time_slot' => fake()->time(),
                    'subject' => fake()->sentence(3),
                    'classroom' => fake()->sentence(1),
                    'duration' => fake()->randomElement(["1", "1.5", "2"]),
                    'date' => fake()->date(),
                ];
            DB::table('schedules')->insert($arr);
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
            DB::table('students')->insert($arr);
        }





        for ($x = 1; $x <= 4; $x++) {
            $arr =
                [
                    'name' => fake()->name(),
                    'address' => fake()->address(),
                    'phone' => fake()->phoneNumber(),
                    'email' => fake()->safeEmail(),
                    'status' => fake()->text(10),
                ];
            DB::table('branches')->insert($arr);
        }




        $students = DB::table('students')->pluck('id');
        $branches = DB::table('branches')->pluck('id');

        for ($x = 1; $x <= 50; $x++) {
            $arr =
                [
                    'student_id' => $students->random(),
                    'branch_id' => $branches->random(),
                    'reference' => fake()->text(50),
                    'cashback' => fake()->randomElement([100000, 280000, 300000]),
                    'status' => fake()->text(10),
                    'remarks' => fake()->text(10),
                ];
            DB::table('registrations')->insert($arr);
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
