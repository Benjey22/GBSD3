<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'TaskController@index');
Route::get('/task/{id}', 'TaskController@show');

Route::put('/task/{id}', 'TaskController@update');

Route::post('/', 'TaskController@store');

Route::delete('/task/{id}', 'TaskController@destroy');
