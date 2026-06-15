type PostContentProps = {
    article: string
}

const PostContent = ({ article }: PostContentProps) => {
    return (
        <article
            className='prose max-w-none text-sm'
            dangerouslySetInnerHTML={{ __html: article }}
        />
    )
}

export default PostContent
