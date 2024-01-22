<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;

    public function users(){
        return $this->belongsToMany(User::class, 'user_genre');
    }

    public $timestamps = true;


    protected $fillable = [
        'name',
        'updated_at',
        'created_at'
    ];
}
