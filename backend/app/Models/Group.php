<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $table = '_groups'; 

    public function users(){
        return $this->belongsToMany(User::class, 'user_group');
    }

    protected $fillable = [
        'theme',
        'description'
    ];
}
