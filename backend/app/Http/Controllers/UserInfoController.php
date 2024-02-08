<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Genre;
use App\Models\Group;
use App\Models\Playlist;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;

class UserInfoController extends Controller
{
    public function get_artists($user)
    {

        $res = Http::withHeaders(['Authorization' => "Bearer " . $user->token])->get('https://api.spotify.com/v1/me/top/artists');
        if (empty($res->json()["items"])) {
            return response()->json(['message' => 'You havent listened to enough music'], Response::HTTP_OK);
        }
        return $res->json()["items"];
    }

    public function get_genres($items)
    {
        $all_genres = [];
        foreach ($items as $item) {
            $all_genres = array_merge($all_genres, $item["genres"]);
        }
        $all_genres = array_count_values($all_genres);
        uasort($all_genres, function ($a, $b) {
            return $b - $a;
        });
        return array_keys(array_slice($all_genres, 0, 20, true));
    }

    public function create_artists($artists)
    {
        $artist_objs = [];

        foreach ($artists as $artist) {
            if (!Artist::where('artist_id', $artist["id"])->exists()) {
                Artist::create([
                    'artist_id' => $artist["id"],
                    'name' => $artist["name"],
                ]);
            }
            array_push($artist_objs, Artist::where('artist_id', $artist["id"])->first()->id);
        }

        return $artist_objs;
    }

    public function create_genres($genres)
    {
        $genre_objs = [];

        foreach ($genres as $genre) {
            if (!Genre::where('name', $genre)->exists()) {
                Genre::create([
                    'name' => $genre
                ]);
            }
            array_push($genre_objs, Genre::where('name', $genre)->first()->id);
        }

        return $genre_objs;
    }

    public function get_new_token($refresh_token)
    {
        $response = Http::asForm()->withHeaders(['Authorization' => 'Basic ' . base64_encode(env('SPOTIFY_CLIENT_ID') . ":" . env('SPOTIFY_SECRET')),])->post('https://accounts.spotify.com/api/token', ['grant_type' => 'refresh_token', 'refresh_token' => $refresh_token]);
        return $response->json()["access_token"];
    }

    public function create_groups($artists, $genres)
    {
        $group_objs = [];

        foreach ($artists as $artist) {
            if (!Group::where('theme', $artist["name"])->exists()) {
                Group::create([
                    'theme' => $artist["name"],
                    'description' => "A group discussing the musical artist/group " . $artist["name"]
                ]);
            }
            $group_objs[] = Group::where('theme', $artist["name"])->first()->id;
        }

        foreach($genres as $genre){
            if (!Group::where('theme', $genre)->exists()) {
                Group::create([
                    'theme' => ucwords($genre),
                    'description' => "A group about " . ucwords($genre)
                ]);
            }
        }

        return $group_objs;
    }

    public function synthesize_playlist_data($user)
    {
        $res = Http::withHeaders(['Authorization' => "Bearer " . $user->token])->get('https://api.spotify.com/v1/me/playlists');
        if (empty($res->json()["items"])) {
            return [];
        }
        $items = $res->json()["items"];
        $all_playlist_params = [];
        foreach ($items as $item) {
            $res = Http::withHeaders(['Authorization' => "Bearer " . $user->token])->get($item["tracks"]["href"]);
            $tracks = $res->json()["items"];
            $playlist_info = [];
            foreach ($tracks as $track) {
                $split = explode("/", $track["track"]["href"]);
                $playlist_info[] = end($split);
            }
            $parts = array_chunk($playlist_info, 50);
            $features = [];
            foreach ($parts as $part) {
                $track_ids = implode(',', $part);
                $res = Http::withHeaders(['Authorization' => "Bearer " . $user->token])->get('https://api.spotify.com/v1/audio-features?ids=' . $track_ids);
                $features = array_merge($features, $res->json()["audio_features"]);
            }
            $params = [
                "danceability" => 0,
                "acousticness" => 0,
                "energy" => 0,
                "liveness" => 0,
                "loudness" => 0,
                "valence" => 0,
                "instrumentalness" => 0,
            ];
            foreach ($features as $feature) {
                if (isset($feature["danceability"])) {
                    $params = [
                        "danceability" => $params["danceability"] + $feature["danceability"],
                        "acousticness" => $params["acousticness"] + $feature["acousticness"],
                        "energy" => $params["energy"] + $feature["energy"],
                        "liveness" => $params["liveness"] + $feature["liveness"],
                        "loudness" => $params["loudness"] + $feature["loudness"],
                        "valence" => $params["valence"] + $feature["valence"],
                        "instrumentalness" => $params["instrumentalness"] + $feature["instrumentalness"],
                    ];
                }
            }
            $cnt = count($features);
            foreach ($params as $param => $val) {
                $params[$param] = round($val / $cnt, 3);
            }
            $all_playlist_params[] = [
                "name" => $item["name"],
                "playlist_id" => $item["id"],
                "cover" => $item["images"][0]["url"],
                ...$params
            ];
        }

        return $all_playlist_params;
    }

    public function create_playlist_objs($playlists, $user_id){
        if(empty($playlists)){
            return;
        }
        foreach( $playlists as $playlist ){
            if(!Playlist::where('playlist_id', $playlist["playlist_id"])->exists()){
                $playlist = array_merge($playlist, ["user_id" => $user_id]);
                Playlist::create([
                    ...$playlist
                ]);
            }else{
                Playlist::where('playlist_id', $playlist["playlist_id"])->update([
                    ...$playlist
                ]);
            }
        }
    }
}
