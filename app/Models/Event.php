<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'short_description',
        'image',
        'location',
        'start_date',
        'end_date',
        'max_participants',
        'registered_participants',
        'status',
        'is_featured',
        'created_by',
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_featured' => 'boolean',
    ];

    // Relationships
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Scopes
    public function scopeUpcoming($query)
    {
        return $query->where('status', 'upcoming');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeActive($query)
    {
        return $query->whereIn('status', ['upcoming', 'ongoing']);
    }

    // Accessors
    public function getIsFullAttribute()
    {
        if ($this->max_participants === null) {
            return false;
        }
        return $this->registered_participants >= $this->max_participants;
    }

    public function getAvailableSlotsAttribute()
    {
        if ($this->max_participants === null) {
            return null;
        }
        return $this->max_participants - $this->registered_participants;
    }
}
