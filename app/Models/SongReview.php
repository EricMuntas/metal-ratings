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

}
