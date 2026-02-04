<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReleaseReview extends Model
{
    protected $table = 'releasereviews';

    protected $fillable = [
        'user_id',
        'rating',
        'review',
        'release_id',
    ];

        public function release()
    {
        return $this->belongsTo(Release::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
