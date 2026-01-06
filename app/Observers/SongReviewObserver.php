<?php

namespace App\Observers;

use App\Models\SongReview;
use App\Models\Song;

class SongReviewObserver
{
    /**
     * Handle the SongReview "created" event.
     */
    public function created(SongReview $songReview): void
    {
        $this->updateSongRating($songReview->song_id);
    }

    /**
     * Handle the SongReview "updated" event.
     */
    public function updated(SongReview $songReview): void
    {
        $this->updateSongRating($songReview->song_id);
    }

    /**
     * Handle the SongReview "deleted" event.
     */
    public function deleted(SongReview $songReview): void
    {
        $this->updateSongRating($songReview->song_id);
    }

    /**
     * Update the average rating for a song
     */
    private function updateSongRating(int $songId): void
    {
        $song = Song::find($songId);
        
        if ($song) {
            $averageRating = SongReview::where('song_id', $songId)
                ->avg('rating');
            
            $song->rating = $averageRating ? round($averageRating, 2) : null;
            $song->save();
        }
    }
}