<?php

use App\Models\Band;
use App\Models\Release;
use App\Models\Song;

// Create a dummy band
$band = Band::create([
    'name' => 'Test Band',
    'genre' => 'Metal',
    'year_formed' => 2026,
]);

// Simulate form data
$validated = [
    'name' => 'Test Release',
    'release_date' => '2026-01-01',
    'type' => 'LP',
    'songs' => [
        [
            'title' => 'Test Song 1',
            'duration' => '3:30',
            'lyrics' => 'Test Lyrics 1'
        ],
        [
            'title' => 'Test Song 2',
            'duration' => '4:20',
            'lyrics' => 'Test Lyrics 2'
        ]
    ]
];

echo "Creating release...\n";

$release = Release::create([
    'name' => $validated['name'],
    'release_date' => $validated['release_date'],
    'type' => $validated['type'],
]);

echo "Attaching band to release...\n";
$release->bands()->attach($band->id);

echo "Creating and attaching songs...\n";
if (!empty($validated['songs'])) {
    foreach ($validated['songs'] as $songData) {
        $song = Song::create([
            'title' => $songData['title'],
            'duration' => $songData['duration'],
            'lyrics' => $songData['lyrics'] ?? '',
        ]);
        $song->bands()->attach($band->id);
        $song->releases()->attach($release->id);
        echo "Created song: " . $song->title . "\n";
    }
}

echo "Verification complete.\n";

// Check if records exist
$savedRelease = Release::find($release->id);
$savedSongs = $savedRelease->songs;

echo "Saved Release: " . $savedRelease->name . "\n";
echo "Saved Songs Count: " . $savedSongs->count() . "\n";

if ($savedSongs->count() === 2) {
    echo "SUCCESS: Songs were linked correctly.\n";
} else {
    echo "FAILURE: Songs were NOT linked correctly.\n";
}
