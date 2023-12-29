import React from 'react';

function ReviewComment({children}) {
    return (
        <div>
            <p className='line-clamp-3'>{children}</p>
        </div>
    );
}

export default ReviewComment;