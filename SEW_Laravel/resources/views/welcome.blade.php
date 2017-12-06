<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>SEW</title>
    </head>
    <body>
        <div>
            @foreach($tasks as $task)
                <label><span style="font-weight:bold;">{{$task->id}}:</span> {{$task->content}}</label>
                <button><a href="/task/{{$task->id}}">Show me the Task!</a></button>
                <br>
            @endforeach
        </div>
        <section style="margin-top: 2%">
            {!! Form::open(['action' => 'TaskController@store', 'method' => 'POST']) !!}
                {{Form::text('cont', '')}}
                {{Form::submit('Save Task!')}}
            {!! Form::close() !!}
        </section>
    </body>
</html>
