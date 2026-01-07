<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $table = "genres";


    protected $fillable = ([
        'name',
    ]);

       public function bands()
    {
        return $this->belongsToMany(Band::class)->withTimestamps();
    }

    public function releases()
    {
        return $this->belongsToMany(Release::class)->withTimestamps();
    }
}
