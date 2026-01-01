<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Band extends Model
{

    // Tabla para referenciar
    protected $table = 'bands';

    protected $fillable = [
        'name',
        'genre',
        'formed_year',
    ];
}
