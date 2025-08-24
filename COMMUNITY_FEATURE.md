# Community Feature Documentation

## Overview

The Community feature is a comprehensive social platform within the mentor-mentee application that allows users to create, join, and participate in communities. This feature enables mentors and mentees to connect, share knowledge, and engage in meaningful discussions.

## Features

### For Mentors
- **Create Communities**: Mentors can create communities with custom names, descriptions, categories, and rules
- **Manage Communities**: Full administrative control over communities they create
- **Post Content**: Share posts with rich text, images, and tags
- **Moderate Content**: Manage posts, comments, and members
- **Community Settings**: Configure privacy, rules, and member permissions

### For Mentees
- **Join Communities**: Browse and join communities of interest
- **Participate**: Create posts, comment, and engage with other members
- **Discover**: Search and filter communities by category
- **Learn**: Access community-specific content and discussions

### For All Users
- **Rich Posts**: Create posts with text, images, and tags
- **Comments & Replies**: Engage in threaded discussions
- **Like System**: Like posts and comments
- **Search & Filter**: Find communities and content easily
- **Real-time Updates**: See new posts and comments as they happen

## File Structure

```
src/
├── types/
│   └── community.ts                 # Community-related TypeScript types
├── services/
│   └── community.ts                 # API services for community operations
├── components/
│   └── community/
│       ├── index.ts                 # Main export file
│       ├── CommunityCard.tsx        # Community display card
│       ├── CommunityBanner.tsx      # Community header banner
│       ├── CommunityPosts.tsx       # Posts list component
│       ├── CommunityMembers.tsx     # Members list component
│       ├── CommunityRules.tsx       # Community rules display
│       ├── CreateCommunityModal.tsx # Community creation modal
│       ├── CreatePostModal.tsx      # Post creation modal
│       ├── PostCard.tsx             # Individual post display
│       └── CommentCard.tsx          # Comment display component
├── pages/
│   ├── CommunitiesView.tsx          # Main communities listing page
│   └── CommunityDetailsView.tsx     # Individual community page
└── routes/
    ├── AppRoutes.tsx                # Mentor routes (updated)
    └── MenteeRoutes.tsx             # Mentee routes (updated)
```

## Components

### CommunityCard
Displays community information in a card format with join/leave functionality.

**Props:**
- `community: CommunityType` - Community data
- `onViewDetails?: (communityId: string) => void` - Callback for viewing details

**Features:**
- Community avatar and cover image
- Member count and post count
- Join/Leave button
- Tags display
- Creator information

### CommunityBanner
Large header component for community details page.

**Props:**
- `community: CommunityType` - Community data
- `onEdit?: () => void` - Edit community callback
- `onManageMembers?: () => void` - Manage members callback
- `onManageSettings?: () => void` - Settings callback

**Features:**
- Cover image display
- Community avatar
- Member and post statistics
- Admin action buttons
- Privacy status indicator

### CreateCommunityModal
Modal for creating new communities (mentors only).

**Props:**
- `isOpen: boolean` - Modal visibility
- `onClose: () => void` - Close callback
- `onSuccess?: () => void` - Success callback

**Features:**
- Form validation
- Image upload (avatar and cover)
- Category selection
- Privacy settings
- Rules configuration
- Tags management

### PostCard
Displays individual posts with full functionality.

**Props:**
- `post: CommunityPostType` - Post data
- `onViewDetails?: (postId: string) => void` - View details callback
- `onEdit?: (post: CommunityPostType) => void` - Edit callback
- `onDelete?: (postId: string) => void` - Delete callback
- `showCommunityName?: boolean` - Show community name flag

**Features:**
- Author information
- Rich content display
- Image gallery
- Like functionality
- Comment count
- Edit/Delete options (for authors)

### CommentCard
Displays comments with reply functionality.

**Props:**
- `comment: CommunityCommentType` - Comment data
- `onReply?: (commentId: string) => void` - Reply callback
- `onEdit?: (comment: CommunityCommentType) => void` - Edit callback
- `onDelete?: (commentId: string) => void` - Delete callback
- `showReplies?: boolean` - Show replies flag

**Features:**
- Author information
- Like functionality
- Reply system
- Edit/Delete options (for authors)
- Nested replies display

## API Services

### Community Management
- `useGetCommunities()` - Fetch all communities with pagination and filters
- `useGetMyCommunities()` - Fetch user's joined communities
- `useGetCommunityDetails()` - Fetch specific community details
- `useCreateCommunity()` - Create new community
- `useUpdateCommunity()` - Update community settings
- `useDeleteCommunity()` - Delete community (admin only)

### Membership
- `useJoinCommunity()` - Join a community
- `useLeaveCommunity()` - Leave a community
- `useGetCommunityMembers()` - Fetch community members

