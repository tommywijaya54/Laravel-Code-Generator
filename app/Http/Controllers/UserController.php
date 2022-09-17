<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    //
    public function index()
    {
        $data = \App\Models\User::all();
        return Inertia::render('Simple/Index', [
            'pagetitle' => "User List",
            'data' => $data,
            'route' => 'user.edit',
            'view' => "Name,Email"
        ]);
    }
}
