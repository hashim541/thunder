// app/(root)/embedded/[projectId]/comments/[commentId]/page.tsx
import Comments from '@/components/cards/Comments'
import { fetchCommentComponent } from '@/lib/actions/comment.actions'
import React from 'react'

const page = async( { params, searchParams } : { 
  params: {commentId: string, projectId: string },
  searchParams?:{
      page?: string
  } 
}) => {
  const comment = await fetchCommentComponent(params.commentId)
  return (
    <Comments 
        searchParams={{
            page: searchParams?.page || '1'
        }}
        commentId={params.commentId}
        projectId={params.projectId}
        styles={comment.styles}
    />
  )
}

export default page