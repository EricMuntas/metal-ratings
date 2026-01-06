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
        return $this->belongsToMany(Release::class)->withTimestamps();
    }
    public function bands()
    {
        return $this->belongsToMany(Band::class)->withTimestamps();
    }

        public function reviews()
    {
        return $this->hasMany(SongReview::class);
    }

    public function updateRating(): void
    {
        $this->rating = $this->reviews()->avg('rating');
        $this->save();
    }

}
