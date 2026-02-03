<?php

namespace Database\Seeders;

use App\Models\Band;
use App\Models\Genre;
use App\Models\Release;
use App\Models\Song;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // Registrar el seeder si se crean especificos
        // $this->call([
        //     BandSeeder::class,
        // ]);

        $faker = \Faker\Factory::create();

        Genre::create([
            'name' => "Heavy Metal"
        ]);


        Genre::create([
            'name' => "Doom Metal"
        ]);

        $band = Band::create([
            'name' => "Black Sabbath",
            'formed_year' => 1969,
            'country' => 'United Kingdom',
            'rating' => 10,
            'main_photo' => 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/bb46/live/455d1890-67a1-11f0-8979-21e9e3d3b0da.jpg.webp',
        ]);

        $album1 = Release::create([
            // 'band_id' => json_encode([1]),
            'name' => "Black Sabbath",
            'type' => "LP",
            'release_date' => $faker->date,
        ]);

        $band->genres()->attach([1, 2]);

        $album1->bands()->attach([1]);

        $song1 = Song::create([

            'title' => 'Black Sabbath',
            'lyrics' =>
            "What is this that stands before me?
Figure in black which points at me
Turn 'round quick, and start to run
Find out I'm the chosen one
Oh no!

Big black shape with eyes of fire
Telling people their desire
Satan's sitting there, he's smiling
Watch those flames get higher and higher
Oh no, no, please God help me!

Is it the end, my friend?
Satan's coming 'round the bend
people running 'cause they're scared
Yes people better go and beware!
No, no, please, no!",
            'duration' => '06:16'
        ]);

        $song2 = Song::create([
            'title' => 'The Wizard',
            'lyrics' =>
            "	Misty morning, clouds in the sky
Without warning, the wizard walks by
Casting his shadow, weaving his spell
Funny clothes, tinkling bell

Never talking
Just keeps walking
Spreading his magic

Evil power disappears
Demons worry when the wizard is near
He turns tears into joy
Everyone's happy when the wizard walks by

Never talking
Just keeps walking
Spreading his magic

Sun is shining, clouds have gone by
All the people give a happy sigh
He has passed by, giving his sign
Left all the people feeling so fine

Never talking
Just keeps walking
Spreading his magic",
            'duration' => '04:24',
        ]);

        $song3 = Song::create([
            'title' => 'Behind the Wall of Sleep',
            'lyrics' => "Visions cupped within a flower
Deadly petals with strange power
Faces shine a deadly smile
Look upon you at your trial

Chill and numbs from head to toe
Icy sun with frosty glow
Words that grow read to your sorrow
Words that grow read no tomorrow

Feel your spirit rise with the breeze
Feel your body fall onto its knees
Sleeping wall of remorse
Turns your body to a corpse
Turns your body to a corpse
Turns your body to a corpse
Sleeping wall of remorse
Turns your body to a corpse

Now from darkness there springs light
Wall of Sleep is cool and bright
Wall of Sleep is lying broken
Sun shines in you have awoken",
            'duration' => '03:38',
        ]);
        $song4 = Song::create([
            'title' => 'N.I.B',
            'lyrics' => "Oh yeah!

Some people say my love cannot be true
Please believe me, my love, and I'll show you
I will give you those things you thought unreal
The sun, the moon, the stars all bear my seal

Oh yeah!

Follow me now and you will not regret
Leaving the life you led before we met
You are the first to have this love of mine
Forever with me 'till the end of time
Your love for me has just got to be real
Before you know the way I'm going to feel
I'm going to feel
I'm going to feel

Oh yeah!

Now I have you with me, under my power
Our love grows stronger now with every hour
Look into my eyes, you will see who I am
My name is Lucifer, please take my hand

Oh yeah!

Follow me now and you will not regret
leaving the life you led before we met
You are the first to have this love of mine
Forever with me 'till the end of time
Your love for me has just got to be real
Before you know the way I'm going to feel
I'm going to feel
I'm going to feel

Oh yeah!

Now I have you with me, under my power
Our love grows stronger now with every hour
Look into my eyes, you will see who I am
My name is Lucifer, please take my hand",
            'duration' => '06:06',
        ]);
        $song5 = Song::create([
            'title' => "Evil Woman, Don't Play Your Games with Me",
            'lyrics' => "I see the look of evil in your eyes
Women filling me all full of lies
Sorrow will not change your shameful deals
You will pass someone else instead of me

Evil woman don't you play your games with me

Now I know just what you're looking for
You want me to claim and change you
Well you know the evil deeds you seen
And you know the way it's got to be

Evil woman don't you play your games with me

Wickedness lies in your poisoned lips
Your body moves just like the crack of a whip
Blackness sleeps on top of your slate bed
Don't you wish you could see me dead

Evil woman don't you play your games with me",
            'duration' => '03:25',
            'isCover' => true,
        ]);
        $song6 = Song::create([
            'title' => 'Sleeping Village',
            'lyrics' => "Red sun rising in the sky
Sleeping village, cockerels cry
Soft breeze blowing in the trees
Peace of mind, feel at ease",
            'duration' => '03:46',
        ]);
        $song7 = Song::create([
            'title' => 'Warning',
            'lyrics' => "Now the first time that I met 'ya
I was lookin' in the sky
When the sun turned all a blur,
And the thunderclouds rolled by
The sea began to shiver,
And the wind began to moan
It must have been a sign for me
To leave you well alone
I was born without you baby,
But my feelings were a little bit too strong.

You never said you loved me
And I don't believe you can
'Cause I saw you in a dream
And you were with another man
You looked so cool and casual,
And I try to look the same
But now I've got to know ya'
Tell me who am I to blame?
I was born without you baby,
But my feelings were a little bit too strong

Now the whole wide world is moving,
'Cause there's iron in my heart
And I just can't keep from cryin'
'Cause you say we've got to part
Sorrow grips my voice
As I stand here all alone
And watch you slowly take away
A love I've never known
I was born without you baby,
But my feelings were a little bit too strong
Just a little bit too strong

Now the whole wide world is moving,
'Cause there's iron in my heart
And I just can't keep from cryin'
'Cause you say we've got to part
Sorrow grips my voice
As I stand here all alone
And watch you slowly take away
A love I've never known
I was born without you baby,
But my feelings were a little bit too strong
Just a little bit too strong",
            'duration' => '10:32',
            'isCover' => true,
        ]);


        $album1->songs()->attach([$song1, $song2, $song3, $song4, $song6, $song7]);
        // $album2 = Release::create([
        //     // 'band_id' => json_encode([1]),
        //     'name' => "Paranoid",
        //     'type' => "LP",
        //     'release_date' => $faker->date,
        // ]);

        // $album2->bands()->attach([1]);


        for ($i = 0; $i < 10; $i++) {
            $band = Band::create([
                'name' => "Band $i",
                'formed_year' => 2000,
                'country' => 'Unknown',
                'main_photo' => 'https://www.rae.es/sites/default/files/styles/wysiwyg_100_/public/2021-07/ramdomtwitter_Mesa%20de%20trabajo%201.png?itok=JfO9YVoD',
            ]);
        }




        User::factory()->create([
            'name' => 'Test',
            'email' => 'ericmuntas@gmail.com',
            'password' => 'ABCabc1@',
        ]);
    }
}
