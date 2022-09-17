<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{

    public function index()
    {
        $schedules = Schedule::all();
        return Inertia::render('Simple/Index', [
            'pagetitle' => "Schedule List",
            'data' => $schedules,
            'route' => 'schedule.edit',
            'view' => "Day,Subject,Classroom,Duration"
        ]);
    }

    public function create()
    {
        return Inertia::render('Schedule/Create');
    }

    public function store(Request $request)
    {
        Schedule::create([
            'day' => $request['day'],
            'time_slot' => $request['time_slot'],
            'subject' => $request['subject'],
            'classroom' => $request['classroom'],
            'duration' => $request['duration'],
            'date' => $request['date'],
        ]);
    }


    public function edit($id)
    {
        $schedule = Schedule::find($id);
        return Inertia::render('Schedule/Edit', [
            'schedule' => $schedule
        ]);
    }

    public function update(Request $request, $id)
    {
        $schedule = Schedule::find($id);
        $schedule->day = $request->day;
        $schedule->time_slot = $request->time_slot;
        $schedule->subject = $request->subject;
        $schedule->classroom = $request->classroom;
        $schedule->duration = $request->duration;
        $schedule->date = $request->date;

        $schedule->update();
        return Redirect::route('schedule.index');
    }

    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return Redirect::back()->with('message', 'Schedule deleted.');
    }
}
