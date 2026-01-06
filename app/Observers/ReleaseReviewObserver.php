<?php

namespace App\Observers;

use App\Models\Release;
use App\Models\ReleaseReview;
use App\Models\SongReview;
use App\Models\Song;

class ReleaseReviewObserver
{
    /**
     * Handle the SongReview "created" event.
     */
    public function created(ReleaseReview $releaseReview): void
    {
        $this->updateReleaseRating($releaseReview->release_id);
    }

    /**
     * Handle the SongReview "updated" event.
     */
    public function updated(ReleaseReview $releaseReview): void
    {
        $this->updateReleaseRating($releaseReview->release_id);
    }

    /**
     * Handle the SongReview "deleted" event.
     */
    public function deleted(ReleaseReview $releaseReview): void
    {
        $this->updateReleaseRating($releaseReview->release_id);
    }

    /**
     * Update the average rating for a song
     */
    private function updateReleaseRating(int $releaseId): void
    {
        $release = Release::find($releaseId);
        
        if ($release) {
            $averageRating = ReleaseReview::where('release_id', $releaseId)
                ->avg('rating');
            
            $release->rating = $averageRating ? round($averageRating, 2) : null;
            $release->save();
        }
    }
}