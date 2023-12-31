<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    use HasFactory;
    public $timestamps = true;
    

    public function users(){
        return $this->belongsToMany(User::class, 'user_artist');
    }

    protected $fillable = [
        'artist_id',
        'name',
        'updated_at',
        'created_at'

    ];
}
