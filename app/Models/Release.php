<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Release extends Model
{

    protected $table = "releases";

    protected $fillable = ([
        'name',
        'type',
        'release_date',
    ]);

    public const RELEASE_TYPES = [
        'LP',
        'EP',
        'Single',
        'Split',
        'Compilation',
        'Demo',
    ];
    //     $table->string('name');
    // $table->float('rating')->nullable();
    // $table->enum('type', ['LP', 'EP', 'Single', 'Split', 'Compilation', 'Demo']);

    public function bands()
    {
        return $this->belongsToMany(Band::class)->withTimestamps();
    }

    public function songs()
    {
        return $this->belongsToMany(Song::class)->withTimestamps();
    }

        public function genres()
    {
        return $this->belongsToMany(Genre::class)->withTimestamps();
    }


}
