<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Release extends Model
{

    protected $table = "releases";

    protected $fillable = ([
        'band_id',
        'name',
        'type',
    ]);

}
