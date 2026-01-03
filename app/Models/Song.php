<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $table = 'songs';


    protected $fillable = [

        'title',
        'duration',
        'lyrics',
        'rating',

    ];

    public function releases()
    {
        return $this->belongsToMany(Release::class);
    }
    public function bands()
    {
        return $this->belongsToMany(Band::class);
    }

}
