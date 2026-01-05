<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReleaseReview extends Model
{
    protected $table = 'releasereviews';

    protected $fillable = [
        'user_id',
        'rating',
        'review'
    ];
}
