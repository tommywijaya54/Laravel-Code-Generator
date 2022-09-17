<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;


class StudentController extends Controller
{
    public function index()
    {
        $data = Student::all();
        return Inertia::render('Simple/Index', [
            'pagetitle' => "Student List",
            'data' => $data,
            'route' => 'student.edit',
            'view' => "Name,Email,Phone,Address"
        ]);
    }
}
