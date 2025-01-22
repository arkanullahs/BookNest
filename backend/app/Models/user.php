<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
        'phone',
        'address',
        'role_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Add this to explicitly declare timestamp columns
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    // Specify the date format for SQL Server
    protected $dateFormat = 'Y-m-d H:i:s.v';

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}