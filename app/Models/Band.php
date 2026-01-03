<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Band extends Model
{

    // Tabla para referenciar
    protected $table = 'bands';

    protected $fillable = [
        'name',
        // 'genres_id',
        'formed_year',
        'country',
        'rating',
    ];

    public function releases()
    {
        return $this->belongsToMany(Release::class)->withTimestamps();
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class)->withTimestamps();
    }

      public function songs()
    {
        return $this->belongsToMany(Song::class)->withTimestamps();
    }

}
