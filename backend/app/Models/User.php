<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public $timestamps = true;

    public function artists(){
        return $this->belongsToMany(Artist::class, 'user_artist');
    }

    public function genres(){
        return $this->belongsToMany(Genre::class, 'user_genre');
    }

    public function groups(){
        return $this->belongsToMany(Group::class, 'user_group');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'avatar',
        'token',
        'updated_at',
        'created_at',
        'last_info_update',
        'last_refresh',
        'refresh_token'
    ];

}
