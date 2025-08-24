import React from 'react';
import { CommunityType } from '../../types';
import { useJoinCommunity, useLeaveCommunity } from '../../services';
import { UserGroupIcon, DocumentTextIcon, LockClosedIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@heroui/react';

interface CommunityCardProps {
  community: CommunityType;
  onViewDetails?: (communityId: string) => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({ community, onViewDetails }) => {
  const joinMutation = useJoinCommunity();
  const leaveMutation = useLeaveCommunity();

  const handleJoin = () => joinMutation.mutate(community.id);
  const handleLeave = () => leaveMutation.mutate(community.id);

  const handleViewDetails = () => {
    if (onViewDetails) onViewDetails(community.id);
  };

  return (
    <div onClick={handleViewDetails} className="cursor-pointer bg-white rounded-xl border border-gray-200 p-4 sm:p-6 
      hover:shadow transition-all duration-200 group">

      <div className="flex items-start justify-between mb-5">

        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
            {community.avatar ? (
              <img
                src={community.avatar}
                alt={community.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-lg">
                {community.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0 space-y-0.5">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
              {community.name}
            </h3>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              {community.is_private ? (
                <LockClosedIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <GlobeAltIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
              <span className="truncate">{community.is_private ? 'Private' : 'Public'}</span>
              <span>•</span>
              <span className="truncate">{community.category}</span>
            </div>
          </div>
        </div>

        {/* Join/Leave Button */}
        {!community.is_member && (
          <Button size="sm" variant="light" onPress={handleJoin} isLoading={joinMutation.isPending} isDisabled={joinMutation.isPending}
            className="flex-shrink-0 ml-2">
            Join
          </Button>
        )}
        {community.is_member && !community.is_admin && (
          <Button size="sm" variant="light" onPress={handleLeave} isLoading={leaveMutation.isPending}
            isDisabled={leaveMutation.isPending} className="flex-shrink-0 ml-2">
            Leave
          </Button>
        )}

      </div>

      <p className="text-gray-600 text-xs mb-4 line-clamp-2 leading-relaxed">
          {community.description}
      </p>

      {/* Stats */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <UserGroupIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{community.member_count} members</span>
          </div>
          <div className="flex items-center space-x-1">
            <DocumentTextIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{community.post_count} posts</span>
          </div>
        </div>
        <span className="text-xs">
          Created {formatDistanceToNow(new Date(community.created_at), { addSuffix: true })}
        </span>
      </div>

      {/* Tags */}
      {community.tags && community.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
          {community.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              #{tag}
            </span>
          ))}
          {community.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{community.tags.length - 3} more
            </span>
          )}
        </div>
      )}

    </div>
  );
};

export default CommunityCard;
