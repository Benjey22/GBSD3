<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Task {{$task->id}}</title>
    </head>
    <body>
        <div>
            {!! Form::open(['action' => ['TaskController@update', $task->id], 'method' => 'POST']) !!}
                {{Form::text('cont', $task->content)}}
                {{Form::submit('Change Task!')}}
                {{Form::hidden('_method', 'PUT')}}
            {!! Form::close() !!}
        </div>
        <div>
            {!! Form::open(['action' => ['TaskController@destroy', $task->id], 'method' => 'POST']) !!}
                {{Form::submit('Delete Task!')}}
                {{Form::hidden('_method', 'DELETE')}}
            {!! Form::close() !!}
        </div>
    </body>
</html>