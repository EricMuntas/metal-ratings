<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SongReview extends Model
{
    protected $table = 'songreviews';

    protected $fillable = [
        'user_id',
        'rating',
        'review',
        'song_id',
    ];

    public function song()
    {
        return $this->belongsTo(Song::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
