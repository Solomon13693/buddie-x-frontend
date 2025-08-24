import React from 'react';
import { CommunityType } from '../../types';
import { Button } from '../ui';
import { useJoinCommunity, useLeaveCommunity } from '../../services';
import {
  UserGroupIcon,
  DocumentTextIcon,
  LockClosedIcon,
  GlobeAltIcon,
  CalendarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import moment from 'moment';
import { Avatar, Chip, User } from '@heroui/react';

interface CommunityBannerProps {
  community: CommunityType;
  onEdit?: () => void;
  onManageMembers?: () => void;
}

const CommunityBanner: React.FC<CommunityBannerProps> = ({
  community,
  onEdit,
  onManageMembers
}) => {

  const joinMutation = useJoinCommunity();
  const leaveMutation = useLeaveCommunity();

  const handleJoinLeave = () => {
    if (community?.is_member) {
      leaveMutation.mutate(community.id);
    } else {
      joinMutation.mutate(community.id);
    }
  };

  return (
    <div className="relative">

      <div className="h-32 sm:h-44 md:h-52 bg-gradient-to-r from-primary to-primary/80 rounded-t-xl overflow-hidden flex items-center justify-center">
        {community?.cover_image ? (
          <img
            src={community.cover_image}
            alt={`${community.name} cover`}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="text-white text-center px-4">
            <h1 className="text-xl md:text-2xl font-bold">
              {community?.name ?? 'Community'}
            </h1>
            <p className="text-sm md:text-base opacity-90 mt-1">
              {community?.category}
            </p>
          </div>
        )}
      </div>


      {/* Community Info */}
      <div className="bg-white rounded-b-xl p-4 sm:p-6  relative z-10 ">

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between -mt-8 sm:-mt-0">

          <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4 lg:mb-0">

            <div className="rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center 
              justify-center border-4 border-white shadow-lg mx-auto sm:mx-0 w-20 h-20 sm:w-24 sm:h-24 overflow-hidden">
              {community?.avatar ? (
                <Avatar className='size-24' src={community.avatar} />
              ) : (
                <span className="text-white font-bold text-xl sm:text-3xl">
                  {community?.name?.[0]?.toUpperCase() ?? "?"}
                </span>
              )}
            </div>

            {/* Community Details */}
            <div className="flex-1 text-center sm:text-left">

              <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">

                <h1 className="text-lg sm:text-xl font-bold text-gray-900">{community?.name}</h1>

                {community?.is_private ? (
                  <LockClosedIcon className="size-4 text-gray-500" />
                ) : (
                  <GlobeAltIcon className="size-4 text-gray-500" />
                )}
                {community?.is_admin && (
                  <ShieldCheckIcon className="size-4 text-primary" title="Community Admin" />
                )}
              </div>

              <p className="text-gray-600 mb-3 max-w-2xl text-xs sm:text-sm">
                {community?.description}
              </p>

              <div className="flex whitespace-nowrap flex-wrap justify-center sm:justify-start gap-3 items-center 
                sm:gqp-x-6 text-xs sm:text-[13px] text-gray-500">
                <div className="flex items-center justify-center sm:justify-start space-x-1">
                  <UserGroupIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{community?.member_count ?? 0} members</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start space-x-1">
                  <DocumentTextIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{community?.post_count ?? 0} posts</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start space-x-1">
                  <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>
                      {community?.created_at ? moment(community.created_at).fromNow() : "Unknown"}
                  </span>
                </div>
                {community?.category && (
                  <Chip className='bg-gray-100 text-xs' size="sm">{community.category}</Chip>
                )}
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
            {community?.is_admin ? (
              <>
                <Button variant="light" size="sm" onPress={onManageMembers}
                  className="w-full sm:w-auto">
                  Manage Members
                </Button>

                <Button variant="bordered" size="sm" onPress={onEdit} className="w-full sm:w-auto">
                  Edit Community
                </Button>
              </>
            ) : (
              <Button
                variant={community?.is_member ? "light" : "light"}
                onPress={handleJoinLeave}
                loading={joinMutation.isPending || leaveMutation.isPending}
                isDisabled={joinMutation.isPending || leaveMutation.isPending}
                className="w-full sm:w-auto">
                {community?.is_member ? 'Leave Community' : 'Join Community'}
              </Button>
            )}
          </div>

        </div>

        {/* Tags */}
        {community?.tags && community.tags.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {community.tags.map((tag, index) => (
                <Chip key={index} className='bg-primary/10 text-primary text-xs' size="sm"> #{tag}</Chip>
              ))}
            </div>
          </div>
        )}

        {/* Community Creator Info */}
        {community?.created_by && (
          <div className="flex flex-col gap-y-2 items-start justify-start mt-4 pt-4 border-t border-gray-100">

            <label className='text-[13px] font-medium text-gray-700' htmlFor="">Created By:</label>

            <User
              avatarProps={{
                src: community.created_by.avatar,
                size: 'sm'
              }}
              className='text-black font-medium !text-xs'
              description={community.created_by?.role}
              name={community.created_by?.name}
            />

          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityBanner;
