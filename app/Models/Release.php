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
        return $this->belongsToMany(Band::class);
    }

}
