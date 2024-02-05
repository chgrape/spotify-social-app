<?php

namespace App\Observers;

use App\Models\Like;
use App\Models\Post;


class LikeObserver
{
    /**
     * Handle the Like "created" event.
     */
    public function created(Like $like): void
    {
        Post::find($like->post_id)->increment('like_count', 1);
    }

    /**
     * Handle the Like "updated" event.
     */
    public function updated(Like $like): void
    {
        if($like->liked === true){
            Post::find($like->post_id)->increment('like_count', 1);
        }else{
            Post::find($like->post_id)->decrement('like_count', 1);
        }
    }

    /**
     * Handle the Like "deleted" event.
     */
    public function deleted(Like $like): void
    {
        //
    }

    /**
     * Handle the Like "restored" event.
     */
    public function restored(Like $like): void
    {
        //
    }

    /**
     * Handle the Like "force deleted" event.
     */
    public function forceDeleted(Like $like): void
    {
        //
    }
}
