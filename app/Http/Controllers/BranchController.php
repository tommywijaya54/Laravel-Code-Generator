<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;


class BranchController extends Controller
{

    public function index()
    {
        $data = \App\Models\Branch::all();
        return Inertia::render('Simple/Index', [
            'pagetitle' => "Branch List",
            'data' => $data,
            'route' => 'branch.edit',
            'view' => "Name,Address"
        ]);
    }

    public function create()
    {
        return Inertia::render('Branch/Create');
    }

    public function store(Request $request)
    {
        Branch::create([
            'name' => $request['name'],
            'address' => $request['address'],
            'phone' => $request['phone'],
            'email' => $request['email'],
            'status' => $request['status'],
        ]);
    }


    public function edit($id)
    {
        $branch = Branch::find($id);
        return Inertia::render('Branch/Edit', [
            'branch' => $branch
        ]);
    }

    public function update(Request $request, $id)
    {
        $branch = Branch::find($id);
        $branch->name = $request->name;
        $branch->address = $request->address;
        $branch->phone = $request->phone;
        $branch->email = $request->email;
        $branch->status = $request->status;

        $branch->update();
        return Redirect::route('branch.index');
    }

    public function destroy(Branch $branch)
    {
        $branch->delete();
        return Redirect::back()->with('message', 'Branch deleted.');
    }
}
