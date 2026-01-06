<?php

namespace App\Providers;

use App\Models\ReleaseReview;
use App\Models\SongReview;
use App\Observers\ReleaseReviewObserver;
use App\Observers\SongReviewObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        SongReview::observe(SongReviewObserver::class);
        ReleaseReview::observe(ReleaseReviewObserver::class);
    }
}
