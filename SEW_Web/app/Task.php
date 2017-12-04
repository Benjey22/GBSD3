<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'body', 'description', 'confirmed' => false
    ];

    protected $hidden = [
        'id'
    ];
}