### Posts
- `useGetCommunityPosts()` - Fetch community posts
- `useGetPostDetails()` - Fetch specific post details
- `useCreatePost()` - Create new post
- `useUpdatePost()` - Update post
- `useDeletePost()` - Delete post
- `useLikePost()` - Like/unlike post

### Comments
- `useGetPostComments()` - Fetch post comments
- `useCreateComment()` - Create new comment
- `useUpdateComment()` - Update comment
- `useDeleteComment()` - Delete comment
- `useLikeComment()` - Like/unlike comment

## Data Types

### CommunityType
```typescript
interface CommunityType {
  id: string;
  name: string;
  description: string;
  cover_image?: string;
  avatar?: string;
  category: string;
  is_private: boolean;
  member_count: number;
  post_count: number;
  created_at: string;
  updated_at: string;
  created_by: {
    id: string;
    name: string;
    avatar?: string;
    role: 'mentor' | 'mentee';
  };
  is_member: boolean;
  is_admin: boolean;
  rules?: string[];
  tags?: string[];
}
```

### CommunityPostType
```typescript
interface CommunityPostType {
  id: string;
  title: string;
  content: string;
  images?: string[];
  community_id: string;
  community_name: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: 'mentor' | 'mentee';
  };
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  is_author: boolean;
  created_at: string;
  updated_at: string;
  tags?: string[];
}
```

### CommunityCommentType
```typescript
interface CommunityCommentType {
  id: string;
  content: string;
  post_id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: 'mentor' | 'mentee';
  };
  likes_count: number;
  is_liked: boolean;
  is_author: boolean;
  created_at: string;
  updated_at: string;
  replies?: CommunityCommentType[];
}
```

## Routes

### Mentor Routes
- `/communities` - Communities listing page
- `/communities/:communityId` - Individual community page

### Mentee Routes
- `/communities` - Communities listing page
- `/communities/:communityId` - Individual community page

## Navigation

The community feature is accessible through the sidebar navigation for both mentors and mentees:

- **Mentors**: Dashboard → Communities → [Community Features]
- **Mentees**: Dashboard → Communities → [Community Features]

## Usage Examples

### Creating a Community (Mentors)
1. Navigate to Communities page
2. Click "Create Community" button
3. Fill in community details:
   - Name and description
   - Category selection
   - Privacy settings
   - Upload avatar and cover image
   - Add community rules
   - Add tags
4. Submit form

### Joining a Community (All Users)
1. Browse communities on the main page
2. Use search and filters to find relevant communities
3. Click "Join" button on desired community
4. Access community content and participate

### Creating a Post (Community Members)
1. Navigate to a community you've joined
2. Click "Create Post" button
3. Fill in post details:
   - Title and content
   - Upload images (optional)
   - Add tags (optional)
4. Submit post

### Engaging with Content
1. Like posts and comments
2. Add comments to posts
3. Reply to comments
4. Edit/delete your own content
5. Report inappropriate content

## Security & Permissions

### Role-based Access
- **Mentors**: Can create communities, manage their communities, post, comment
- **Mentees**: Can join communities, post, comment
- **Community Admins**: Full control over their communities
- **Community Members**: Can post, comment, like content

### Content Moderation
- Users can only edit/delete their own content
- Community admins can moderate all content
- Report system for inappropriate content
- Community rules enforcement

## Future Enhancements

### Planned Features
- **Real-time Notifications**: Push notifications for new posts, comments, likes
- **Advanced Search**: Search within communities, filter by date, author, etc.
- **Community Analytics**: Insights for community admins
- **File Sharing**: Support for documents, PDFs, etc.
- **Community Events**: Event creation and management
- **Polls & Surveys**: Interactive content types
- **Community Badges**: Achievement system for active members
- **Mobile App**: Native mobile application

### Technical Improvements
- **Real-time Updates**: WebSocket integration for live updates
- **Image Optimization**: Automatic image compression and optimization
- **Caching**: Improved performance with Redis caching
- **Search Indexing**: Elasticsearch integration for better search
- **CDN Integration**: Faster content delivery

## Troubleshooting

### Common Issues

1. **Cannot Create Community**
   - Ensure you're logged in as a mentor
   - Check if all required fields are filled
   - Verify image upload limits

2. **Cannot Join Community**
   - Check if community is private (requires approval)
   - Ensure you're not already a member
   - Verify community exists and is active

3. **Cannot Post/Comment**
   - Ensure you're a member of the community
   - Check if community allows posting
   - Verify content meets community guidelines

4. **Images Not Loading**
   - Check image file format (JPG, PNG, GIF)
   - Verify file size limits
   - Ensure proper image URLs

### Performance Tips
- Use appropriate image sizes for avatars and covers
- Limit the number of tags per post
- Keep post content concise for better readability
- Use pagination for large communities

## Support

For technical support or feature requests related to the community feature, please contact the development team or create an issue in the project repository.
