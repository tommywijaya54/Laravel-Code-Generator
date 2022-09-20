<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        $data = \App\Models\Student::all();
        return Inertia::render('Simple/Index', [
            'pagetitle' => "Student List",
            'data' => $data,
            'route' => 'student.edit',
            'view' => "Name,Email,Phone"
        ]);
    }
}
